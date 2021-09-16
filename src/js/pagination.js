import shortPagTpl from '../templates/shortPagination.hbs'
import longPagTpl from '../templates/longPagination.hbs'

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


function paginationLong(pages) {
    for (let i = 0; i < 5; i++){
        array[i] = i + 1;
    }
    array[5] = '...';
    array[6] = pages;
    refs.output.innerHTML = longPagTpl({ array: array });
    links = document.querySelectorAll('.pagination__link');
    for (let item of links) {        
        if (item.textContent === '...') {
            item.classList.add('pagination__link--dots');
            item.classList.remove('pagination__link');
        }
    }
    for (let i = 0; i < links.length; i++) {
        links[i].addEventListener('click', onClick);
    }
    
    
}

function paginationShort(pages) {
    for (let i = 0; i < pages; i++){
        array[i] = i + 1;
    }

    refs.output.innerHTML = shortPagTpl(array);
    links = document.querySelectorAll('.pagination__link');
    for (let i = 0; i < links.length; i++) {
        links[i].addEventListener('click', onClickShort);
    }

}

function onClick(e) {
    e.preventDefault();
    const first = document.querySelector('.pagination__link');
    first.classList.remove('pagination__item--current');
    prevPage = currPage;
    currPage = e.target.textContent;

    // console.dir(links[6].textContent);

    if (parseInt(currPage) > 4) {
        array = [1, '...', 4, 5, 6, '...', links[6].textContent];
        refs.output.innerHTML = longPagTpl({ array: array });
        links = document.querySelectorAll('.pagination__link');
        for (let item of links) {        
        if (item.textContent === '...') {
            item.classList.add('pagination__link--dots');
            item.classList.remove('pagination__link');
        }
    }
    }


    // for (let i = 0; i < links.length; i++){
    //     if (i = 5) {
    //         array = [1, '...', 4, 5, 6, '...', links[6].textContent];
    //         refs.output.innerHTML = longPagTpl({ array: array });
    //     }
    // }





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

pagination(17);