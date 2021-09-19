import pagination from './pagination'
import getRefs from './get-refs';
const refs = getRefs();

export default function notification(text, arg) {


    if (arg) {
        refs.notificationCont.innerHTML = `<p class="notification__text">${text}</p>`;
        refs.eventGrid.innerHTML = "";
        pagination(0);
    } else {
        refs.notificationCont.innerHTML = `<p class="notification__text">${text}</p>`;
        refs.eventGrid.innerHTML = "";
    }

}