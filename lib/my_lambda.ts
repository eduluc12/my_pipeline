import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { resolve } from 'path'

export interface MyCustomInterface extends cdk.StackProps{
    tableArn: string
}

export class MyLambdaStack extends cdk.Stack{

    constructor(scope: Construct, id : string, props?: MyCustomInterface){
        super(scope, id, props);

        const role = new cdk.aws_iam.Role(this, 'myRole', {
            assumedBy: new cdk.aws_iam.ServicePrincipal('lambda.amazonaws.com'),
            inlinePolicies: {
                'my_first': new cdk.aws_iam.PolicyDocument({
                    statements: [
                        new cdk.aws_iam.PolicyStatement({
                            effect: cdk.aws_iam.Effect.ALLOW,
                            actions: [
                                'dynamodb:*'
                            ],
                            resources: ['*']
                        })
                    ]
                })
            }
        })

        new cdk.aws_lambda.Function(this, 'myFunction', {
            code: cdk.aws_lambda.Code.fromAsset(resolve(__dirname, '../code')),
            handler: 'main.handler',
            runtime: cdk.aws_lambda.Runtime.NODEJS_16_X,
            environment: {
                'TABLE_ARN': 'aaa'
            },
            role
        })
    }

}