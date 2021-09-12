import './sass/main.scss';



//Импорт и вызов нотифашки, образец
import { onErrorNotification } from './pnotify';
onErrorNotification("test");



function venueSearch(key) {
    fetch(
        `https://app.ticketmaster.com/discovery/v2/venues.json?apikey=AmacJHw1PVxi43hxMLwa56XAbBAafJvj&countryCode=${key}`,
    )
        .then(response => response.json())
        .then(data => console.log(data._embedded.venues));
}
let e = venueSearch('Uk');
console.log(e, 'www');