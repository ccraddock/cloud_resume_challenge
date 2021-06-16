terraform {
  backend "s3" {
    bucket               = "cameroncraddock-terraform-backend"
    key                  = "terraform.tfstate"
    region               = "us-east-1"
    workspace_key_prefix = "cloud_resume_challenge"
    dynamodb_table       = "cameroncraddock-terraform-backend-db"
    encrypt              = true
  }
}
