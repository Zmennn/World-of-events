import shortPagTpl from '../templates/shortPagination.hbs'

const refs = {
    output: document.querySelector('.js-pagination'),
}

export default function pagination(pages) {
    let currPage = 1;

    let array = [];
    for (let i = 0; i < pages; i++){
        array[i] = i + 1;
    }

    pages > 7 ? paginationLong(pages) : paginationShort(array);

    const first = document.querySelector('.pagination__link');
    first.classList.add('pagination__item--current');

    console.log(currPage);
}

// console.log("call pagination function:");
// временный вызов для проверки отрисовки
pagination(7);

function paginationLong(pages) {
    console.log("loading");
}

function paginationShort(array) {

    refs.output.innerHTML = shortPagTpl(array);
    
}