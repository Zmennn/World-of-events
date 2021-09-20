import './sass/main.scss';
import { onErrorNotification } from './pnotify';
import countrySearch from './js/country-search';
import pagination from './js/pagination';
import { fetchObj } from './fetch';
import { userCountry } from './js/loadByLocation';
import getRefs from './js/get-refs';
import buyBtns from './js/buy-tickets-btns';
const refs = getRefs();
import { preprocessingMarkup } from './js/preprocessing-markup.js';
import openModal from './js/openModal.js';
import btnMoreAuthor from './js/btnMoreAuthor.js';
import notification from './js/customNotification.js';
import 'animate.css';

//ниже руками не касаться !!! я его 2 дня уговаривал работать

//обработка ответа сервера
export const responseProcessing = {
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
    //обработчик инфы с сервера по наличию данных
    if (res.data.page.totalPages < 1) {
      throw 'Unfortunately no events found';
    }

    if (this.cleaningPermission) {
      //забиваем карточки в акум
      this.allDataMarkup = res.data._embedded.events;

      //команда на отрисовку грида
      preprocessingMarkup(res);

      // console.log(
      //   'всего страниц отправим в пагинашку',
      //   res.data.page.totalPages,
      // );
      pagination(res.data.page.totalPages);
    } else {
      //отрисовка без перерисовки пагинации

      preprocessingMarkup(res);

      refs.linkInputSearchForm.scrollIntoView({ behavior: 'smooth' });

      this.allDataMarkup = res.data._embedded.events;
    }
  },
};

//Обрабатываем события интерфейса
export const eventProcessing = {
  //хранилище последнего запроса
  dataRequest: {},

  //метод запроса с очисткой
  standardRequest(data) {
    //сохраним последний запрос
    this.dataRequest = {};
    this.dataRequest = data;

    //разрешим очистку разметки
    responseProcessing.cleanPermission();

    //отдадим запрос на модуль обращения к серв, вернем промис и отправим в блок обработки
    fetchObj
      .creatingRequest(this.dataRequest)
      .then(res => responseProcessing.resHandler(res))
      .catch(err => notification(err, true));
  },

  //метод запроса без очистки(пагинация)
  paginationRequest(data) {
    //добавим данные o номере страницы в объект запроса
    this.dataRequest.page = data - 1;

    //запретим очистку разметки
    responseProcessing.cleanBan();

    //отдадим запрос на модуль обращения к серв, вернем промис и отправим в блок обработки
    fetchObj
      .creatingRequest(this.dataRequest)
      .then(res => responseProcessing.resHandler(res))
      .catch(err => notification('Something went wrong', false));
  },
};

//обработка первой отрисовки
userCountry().then(response => {
  const data = response.data;
  const country = data.country_code;
  let firstRequest = { countryCode: country };

  fetchObj
    .creatingRequest(firstRequest)
    .then(res => {
      if (res.data.page.totalElements < 1) {
        firstRequest = { countryCode: 'US', keyword: 'festival' }; //сюда пихать тестовые запросы объектом типа {countryCode: "US"}

        //сохранение запроса
        eventProcessing.dataRequest = firstRequest;

        fetchObj.creatingRequest(firstRequest).then(res => {
          //команда на отрисовку
          preprocessingMarkup(res);

          const eventsItems = document.querySelectorAll('.event-grid__item');

          for (const item of eventsItems) {
            item.classList.add('animation');
          }

          //сохранение отображенной базы данных
          responseProcessing.allDataMarkup = res.data._embedded.events;

          //вызов пагинации
          pagination(res.data.page.totalPages);
        });
      } else {
        //команда на отрисовку
        preprocessingMarkup(res);

        const eventsItems = document.querySelectorAll('.event-grid__item');
        for (const item of eventsItems) {
          item.classList.add('animation');
        }

        //сохранение запроса
        eventProcessing.dataRequest = firstRequest;

        //сохранение отображенной базы данных
        responseProcessing.allDataMarkup = res.data._embedded.events;

        pagination(res.data.page.totalPages);
      }
    })
    .catch(err => notification(err));
});
