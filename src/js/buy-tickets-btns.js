import getRefs from "./get-refs"
const refs = getRefs()


function onBuyStandartTicketBtnClick(event) {
    if (event.target.nodeName !== 'BUTTON') {
        return
    }
    let url = refs.buyStandartTickets.getAttribute('data-link')
    refs.buyStandartTickets.onclick=  window.open(`${url}`,'_blank')
}
function onBuyVipTicketBtnClick(event) {
    if (event.target.nodeName !== 'BUTTON') {
        return
    }
    let url = refs.buyVipTickets.getAttribute('data-link')
    refs.buyVipTickets.onclick=  window.open(`${url}`,'_blank')
}


refs.buyStandartTickets.addEventListener('click', onBuyStandartTicketBtnClick)

refs.buyVipTickets.addEventListener('click', onBuyVipTicketBtnClick)

