import getRefs from './get-refs';
import eventsGrid from '../templates/events-grid.hbs';

const modalRefs = {
openModal: document.querySelector ('.modal-container'),    
picture: document.querySelector ('.event-grid'),
closeModal: document.querySelector('.btn-close'),
}


modalRefs.picture.addEventListener ('click', onModalOpen);
modalRefs.closeModal.addEventListener('click', onModalClose);

function onModalOpen(e) {
e.preventDefault();

modalRefs.openModal.classList.add("open-modal");
}

function onModalClose() {
modalRefs.openModal.classList.remove("open-modal");
}
