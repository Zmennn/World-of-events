
import axios from 'axios';
//window.onload
export const userCountry = function () {
    return axios.get('https://ipapi.co/json/')

};

