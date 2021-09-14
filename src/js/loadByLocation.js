
import axios from 'axios';

window.onload = function() {
    axios.get('https://ipapi.co/json/')
        .then((response) => {
            let data = response.data;
            let country = data.country_name
            console.log(country);
        })
        .catch(error => {
        console.log(error);
        });
};

