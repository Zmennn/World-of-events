import shortPagTpl from '../templates/shortPagination.hbs'

const refs = {
    output: document.querySelector('.js-pagination'),
}
let currPage = 1;
let links = [];


export default function pagination(pages) {

    let array = [];
    for (let i = 0; i < pages; i++){
        array[i] = i + 1;
    }

    pages > 7 ? paginationLong(pages) : paginationShort(array);

    const first = document.querySelector('.pagination__link');
    first.classList.add('pagination__item--current');

}


function paginationLong(pages) {
    console.log("loading");
}

function paginationShort(array) {

    refs.output.innerHTML = shortPagTpl(array);
    const current = document.querySelector('.pagination');
    current.addEventListener('click', onClick);

}

function onClick(e) {
    e.preventDefault();
    const first = document.querySelector('.pagination__link');
    first.classList.remove('pagination__item--current');
    const prevPage = currPage;
    
    currPage = e.target.textContent;
    console.log(currPage);
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
    return currPage;
}

pagination(7);