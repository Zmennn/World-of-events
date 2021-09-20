import '../sass/main.scss';
import getRefs from './get-refs';
import eventsGrid from '../templates/events-grid.hbs';
import { preprocessingMarkup } from './preprocessing-markup.js';
import { responseProcessing } from '../index';

const modalRefs = {

    openModal: document.querySelector('.modal-window'),
    picture: document.querySelector('.event-grid'),
    closeModal: document.querySelector('.btn-close'),
    overlay: document.querySelector('.js-overlay'),
    ID: document.querySelector('.event-grid__item'),
    name: document.querySelector('.modal-item-text-who'),
    info: document.querySelector('.modal-item-text-info'),
    date: document.querySelector('.modal-item-text-when'),
    where: document.querySelector('.modal-item-text-where'),
    priceTypeStand: document.querySelector('.price-type-standart'),
    priceMinStand: document.querySelector('.price-min-standart'),
    priceMaxStand: document.querySelector('.price-max-standart'),
    priceCurStand: document.querySelector('.price-currency-standart'),

    priceTypeVip: document.querySelector('.price-type-vip'),
    priceMinVip: document.querySelector('.price-min-vip'),
    priceMaxVip: document.querySelector('.price-max-vip'),
    priceCurVip: document.querySelector('.price-currency-vip'),

    imageRound: document.querySelector('.modal-img-round'),
    image: document.querySelector('.modal-img'),
    body: document.querySelector('body'),

}


modalRefs.picture.addEventListener('click', onModalOpen);
modalRefs.closeModal.addEventListener('click', onModalClose);
window.addEventListener('keyup', modalCloseESC);
modalRefs.overlay.addEventListener('click', onModalClose);
modalRefs.body.addEventListener('click', onBodyContentOpen);
//modalRefs.body.addEventListener('click', onBodyContentClose);



function onModalOpen(e) {
    e.preventDefault();

    if (!e.target.classList.contains('card__img') &&
        !e.target.classList.contains('card') &&
        !e.target.classList.contains('card__heading') &&
        !e.target.classList.contains('card__date') &&
        !e.target.classList.contains('card_place')
    ) {
        return;
    }

    //доступ к данным модалки

    const dataFromModal = responseProcessing.allDataMarkup.filter(
        el => el.id === e.target.dataset.id)[0];
    console.log("текущий объект, впихнуть в модалку срочно", dataFromModal);
    // console.log(1, dataFromModal?.priceRanges);
    // console.log(dataFromModal?.priceRanges ? (dataFromModal.priceRanges[1] ? dataFromModal.priceRanges[1].type : '--') : '--');

    onBodyContentOpen();
    onOverlay();
    modalRefs.openModal.classList.add('open-modal');

    const priceRangesArr = dataFromModal?.priceRanges;
    const imgArr = dataFromModal?.images;

    function getCurrentImage(value) {
        let currentImg = value?.length && value[1]?.url || 'img';
        for (const image of value) {
          if (image.width === 360 && image.ratio === '4_3') {
            currentImg = image.url;
          }
        }
        return currentImg;
    }

    const finalImg = getCurrentImage(imgArr);

    modalRefs.imageRound.src = finalImg;
    modalRefs.image.src = finalImg;
    modalRefs.name.innerHTML = ('beforeend', dataFromModal?.name || 'no data');
    modalRefs.info.innerHTML = ('beforeend', dataFromModal?.promoter?.description || 'no data');
    modalRefs.date.innerHTML = ('beforeend', dataFromModal?.dates?.start?.localDate || 'no data');
    modalRefs.where.innerHTML = ('beforeend', dataFromModal?._embedded?.venues?.length && dataFromModal._embedded.venues[0]?.name || 'no data');
    modalRefs.priceTypeStand.innerHTML = ('beforeend', priceRangesArr?.length && priceRangesArr[0]?.type || 'type');
    modalRefs.priceMinStand.innerHTML = ('beforeend', priceRangesArr?.length && priceRangesArr[0]?.min || 'min');
    modalRefs.priceMaxStand.innerHTML = ('beforeend', priceRangesArr?.length && priceRangesArr[0]?.max || 'max');
    modalRefs.priceCurStand.innerHTML = ('beforeend', priceRangesArr?.length && priceRangesArr[0]?.currency || 'cur');
    modalRefs.priceTypeVip.innerHTML = ('beforeend', priceRangesArr?.length && priceRangesArr[1]?.type || 'type');
    modalRefs.priceMinVip.innerHTML = ('beforeend', priceRangesArr?.length && priceRangesArr[1]?.min || 'min');
    modalRefs.priceMaxVip.innerHTML = ('beforeend', priceRangesArr?.length && priceRangesArr[1]?.max || 'max');
    modalRefs.priceCurVip.innerHTML = ('beforeend', priceRangesArr?.length && priceRangesArr[1]?.currency || 'cur');
    modalRefs.openModal.classList.remove('visually-hidden');

}



function onBodyContentOpen(e) {
    modalRefs.body.classList.add('body__open-modal');
}

function close() {
    modalRefs.overlay.classList.remove('overlay');
    modalRefs.body.classList.remove('body__open-modal');
    modalRefs.openModal.classList.add('visually-hidden');
}


function onModalClose(e) {
    if ((!e.currentTarget.classList.contains('btn-close')) &&
    (!e.target.classList.contains ('btn-more-from')) &&
    (!e.target.classList.contains('overlay') ||
    e.target.classList.contains('modal-window'))) {
        return;
    }
    // // modalRefs.body.classList.replace('body__open-modal', 'body__close-modal');
    // modalRefs.overlay.classList.remove('overlay');
    
    // modalRefs.openModal.classList.add('visually-hidden');
    close();
    modalRefs.body.classList.add('body__close-modal');
 
}



function onOverlay(e) {
    modalRefs.overlay.classList.add('overlay');
}


function modalCloseESC(e) {
    if (e.key !== 'Escape') {
        return;
    }
    
   close();
}

