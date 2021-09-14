import './sass/main.scss';
import { onErrorNotification } from './pnotify';
import countrySearch from './js/country-search';
import pagination from './js/pagination';

import location from './js/loadByLocation';

import eventsGrid from './templates/events-grid.hbs';


import { fetchObj } from './fetch';

//Временный костыль для создания верстки, консоль заменить на вызов шаблона
// https://app.ticketmaster.com/discovery/v2/venues.json?apikey=AmacJHw1PVxi43hxMLwa56XAbBAafJvj&countryCode=${key}
export function venueSearch(key) {
  return fetch(
    `https://app.ticketmaster.com/discovery/v2/events.json?apikey=AmacJHw1PVxi43hxMLwa56XAbBAafJvj`,
  )
    .then(response => response.json())
    .then(data =>
      document
        .querySelector('.event-grid')
        .insertAdjacentHTML('beforeend', eventsGrid(data._embedded.events)),
    );
}
venueSearch('Uk');

//ниже руками не касаться !!! я его 2 дня уговаривал работать

const responseProcessing = {
  //накопитель объектов отрисованной разметки
  allDataMarkup: [],

  //ключ разрешения очистки
  cleaningPermission: false,

  //метод разрешения очистки
  cleanPermission() {
    this.cleaningPermission = true;
  },

  //метод запрещения очистки
  cleanBan() {
    this.cleaningPermission = false;
  },

  //обработчик инфы с сервера
  resHandler(res) {
    console.log(res.data._embedded.venues);
    console.log(res);
    if (this.cleaningPermission) {
      //чистим аккум
      this.allDataMarkup = [];

      //забиваем карточки в акум
      this.allDataMarkup.push(...res.data._embedded.venues);

      console.log(this.allDataMarkup, 'акум');

      console.log(
        'засунем карточки в поле с очисткой поля',
        res.data._embedded.venues,
      );
      console.log(
        'всего страниц отправим в пагинашку',
        res.data.page.totalPages,
      );
    } else {
      console.log(
        'засунем карточки в поле без очисткой поля',
        res.data._embedded.venues,
      );
      this.allDataMarkup.push(...res.data._embedded.venues);
      console.log(this.allDataMarkup, 'акум2');
    }
  },
};

const eventProcessing = {
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
    console.log('start 2', data.target.dataset.num);

    //добавим данные o номере страницы
    this.dataRequest.page = data.target.dataset.num;
    console.log(this.dataRequest, 'запрос канал пагинации');

    //запретим очистку разметки
    responseProcessing.cleanBan();

    //отдадим запрос на модуль обращения к серв, вернем промис и отправим в блок обработки
    fetchObj
      .creatingRequest(this.dataRequest)
      .then(res => responseProcessing.resHandler(res))
      .catch(err => onErrorNotification(err));
  },
};

eventProcessing.standardRequest({ countryCode: 'US' });

//Тестовая кнопка
const btn = document.querySelector('#test-button');
btn.addEventListener(
  'click',
  eventProcessing.paginationRequest.bind(eventProcessing),
);
