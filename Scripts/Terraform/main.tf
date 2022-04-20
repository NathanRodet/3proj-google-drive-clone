resource "azurerm_storage_account" "stosupinfo3projXXX" {
  name                     = join("", ["sto", "supinfo", "3proj", var.environment])
  resource_group_name      = var.resource_group_name
  location                 = var.location
  account_kind              = "StorageV2"
  account_tier              = "Standard"
  account_replication_type  = "LRS"
  min_tls_version           = "TLS1_2"
  allow_blob_public_access  = "false"
}