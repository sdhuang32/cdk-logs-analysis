const { AwsCdkTypeScriptApp } = require('projen');
const project = new AwsCdkTypeScriptApp({
  cdkVersion: '1.115.0',
  defaultReleaseBranch: 'main',
  name: 'cdk-logs-analysis',
  cdkDependencies: [
    '@aws-cdk/aws-cloudfront',
    '@aws-cdk/aws-cloudfront-origins',
    '@aws-cdk/aws-ec2',
    '@aws-cdk/aws-ecr-assets',
    '@aws-cdk/aws-ecs',
    '@aws-cdk/aws-elasticloadbalancingv2',
  ],
  // deps: [],                          /* Runtime dependencies of this module. */
  // description: undefined,            /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],                       /* Build dependencies for this module. */
  // packageName: undefined,            /* The "name" in package.json. */
  // projectType: ProjectType.UNKNOWN,  /* Which type of project this is (library/app). */
  // release: undefined,                /* Add release management to this project. */
});

project.gitignore.exclude(...['cdk.context.json']);
project.tsconfigEslint.addInclude('assets/**/*.ts');

project.synth();
