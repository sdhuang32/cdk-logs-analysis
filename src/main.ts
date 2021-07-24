import * as cdk from '@aws-cdk/core';

export class CdkLogsAnalysisStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: cdk.StackProps = {}) {
    super(scope, id, props);

    // define resources here...
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
