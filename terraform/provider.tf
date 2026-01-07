terraform {
  required_version = ">= 1.5.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  # Backend for storing state in S3 (uncomment after creating bucket)
  # backend "s3" {
  #   bucket = "terraform-state-YOUR_ACCOUNT_ID"
  #   key    = "eks-cluster/terraform.tfstate"
  #   region = "us-east-1"
  # }
}

provider "aws" {
  region = var.aws_region
}
