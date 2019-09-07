import axios from 'axios';

export const getCampaigns = async () => {
  return axios.get('http://84101991.ngrok.io/campaigns')
    .then(response => {
      return response.data
    })
    .catch(error => {
      console.log(error);
    });
}

export const getCampaignById = async (id) => {
  return axios.get(`http://84101991.ngrok.io/campaigns/${id}`)
    .then(response => {
      return response.data
    })
    .catch(error => {
      console.log(error);
    });
}
