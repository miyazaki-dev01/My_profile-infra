#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { MyProfileCdkStage } from "@/lib/my_profile-cdk-stage";

const app = new cdk.App();

new MyProfileCdkStage(app, "MyProfileCdkStage");
