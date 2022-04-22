## For LOCAL execution of Terraform Only.

terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "=2.98.0"
    }
  }
  backend "azurerm" {
    // az login
    // az account set --subscription "Azure for Students"
    // terraform plan -out=tfplan -var=environment="dev" -var=resource_group_name="RG-SUPINFO-3PROJ-DEV"
    #    resource_group_name  = "RG-SUPINFO-3PROJ-DEV"
    #    storage_account_name = "tfstosupinfo3projdev"
    #    container_name       = "terraformstate"
    #    key                  = "terraformdev.tfstate"
    #    access_key           = "ZrgKaBX5uQliZp+z60PPrR5ZbRTZrZucfVpCipZk0x6OOqrTf8COiqwt6LgwC9njVjUZJgp9Al22yNuXXX6CLQ=="
  }
}

# configure the azure provider
provider "azurerm" {
  features {}
  skip_provider_registration = "true"
}