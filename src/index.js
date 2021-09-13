import './sass/main.scss';

import countrySearch from './js/countrySearch';

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


const responseProcessing = {
    //накопитель объектов отрисованной разметки 
    allDataMarkup: {},

    //ключ разрешения очистки
    cleaningPermission: false,

    //метод разрешения очистки
    cleanPermission() { this.cleaningPermission = true },

    //метод запрещения очистки
    cleanBan() { this.cleaningPermission = false },

    //обработчик инфы с сервера
    async resHandler(res) {
        console.log(res);

        if (this.cleaningPermission) {
            //чистим аккум
            this.allDataMarkup = {};

            console.log('засунем карточки в поле с очисткой поля');
            console.log("всего страниц отправим в пагинашку", res.data.page.totalPages);
        }
    }
}



const eventProcessing = {
    //хранилище последнего запроса
    dataRequest: {},

    //метод запроса с очисткой
    standardRequest(data) {
        //сохраним последний запрос
        this.dataRequest = {};
        this.dataRequest = data;

        //разрешим очистку разметки
        responseProcessing.cleanPermission()

        //отдадим запрос на модуль обращения к серв, вернем промис и отправим в блок обработки
        fetchObj.creatingRequest(this.dataRequest)
            .then(res => responseProcessing.resHandler(res));
    },

    //метод запроса без очистки(пагинация)
    paginationRequest(data) {

        //запретим очистку разметки
        responseProcessing.cleanBan()

        //отдадим запрос на модуль обращения к серв, вернем промис и отправим в блок обработки
        fetchObj.creatingRequest(this.dataRequest)
            .then(res => responseProcessing.resHandler(res));
    }
};



eventProcessing.standardRequest("US", "");

eventProcessing.paginationRequest(2)





