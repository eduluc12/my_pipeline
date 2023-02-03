import { Stage, StageProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { MyLambdaStack } from "./my_lambda";
import { MyStack } from "./my_stack";

export class MyApplication extends Stage {
    constructor(scope: Construct, id: string, props?: StageProps) {
      super(scope, id, props);
  
      new MyStack(this, 'Database2', {
        name: 'xxx1'
      });

    }
  }