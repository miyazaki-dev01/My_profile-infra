#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { MyProfileCdkStack } from "@/lib/my_profile-cdk-stack";

const app = new cdk.App();

new MyProfileCdkStack(app, "MyProfileCdkStack");
