import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { MyApplication } from './my-application';
import { MyStack } from './my_stack';

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const pipeline = new cdk.pipelines.CodePipeline(this, 'Pipeline', {
      synth: new cdk.pipelines.ShellStep('Synth', {
        // Use a connection created using the AWS console to authenticate to GitHub
        // Other sources are available.
        input: cdk.pipelines.CodePipelineSource.connection('eduluc12/my_pipeline', 'master', {
          connectionArn: 'arn:aws:codestar-connections:us-east-1:552355260239:connection/107e0f2f-ad86-437f-9ee0-0ec761f6cef2', // Created using the AWS console * });',
        }),
        commands: [
          'npm ci',
          'echo 1',
          'npx cdk synth',
        ],
      }),
    });

    pipeline.addStage(new MyApplication(this, 'MyStage'))

  }
}
