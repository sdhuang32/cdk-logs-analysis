import * as path from 'path';
import * as cloudfront from '@aws-cdk/aws-cloudfront';
import * as origins from '@aws-cdk/aws-cloudfront-origins';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as ecrAssets from '@aws-cdk/aws-ecr-assets';
import * as ecs from '@aws-cdk/aws-ecs';
import * as elbv2 from '@aws-cdk/aws-elasticloadbalancingv2';
import * as cdk from '@aws-cdk/core';

export class CdkLogsAnalysisStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: cdk.StackProps = {}) {
    super(scope, id, props);

    // define resources here...
    const vpc = new ec2.Vpc(this, 'Vpc', {
      cidr: '10.0.0.0/16',
    });

    const cluster = new ecs.Cluster(this, 'EcsCluster', { vpc });

    const taskDefinition = new ecs.FargateTaskDefinition(this, 'TaskDefinition');

    const assets = new ecrAssets.DockerImageAsset(this, 'DockerImageAsset', {
      directory: path.join(__dirname, '../assets', 'sample-server'),
    });

    taskDefinition
      .addContainer('SampleServerContainer', {
        image: ecs.ContainerImage.fromDockerImageAsset(assets),
      })
      .addPortMappings({ containerPort: 3000 });

    const fatgetService = new ecs.FargateService(this, 'FargateService', {
      cluster,
      taskDefinition,
    });

    const loadBalancer = new elbv2.ApplicationLoadBalancer(this, 'LoadBalancer', {
      vpc,
      internetFacing: true,
    });

    const listener = loadBalancer.addListener('Listener', { port: 80 });

    listener.addTargets('ECS', {
      port: 80,
      targets: [fatgetService],
    });

    const cdn = new cloudfront.Distribution(this, 'Cloudfront', {
      defaultBehavior: {
        origin: new origins.LoadBalancerV2Origin(loadBalancer, {
          protocolPolicy: cloudfront.OriginProtocolPolicy.HTTP_ONLY,
        }),
      },
    });

    new cdk.CfnOutput(this, 'LoadBalancerDnsName', {
      value: loadBalancer.loadBalancerDnsName,
    });

    new cdk.CfnOutput(this, 'DistributionDomainName', {
      value: cdn.distributionDomainName,
    });
  }
}

const app = new cdk.App();

new CdkLogsAnalysisStack(app, 'CdkLogsAnalysisStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});

app.synth();
