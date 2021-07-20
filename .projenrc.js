const { AwsCdkTypeScriptApp } = require('projen');
const project = new AwsCdkTypeScriptApp({
  cdkVersion: '1.114.0',
  defaultReleaseBranch: 'main',
  name: 'cdk-logs-analysis',
  cdkDependencies: [
    '@aws-cdk/aws-ec2',
    '@aws-cdk/aws-elasticloadbalancingv2',
    '@aws-cdk/aws-s3',
  ],
  // deps: [],                          /* Runtime dependencies of this module. */
  // description: undefined,            /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],                       /* Build dependencies for this module. */
  // packageName: undefined,            /* The "name" in package.json. */
  // projectType: ProjectType.UNKNOWN,  /* Which type of project this is (library/app). */
  // release: undefined,                /* Add release management to this project. */
});
project.synth();