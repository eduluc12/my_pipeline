import { Stage, StageProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { MyStack } from "./my_stack";

export class MyApplication extends Stage {
    constructor(scope: Construct, id: string, props?: StageProps) {
      super(scope, id, props);
  
      new MyStack(this, 'Database');
    }
  }