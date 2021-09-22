
import axios from 'axios';

export const userCountry = function () {
    return axios.get('https://ipapi.co/json/')

};

