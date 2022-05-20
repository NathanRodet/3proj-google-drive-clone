import axios from 'axios'

const config = {
  // headers: { Authorization: `Bearer ${token}` },
  // url: "https://api-supinfo-3proj-dev.azurewebsites.net"
  url: "http://localhost:3001"
};

// const bodyParameters = {
//   key: "value"
// };

export default async function postAuth(data) {
  console.log(data)
  const responseAuth = axios.post(config.url + "/auth", data)
    .then(response => {
      console.log(response);
      return response
    })
    .catch(error => {
      console.log(error);
      return error
    }
    );
  return responseAuth
}