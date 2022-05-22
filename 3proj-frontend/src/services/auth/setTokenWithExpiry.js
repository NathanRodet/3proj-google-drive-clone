export default function setTokenWithExpiry(token) {
  const item = {
    token: token,
  };

  localStorage.setItem("JSESSIONID", JSON.stringify(item))
}