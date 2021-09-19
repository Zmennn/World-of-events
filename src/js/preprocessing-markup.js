import getRefs from './get-refs';
import eventsGrid from '../templates/events-grid.hbs';
const refs = getRefs();

export function preprocessingMarkup(res) {
  const eventsArr = [];

  for (const event of res.data._embedded.events) {
    let currentImg = event.images[0].url;
    for (const image of event.images) {
      if (image.width === 305 && image.ratio === '4_3') {
        currentImg = image.url;
      }
    }
    const cardObj = {
      id: event.id ? event.id : 'No data',
      name: event.name ? event.name : 'No data',
      date: event.dates.start.localDate
        ? event.dates.start.localDate
        : 'No data',
      address: event._embedded ? event._embedded.venues[0].name : 'No data',
      image: currentImg,
    };
    eventsArr.push(cardObj);
  }
  refs.notificationCont.innerHTML = '';
  refs.eventGrid.innerHTML = ('beforeend', eventsGrid(eventsArr));
}
