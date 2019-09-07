import axios from 'axios';


export const getCampaigns = async () => {
  return axios.get('http://localhost:5000/campaigns')
    .then(response => {
      return response.data
    })
    .catch(error => {
      console.log(error);
    });
}

export const getCampaignById = async (id) => {
  return axios.get(`http://localhost:5000/campaigns/${id}`)
    .then(response => {
      return response.data
    })
    .catch(error => {
      console.log(error);
    });
}
