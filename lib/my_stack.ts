import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { MyLambdaStack } from './my_lambda';

export class MyStack extends cdk.Stack{

    readonly myTableArn : string;

    constructor(scope : Construct, id: string, props?: cdk.StackProps & {
        name: string
    }){
        super(scope, id, props);

        const myTable = new cdk.aws_dynamodb.Table(this, 'myTable', {
            tableName: 'my_customx_' + (props?.name || ''),
            partitionKey: {
                name: 'pk',
                type: cdk.aws_dynamodb.AttributeType.STRING
            },
            billingMode: cdk.aws_dynamodb.BillingMode.PAY_PER_REQUEST,
            tableClass: cdk.aws_dynamodb.TableClass.STANDARD,
        })

        new MyLambdaStack(this, 'myLambda');

        new cdk.CfnOutput(this, 'myOuput', {
            exportName: 'hellox' + props?.name || '',
            value: myTable.tableArn
        })

    }

}