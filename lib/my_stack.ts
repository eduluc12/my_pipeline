import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class MyStack extends cdk.Stack{

    constructor(scope : Construct, id: string, props?: cdk.StackProps){
        super(scope, id, props);

        new cdk.aws_dynamodb.Table(this, 'myTable', {
            tableName: 'a',
            partitionKey: {
                name: 'pk',
                type: cdk.aws_dynamodb.AttributeType.STRING
            },
            billingMode: cdk.aws_dynamodb.BillingMode.PAY_PER_REQUEST,
            tableClass: cdk.aws_dynamodb.TableClass.STANDARD,
        })
    }

}