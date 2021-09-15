import './sass/main.scss';
import { onErrorNotification } from './pnotify';
import countrySearch from './js/country-search';
import pagination from './js/pagination';
import eventsGrid from './templates/events-grid.hbs';
import { fetchObj } from './fetch';
import { userCountry } from './js/loadByLocation';
import getRefs from './js/get-refs';


const refs = getRefs()


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

  //обработчик инфы с сервера
  resHandler(res) {
    console.log(res.data._embedded.events);
    console.log(res);
    if (this.cleaningPermission) {
      //чистим аккум
      // this.allDataMarkup = [];

      //забиваем карточки в акум
      this.allDataMarkup = (res.data._embedded.events);

      console.log(this.allDataMarkup, 'акум');

      console.log(
        'засунем карточки в поле с очисткой поля',
        res.data._embedded.events,
      );

      refs.eventGrid.innerHTML = ('beforeend', eventsGrid(res.data._embedded.events));

      console.log(
        'всего страниц отправим в пагинашку',
        res.data.page.totalPages,
      );
    } else {
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

    i = i + 1
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

// eventProcessing.standardRequest({ countryCode: 'US' });

//Тестовая кнопка
const btn = document.querySelector('#test-button');
btn.addEventListener(
  'click',
  eventProcessing.paginationRequest.bind(eventProcessing),
);



//обработка первой отрисовки
userCountry().then((response) => {
  const data = response.data;
  const country = data.country_code;
  let firstRequest = { countryCode: country };

  fetchObj
    .creatingRequest(firstRequest)
    .then(res => {

      if (res.data.page.totalElements < 1) {
        firstRequest = { keyword: "song", countryCode: "US" } //сюда пихать тестовые запросы объектом типа {countryCode: "US"}

        eventProcessing.dataRequest = firstRequest

        fetchObj.creatingRequest(firstRequest)
          .then(res => {
            console.log("ответ сервера", res);

            refs.eventGrid
              .innerHTML = ('beforeend', eventsGrid(res.data._embedded.events));

            responseProcessing.allDataMarkup = (res.data._embedded.events);

            console.log(
              'всего страниц отправим в пагинашку',
              res.data.page.totalPages,
            );

            console.log("аккум", responseProcessing.allDataMarkup);

            console.log("oбъект для работы модалкой", res.data._embedded.events[11]);
          })
      } else {
        refs.eventGrid
          .innerHTML = ('beforeend', eventsGrid(res.data._embedded.events));

        responseProcessing.allDataMarkup = (res.data._embedded.events);

        console.log(
          'всего страниц отправим в пагинашку',
          res.data.page.totalPages,
        );
      };


    })
    .catch(err => onErrorNotification(err));
})