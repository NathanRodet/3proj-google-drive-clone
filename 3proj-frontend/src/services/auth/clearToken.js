export default function setTokenWithExpiry() {
  try {
    localStorage.removeItem("JSESSIONID")
    return true
  } catch (error) {
    return false
  }
};