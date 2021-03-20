
# Initialises Terraform providers and sets their version numbers.

provider "azurerm" {
  features {}
}
provider "tls" {
  version = "2.1.0"
}
