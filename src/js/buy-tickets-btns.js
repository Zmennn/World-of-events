import getRefs from "./get-refs"
const refs = getRefs()
let url = ''

function onBuyBtnClick(event) {
    if (event.target.nodeName !== 'BUTTON') {
        return
    }
    url = 'https://google.com'
    refs.buyBtn.onclick = location.href=`${url}`
    goToTicketSeller(url)
}

function goToTicketSeller(url) {
    
    console.log(url)
}
refs.buyBtn.addEventListener('click', onBuyBtnClick)
