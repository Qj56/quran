// src/quranapi/getChapiter.js
import axios from 'axios';

export const getChapters = () => {
    const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://api.quran.com/api/v4/chapters',
        headers: {
            'Accept': 'application/json',
        },
    };

    return axios(config)
        .then(response => response.data)
        .catch(error => {
            console.error(error);
        });
};