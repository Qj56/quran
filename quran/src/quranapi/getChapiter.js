// getChapters.js
const axios = require('axios');

const getChapters = () => {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://api.quran.com/api/v4/chapters',
        headers: {
            'Accept': 'application/json'
        }
    };

    return axios(config)
        .then(response => {
            console.log(JSON.stringify(response.data));
            return response.data; // This will allow the calling code to use the response data
        })
        .catch(error => {
            console.error(error);
        });
};

module.exports = getChapters;
