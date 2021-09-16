import './sass/main.scss';
import { onErrorNotification } from './pnotify';
import countrySearch from './js/country-search';
import pagination from './js/pagination';

import { fetchObj } from './fetch';
import { userCountry } from './js/loadByLocation';
import getRefs from './js/get-refs';

import buyBtns from './js/buy-tickets-btns'
const refs = getRefs();

import openModal from './js/openModal.js';
import { preprocessingMarkup } from './js/preprocessing-markup.js'



const refs = getRefs();

//Временный костыль для создания верстки, консоль заменить на вызов шаблона
// https://app.ticketmaster.com/discovery/v2/venues.json?apikey=AmacJHw1PVxi43hxMLwa56XAbBAafJvj&countryCode=${key}
// https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&apikey={apikey}
// https://app.ticketmaster.com/discovery/v2/events.json?apikey=AmacJHw1PVxi43hxMLwa56XAbBAafJvjkeyword=dance
// https://app.ticketmaster.com/discovery/v2/events.json?apikey=AmacJHw1PVxi43hxMLwa56XAbBAafJvj&countryCode=UK
export function venueSearch(key) {
  return fetch(
    `https://app.ticketmaster.com/discovery/v2/events.json?apikey=AmacJHw1PVxi43hxMLwa56XAbBAafJvj&countryCode=${key}`,
  )
    .then(response => response.json())
    .then(data => {
      console.log('data fetch card', data._embedded.events);
      document
        .querySelector('.event-grid')
        .insertAdjacentHTML('beforeend', eventsGrid(data._embedded.events));
    });
}
// venueSearch('CA');

//ниже руками не касаться !!! я его 2 дня уговаривал работать

let i = 0;

const responseProcessing = {
  //накопитель объектов отрисованной разметки
  allDataMarkup: [],

  //ключ разрешения очистки
  cleaningPermission: true,

  //метод разрешения очистки
  cleanPermission() {
    this.cleaningPermission = true;
  },

  //метод запрещения очистки
  // cleanBan() {
  // this.cleaningPermission = false;
  // },

  //обработчик инфы с сервера по наличию данных
  resHandler(res) {
    console.log(res);
    if (res.data.page.totalPages < 1) {
      throw 'No data';
    }

    if (this.cleaningPermission) {

      //забиваем карточки в акум
      this.allDataMarkup = res.data._embedded.events;


      //команда на отрисовку грида
      preprocessingMarkup(res);

      console.log(
        'всего страниц отправим в пагинашку',
        res.data.page.totalPages,
      );
    } else {

      //скорее всего блок елсе будет удален
      console.log(
        'засунем карточки в поле без очисткой поля ',
        res.data._embedded.events,
      );
      this.allDataMarkup = res.data._embedded.events;
      console.log(this.allDataMarkup, 'акум2');
    }
  },
};

//Обрабатываем события интерфейса
export const eventProcessing = {
  //хранилище последнего запроса
  dataRequest: {},

  //метод запроса с очисткой
  standardRequest(data) {
    console.log('start 1');

    //сохраним последний запрос
    this.dataRequest = {};
    this.dataRequest = data;
    console.log(this.dataRequest, 'объект первого запроса');

    //разрешим очистку разметки
    responseProcessing.cleanPermission();

    //отдадим запрос на модуль обращения к серв, вернем промис и отправим в блок обработки
    fetchObj
      .creatingRequest(this.dataRequest)
      .then(res => responseProcessing.resHandler(res))
      .catch(err => onErrorNotification(err));
  },

  //метод запроса без очистки(пагинация)
  paginationRequest(data) {
    i = i + 1;
    //добавим данные o номере страницы в объект запроса
    this.dataRequest.page = i;

    // console.log(this.dataRequest, 'запрос канал пагинации');

    //запретим очистку разметки, метод клиент на полное выпиливание
    // responseProcessing.cleanBan();

    //отдадим запрос на модуль обращения к серв, вернем промис и отправим в блок обработки
    fetchObj
      .creatingRequest(this.dataRequest)
      .then(res => responseProcessing.resHandler(res))
      .catch(err => onErrorNotification(err));
  },
};



//Тестовая кнопка
const btn = document.querySelector('#test-button');
btn.addEventListener(
  'click',
  eventProcessing.paginationRequest.bind(eventProcessing),
);



//обработка первой отрисовки
userCountry().then(response => {
  const data = response.data;
  const country = data.country_code;
  let firstRequest = { countryCode: country };

  fetchObj
    .creatingRequest(firstRequest)
    .then(res => {
      if (res.data.page.totalElements < 1) {
        firstRequest = { keyword: 'festival', countryCode: 'US' }; //сюда пихать тестовые запросы объектом типа {countryCode: "US"}

        //сохранение запроса 
        eventProcessing.dataRequest = firstRequest;

        fetchObj.creatingRequest(firstRequest).then(res => {

          //команда на отрисовку
          preprocessingMarkup(res);

          //сохранение отображенной базы данных
          responseProcessing.allDataMarkup = res.data._embedded.events;

          //заменим на вызов пагинашки
          console.log(
            'всего страниц отправим в пагинашку',
            res.data.page.totalPages,
          );

          console.log('аккум', responseProcessing.allDataMarkup);

          //времянка, потом убрать
          console.log(
            'oбъект для работы модалкой',
            res.data._embedded.events[11],
          );
        });
      } else {

        //команда на отрисовку
        preprocessingMarkup(res);

        //сохранение запроса 
        eventProcessing.dataRequest = firstRequest;


        //сохранение отображенной базы данных
        responseProcessing.allDataMarkup = res.data._embedded.events;

        console.log(
          'всего страниц отправим в пагинашку',
          res.data.page.totalPages,
        );
      }
    })
    .catch(err => onErrorNotification(err));
});
