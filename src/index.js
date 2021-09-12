import './sass/main.scss';



//Импорт и вызов нотифашки, образец
import { onErrorNotification } from './pnotify';
onErrorNotification("test");


// function attractionId() {
//     fetch(
//         "https://app.ticketmaster.com/discovery/v2/attractions?apikey=AmacJHw1PVxi43hxMLwa56XAbBAafJvj&locale=*",
//     )
//         .then(response => response.json())
//         .then(data => console.log(data._embedded.attractions[0]));
// }
// attractionId();
// function eventSearch(keyWord) {
//     fetch(
//         "https://app.ticketmaster.com/discovery/v2/events.json?size=10&keyword=${keyWord}&apikey=AmacJHw1PVxi43hxMLwa56XAbBAafJvj",
//     )
//         .then(response => response.json())
//         .then(data => console.log(data._embedded.events));
// }
// eventSearch('Ukraine');
function venueSearch(key) {
    fetch(
        `https://app.ticketmaster.com/discovery/v2/venues.json?apikey=AmacJHw1PVxi43hxMLwa56XAbBAafJvj&countryCode=${key}`,
    )
        .then(response => response.json())
        .then(data => console.log(data._embedded.venues));
}
let e = venueSearch('Uk');
console.log(e, 'www');