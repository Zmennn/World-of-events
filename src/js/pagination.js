import paginationTpl from '../templates/pagination.hbs'
import { eventProcessing } from '../index'

const refs = {
    output: document.querySelector('.js-pagination'),
}
let currPage = 1;
let prevPage = 1;
let links = [];
let array = [];
let p = 1;


export default function pagination(pages) {
    refs.output.removeEventListener('click', onClickShort);
    refs.output.removeEventListener('click', onClick);
    pages > 7 ? paginationLong(pages) : paginationShort(pages);

    const first = document.querySelector('.pagination__link');
    first.classList.add('pagination__item--current');


}

function paginationShort(pages) {
    links = [];
    array = [1];
    if (pages > 1) {
        for (let i = 0; i < pages; i++) {
            array[i] = i + 1;
        }
    }
    refs.output.innerHTML = paginationTpl(array);
    refs.output.addEventListener('click', onClickShort);

}
function onClickShort(e) {
    e.preventDefault();
    if (!e.target.classList.contains('pagination__link')) {
        return;
    }
    const first = document.querySelector('.pagination__link');
    first.classList.remove('pagination__item--current');
    prevPage = currPage;
    currPage = e.target.textContent;
    links = document.querySelectorAll('.pagination__link');

    for (let item of links) {
        if (item.textContent === prevPage) {
            item.classList.remove('pagination__item--current');
        }
    }
    for (let item of links) {
        if (item.textContent === currPage) {
            item.classList.add('pagination__item--current');
        }
    }

    console.log('current page:', currPage);
    eventProcessing.paginationRequest(currPage)
    return currPage;
}

function paginationLong(pages) {
    links = [];
    array = [1, 2, 3, 4, 5, '...', pages];
    refs.output.innerHTML = paginationTpl(array);
    refs.output.addEventListener('click', onClick);
    links = document.querySelectorAll('.pagination__link');
    for (let item of links) {
        if (item.textContent === '...') {
            item.classList.add('pagination__link--dots');
        }
    }

}
function onClick(e) {
    e.preventDefault();
    if (!e.target.classList.contains('pagination__link')) {
        return;
    }
    const first = document.querySelector('.pagination__link');
    first.classList.remove('pagination__item--current');
    prevPage = currPage;
    currPage = e.target.textContent;

    if (parseInt(currPage) <= 4) {
        array = [1, 2, 3, 4, 5, '...', parseInt(links[6].textContent)];
        longPaginationMarkup(array, links, currPage, prevPage);

        eventProcessing.paginationRequest(currPage)
        return currPage;
    }

    if ((parseInt(currPage) > 4) && (parseInt(currPage) <= (parseInt(links[6].textContent) - 4))) {
        array = [1, '...', parseInt(currPage) - 1, currPage, parseInt(currPage) + 1, '...', parseInt(links[6].textContent)];
        longPaginationMarkup(array, links, currPage, prevPage);

        eventProcessing.paginationRequest(currPage)
        return currPage;
    }

    if (parseInt(currPage) > (parseInt(links[6].textContent) - 4)) {
        array = [1, '...', parseInt(links[6].textContent) - 4, parseInt(links[6].textContent) - 3,
            parseInt(links[6].textContent) - 2, parseInt(links[6].textContent) - 1, parseInt(links[6].textContent)];
        longPaginationMarkup(array, links, currPage, prevPage);

        eventProcessing.paginationRequest(currPage)
        return currPage;
    }
}
function longPaginationMarkup(array, links, currPage, prevPage) {
    refs.output.innerHTML = paginationTpl(array);
    links = document.querySelectorAll('.pagination__link');
    for (let item of links) {
        if (item.textContent === '...') {
            item.classList.add('pagination__link--dots');
            item.classList.remove('pagination__link');
        }
    }

    for (let item of links) {
        if (item.textContent === prevPage) {
            item.classList.remove('pagination__item--current');
        }
    }
    for (let item of links) {
        if (item.textContent === currPage) {
            item.classList.add('pagination__item--current');
        }
    }
}

//pagination(1);