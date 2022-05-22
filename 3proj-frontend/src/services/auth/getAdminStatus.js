import jwt_decode from "jwt-decode";

export default function getAdminStatus(key = "JSESSIONID") {
  const itemStr = localStorage.getItem(key)

  // if the item doesn't exist, return null
  if (!itemStr) {
    return null
  }

  const item = JSON.parse(itemStr)
  const decodedItem = jwt_decode(item.token)

  // compare the expiry time of the item with the current time
  if (decodedItem.is_admin) {
    // If the item is expired, delete the item from storage
    // and return null
    return true
  }
  return false
}