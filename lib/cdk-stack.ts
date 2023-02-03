import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { MyApplication } from './my-application';

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const pipeline = new cdk.pipelines.CodePipeline(this, 'Pipeline', {
      synth: new cdk.pipelines.CodeBuildStep('codebuild', {
        input: cdk.pipelines.CodePipelineSource.connection('eduluc12/my_pipeline', 'master', {
          connectionArn: 'arn:aws:codestar-connections:us-east-1:552355260239:connection/107e0f2f-ad86-437f-9ee0-0ec761f6cef2', // Created using the AWS console * });',
        }),
        commands: [
          'npm ci',
          'npx cdk synth',
        ],
        cache: cdk.aws_codebuild.Cache.local(
          cdk.aws_codebuild.LocalCacheMode.CUSTOM
        ),
        partialBuildSpec: cdk.aws_codebuild.BuildSpec.fromObjectToYaml({
          cache: {
            paths: [
              "/root/.npm/**/*"
            ]
          }
        }),
      })
    });

    const manualApprovalAction = new cdk.pipelines.ManualApprovalStep('To approve');

    const v = pipeline.addStage(new MyApplication(this, 'MyStage'));
    v.addPre(manualApprovalAction)

  }
}
