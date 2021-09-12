import './sass/main.scss';
import { fetchObj } from './fetch'



//Импорт и вызов нотифашки, образец
import { onErrorNotification } from './pnotify';
onErrorNotification("test");




//Временный костыль для создания верстки, консоль заменить на вызов шаблона
function venueSearch(key) {
    fetch(
        `https://app.ticketmaster.com/discovery/v2/venues.json?apikey=AmacJHw1PVxi43hxMLwa56XAbBAafJvj&countryCode=${key}`,
    )
        .then(response => response.json())
        .then(data => console.log(data._embedded.venues));
}
// venueSearch('Uk');




const eventProcessing = {
    dataRequest: {},

    standardRequest(country, text) {
        this.dataRequest = {};
        if (country !== "") {
            this.dataRequest.countryCode = country
        };
        if (text !== "") {
            this.dataRequest.keyword = text
        };

        fetchObj.creatingRequest(this.dataRequest)
            .then((c) => console.log(c))

    }
}

// eventProcessing.standardRequest("US", "")






