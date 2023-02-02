import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

export interface MyCustomInterface extends cdk.StackProps{
    tableArn: string
}

export class MyLambdaStack extends cdk.Stack{

    constructor(scope: Construct, id : string, props?: MyCustomInterface){
        super(scope, id, props);

        new cdk.aws_lambda.Function(this, 'myFunction', {
            code: cdk.aws_lambda.Code.fromAsset('../src/main.js'),
            handler: 'handler',
            runtime: cdk.aws_lambda.Runtime.NODEJS_16_X,
            environment: {
                'TABLE_ARN': props?.tableArn || ''
            }
        })
    }

}