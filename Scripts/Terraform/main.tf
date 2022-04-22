resource "azurerm_storage_account" "stosupinfo3projXXX" {
  name                     = join("", ["sto", "supinfo", "3proj", var.environment])
  resource_group_name      = var.resource_group_name
  location                 = var.location
  account_kind             = "StorageV2"
  account_tier             = "Standard"
  account_replication_type = "LRS"
  min_tls_version          = "TLS1_2"
}

resource "azurerm_app_service_plan" "plan_supinfo_3proj_XXX" {
  name                = join("", ["plan", "-", "supinfo", "-", "3proj", "-", var.environment])
  location            = var.location
  resource_group_name = var.resource_group_name
  kind                = "Linux"
  reserved            = true

  sku {
    tier = "Standard"
    size = "B1"
  }
}

resource "azurerm_app_service" "app_supinfo_3proj_XXX" {
  name                = join("", ["app", "-", "supinfo", "-", "3proj", "-", var.environment])
  location            = var.location
  resource_group_name = var.resource_group_name
  app_service_plan_id = azurerm_app_service_plan.plan_supinfo_3proj_XXX.id

  site_config {
    always_on          = true
    min_tls_version    = "1.2"
    windows_fx_version = "NODE|16-lts"
    app_command_line   = "node app.js"
  }

  app_settings = {
    "WEB_SITE_NODE_DEFAULT_VERSION"         = "16.14.2"
    "APPLICATIONINSIGHTS_CONNECTION_STRING" = azurerm_application_insights.ai_supinfo_3proj_XXX.connection_string
    "APPINSIGHTS_INSTRUMENTATIONKEY"        = azurerm_application_insights.ai_supinfo_3proj_XXX.instrumentation_key
  }
}

resource "azurerm_application_insights" "ai_supinfo_3proj_XXX" {
  name                = join("", ["ai", "-", "supinfo", "-", "3proj", "-", var.environment])
  location            = var.location
  resource_group_name = var.resource_group_name
  application_type    = "Node.JS"
  retention_in_days   = "30"
}