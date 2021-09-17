import paginationTpl from '../templates/pagination.hbs'

const refs = {
    output: document.querySelector('.js-pagination'),
}
let currPage = 1;
let prevPage = 1;
let links = [];
let array = [];


export default function pagination(pages) {
    pages > 7 ? paginationLong(pages) : paginationShort(pages);

    const first = document.querySelector('.pagination__link');
    first.classList.add('pagination__item--current');
}

function paginationShort(pages) {
    for (let i = 0; i < pages; i++){
        array[i] = i + 1;
    }
    refs.output.innerHTML = paginationTpl(array);
    links = document.querySelectorAll('.pagination__link');
    for (let i = 0; i < links.length; i++) {
        links[i].addEventListener('click', onClickShort);
    }

}
function onClickShort(e) {
    e.preventDefault();
    const first = document.querySelector('.pagination__link');
    first.classList.remove('pagination__item--current');
    prevPage = currPage;
    currPage = e.target.textContent;

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
    return currPage;
}

function paginationLong(pages) {
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
        console.log('current page:', currPage);
        return currPage;
    }

    if ((parseInt(currPage) > 4) && (parseInt(currPage) <= (parseInt(links[6].textContent) - 4))) {
        array = [1, '...', parseInt(currPage) - 1, currPage, parseInt(currPage) + 1, '...', parseInt(links[6].textContent)];
        longPaginationMarkup(array, links, currPage, prevPage);
        console.log('current page:', currPage);
        return currPage;
    }

    if (parseInt(currPage) > (parseInt(links[6].textContent) - 4)) {
        array = [1, '...', parseInt(links[6].textContent) - 4, parseInt(links[6].textContent) - 3,
            parseInt(links[6].textContent) - 2, parseInt(links[6].textContent) - 1, parseInt(links[6].textContent)];
        longPaginationMarkup(array, links, currPage, prevPage);
        console.log('current page:', currPage);
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

pagination(13);