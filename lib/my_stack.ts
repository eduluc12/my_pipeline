import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class MyStack extends cdk.Stack{

    readonly myTableArn : string;

    constructor(scope : Construct, id: string, props?: cdk.StackProps){
        super(scope, id, props);

        const myTable = new cdk.aws_dynamodb.Table(this, 'myTable', {
            tableName: 'my_custom_table',
            partitionKey: {
                name: 'pk',
                type: cdk.aws_dynamodb.AttributeType.STRING
            },
            billingMode: cdk.aws_dynamodb.BillingMode.PAY_PER_REQUEST,
            tableClass: cdk.aws_dynamodb.TableClass.STANDARD,
        })


        new cdk.CfnOutput(this, 'myOuput', {
            exportName: 'hello',
            value: myTable.tableArn
        })

    }

}