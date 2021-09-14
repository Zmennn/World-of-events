// import eventsTpl from '../templates/markup-events.hbs'
import axios from 'axios';
// const cardEl = document.querySelector('.event-grid');

// const success = async (pos) => {
//   const latitude = pos.coords.latitude;
//   const longitude = pos.coords.longitude;
//   const geoApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
//     const response = await fetch(geoApiUrl)
//     const loc = await response.json()
//     .then(data => {
//         let country = data.countryName
//         console.log(country)

//         fetch(`https://app.ticketmaster.com/discovery/v2/venues.json?apikey=AmacJHw1PVxi43hxMLwa56XAbBAafJvj&keyword=${country}`)
//             .then(response => response.json())
//             .then(data => data._embedded.venues)
//             .then(renderEvents)
//     })
// }

//   function error() {
//     console.log('отмена');
//   };

// navigator.geolocation.getCurrentPosition(success, error);

window.onload = function() {
    axios.get('https://ipapi.co/json/')
        .then((response) => {
            let data = response.data;
            let country = data.country_name
            console.log(country);
            
            fetch(`https://app.ticketmaster.com/discovery/v2/venues.json?apikey=AmacJHw1PVxi43hxMLwa56XAbBAafJvj&keyword=${country}`)
            .then(response => response.json())
            .then(data => console.log(data._embedded.venues))
                // .then(renderEvents)
                .catch(error => {
                console.log(error);
            })
        })
        .catch(error => {
        console.log(error);
        });
};

// function renderEvents(country) {
//     const markup = eventsTpl(country)
//     cardEl.innerHTML = markup
// }