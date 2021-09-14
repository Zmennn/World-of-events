
import axios from "axios";


export const fetchObj = {

    BASE_URL: "https://app.ticketmaster.com/discovery/v2/events.json",

    creatingRequest(dataObj) {

        const url = new URL(this.BASE_URL);
        const dataArr = Object.entries(dataObj);
        dataArr.forEach(el => url.searchParams.set(el[0], el[1]));
        url.searchParams.set("apikey", 'AmacJHw1PVxi43hxMLwa56XAbBAafJvj');

        return (axios.get(url.href))
    }
}