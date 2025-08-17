import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";

import { DnsStack } from "@/lib/stacks/dns-stack";
import { EdgeCertStack } from "@/lib/stacks/edge-cert-stack";
import { WebsiteStack } from "@/lib/stacks/website-stack";

import { dnsStackProperty } from "@/parameters/dns-parameter";
import { edgeCertStackProperty } from "@/parameters/edge-cert-parameter";
import { websiteStackProperty } from "@/parameters/website-parameter";

export class MyProfileCdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // DNS（Hosted Zone）の作成
    const dns = new DnsStack(this, "DnsStack", {
      ...dnsStackProperty,
    });

    // EdgeCert（us-east-1 で証明書発行 or 既存参照）
    const edge = new EdgeCertStack(this, "EdgeCertStack", {
      ...edgeCertStackProperty,
      hostedZoneRef: dns.hostedZoneRef,
    });

    // Website（S3 + CloudFront + Route53）
    new WebsiteStack(this, "Website", {
      ...websiteStackProperty,
      hostedZoneRef: dns.hostedZoneRef,
      edgeCertificateArn: edge.certificateArn,
      crossRegionReferences: true, // CloudFront は us-east-1 で作成されるため、クロスリージョン参照を許可
    });
  }
}
