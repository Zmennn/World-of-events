export default function getRefs() {
  return {
    linkInputSearchForm: document.querySelector('.search-event'),
    linkInputSearch: document.querySelector('.search-input-event'),
    linkInputSearchBtn: document.querySelector('.search-button__icon'),
    linkInputEvent: document.querySelector('.search-event'),
    linkDropdownBtn: document.querySelector('.drop-btn'),
    linkDropdownContent: document.querySelector('.dropdown-content'),
    linkDropdownList: document.querySelector('.dropdown-list'),
    linkDropdownInput: document.querySelector('#myInput'),
    linkDropdownIcon: document.querySelector('.drop-button__icon'),
    linkDropdownInputRes: document.querySelector('.name-list'),
    linkDropdownInputItem: document.querySelector('.name-item'),

    eventGrid: document.querySelector('.event-grid'),
    buyStandartTickets: document.querySelector('.btn-buy-standart'),
    buyVipTickets: document.querySelector('.btn-buy-vip'),
    btnMoreAuthor: document.querySelector('.btn-more-from'),
  };
}
