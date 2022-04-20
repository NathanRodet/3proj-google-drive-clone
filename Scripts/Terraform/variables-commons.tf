variable "resource_group_name" {
  type        = string
  description = "Azure resource group name"
}

variable "location" {
  type        = string
  description = "Azure region where the resources will be created"
  default     = "West Europe"
}

variable "environment" {
  type        = string
  description = "This variable defines the environment to be built"
}