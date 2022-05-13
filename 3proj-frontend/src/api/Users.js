import axios from 'axios'
const url = "https://api.spacex.land/rest/launches/rest/launch/{id}"

//order : asc // desc
//sort : key
export default async function getLaunchById(id) {
  const fetchLaunchById = await axios.get(`https://api.spacex.land/rest/launch/${id}`)
  return (fetchLaunchById.data)
}

export default async function getPastLaunches() {
  const fetchPastLaunches = await axios.get(url, { params: { offset: 0, limit: 3 } })
  return (fetchPastLaunches.data)
}