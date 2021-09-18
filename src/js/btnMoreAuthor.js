import getRefs from '../js/get-refs';
import { eventProcessing } from '../index';

const refs = getRefs();

refs.btnMoreAuthor.addEventListener('click', onBtnMoreClick);

function onBtnMoreClick(e) {
    e.preventDefault();
    if (!e.target.classList.contains('btn-more-from')) {
        return
    }
    const eventName = document.querySelector('.modal-item-text-who')
    const authorName = eventName.textContent;
    console.log(authorName);
    eventProcessing.standardRequest({ keyword: authorName })
}