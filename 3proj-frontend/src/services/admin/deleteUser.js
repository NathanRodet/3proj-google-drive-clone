import axios from 'axios';

const API_URL = process.env.REACT_APP_BASEURL;

export default async function deleteUser(storedToken, userId) {
  const objectToken = JSON.parse(storedToken)
  const token = Object.values(objectToken)
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };
  return axios.delete(API_URL + `/users/specific/user/${userId}`, config)
    .then(response => {
      // console.log(response.data)
      return response
    })
    .catch(error => {
      // console.log(error.response.data);
      return error
    });
}