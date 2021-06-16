module "mywebsite" {
  source      = "./s3-static-website"
  endpoint    = "cameroncraddock.net"
  domain_name = "cameroncraddock.net"
  region      = var.region
  bucket_name = "cameroncraddock.net"
}
