import getRefs from './get-refs';
import eventsGrid from '../templates/events-grid.hbs';

const modalRefs = {
openModal: document.querySelector ('.modal-container'),    
picture: document.querySelector ('.event-grid'),
closeModal: document.querySelector('.btn-close'),
overlay: document.querySelector('.js-overlay'),
}


modalRefs.picture.addEventListener ('click', onModalOpen);
modalRefs.closeModal.addEventListener('click', onModalClose);

function onModalOpen(e) {
e.preventDefault();

if(!e.target.classList.contains('card__img') && 
   !e.target.classList.contains('card') &&
   !e.target.classList.contains('card__heading') &&
   !e.target.classList.contains('card__date') &&
   !e.target.classList.contains('card_place')
   ) {
    return
}
onOverlay();
modalRefs.openModal.classList.add('open-modal');
}

function onModalClose(e) {
modalRefs.overlay.classList.remove('overlay');    
modalRefs.openModal.classList.remove('open-modal');

}

function onOverlay (e) {
modalRefs.overlay.classList.add('overlay'); 
}