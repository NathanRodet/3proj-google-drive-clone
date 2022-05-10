resource "azurerm_app_service_plan" "plan_api_supinfo_3proj_XXX" {
  name                = join("", ["plan", "-", "api", "-", "supinfo", "-", "3proj", "-", var.environment])
  location            = var.location
  resource_group_name = var.resource_group_name
  kind                = "Linux"
  reserved            = true

  sku {
    tier = "Basic"
    size = "B1"
  }
}

resource "azurerm_app_service" "api_supinfo_3proj_XXX" {
  name                = join("", ["api", "-", "supinfo", "-", "3proj", "-", var.environment])
  location            = var.location
  resource_group_name = var.resource_group_name
  app_service_plan_id = azurerm_app_service_plan.plan_api_supinfo_3proj_XXX.id

  site_config {
    always_on                 = "true"
    min_tls_version           = "1.2"
    use_32_bit_worker_process = "true"
    linux_fx_version          = "NODE|16-lts"
    health_check_path         = "/"
    ftps_state                = "Disabled"
  }

  app_settings = {
    "WEB_SITE_NODE_DEFAULT_VERSION"         = "16.14.2"
  }
}

resource "azurerm_app_service_plan" "plan_app_supinfo_3proj_XXX" {
  name                = join("", ["plan", "-", "app", "-", "supinfo", "-", "3proj", "-", var.environment])
  location            = var.location
  resource_group_name = var.resource_group_name
  kind                = "Linux"
  reserved            = true

  sku {
    tier = "Basic"
    size = "B1"
  }
}

resource "azurerm_app_service" "app_supinfo_3proj_XXX" {
  name                = join("", ["app", "-", "supinfo", "-", "3proj", "-", var.environment])
  location            = var.location
  resource_group_name = var.resource_group_name
  app_service_plan_id = azurerm_app_service_plan.plan_app_supinfo_3proj_XXX.id

  site_config {
    always_on                 = "true"
    min_tls_version           = "1.2"
    use_32_bit_worker_process = "true"
    linux_fx_version          = "NODE|16-lts"
    health_check_path         = "/"
    ftps_state                = "Disabled"
  }

  app_settings = {
    "WEB_SITE_NODE_DEFAULT_VERSION"         = "16.14.2"
  }
}