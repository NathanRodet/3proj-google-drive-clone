export default function setToken(token) {
  const item = {
    token: token,
  };

  localStorage.setItem("JSESSIONID", JSON.stringify(item))
}