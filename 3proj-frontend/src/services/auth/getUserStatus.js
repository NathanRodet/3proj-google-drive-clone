import jwt_decode from "jwt-decode";

export default function getUserStatus(key = "JSESSIONID") {
  const itemStr = localStorage.getItem(key)

  // if the item doesn't exist, return null
  if (!itemStr) {
    return null
  }

  const item = JSON.parse(itemStr)
  const decodedItem = jwt_decode(item.token)
  const now = new Date()

  // compare the expiry time of the item with the current time
  if (now.getTime() > decodedItem.exp * 1000) {
    // If the item is expired, delete the item from storage
    // and return null
    localStorage.removeItem(key)
    return false
  }
  return true
}