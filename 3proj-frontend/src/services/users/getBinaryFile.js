import axios from 'axios';

const API_URL = process.env.REACT_APP_BASEURL;

export default async function getBinaryFile(storedToken, fileId) {
  const objectToken = JSON.parse(storedToken)
  const token = Object.values(objectToken)
  const config = {
    responseType: 'blob',
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  };
  return axios.get(API_URL + `/drive/specific/file/download/${fileId}`, config)
    .then(response => {
      // console.log(response)
      return response
    })
    .catch(error => {
      // console.log(error.response.data);
      return error
    });
}

