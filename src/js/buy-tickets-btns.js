import getRefs from "./get-refs"
const refs = getRefs()


function onBuyStandartTicketBtnClick(event) {
    if (event.target.nodeName !== 'BUTTON') {
        return
    }
    let url = refs.buyStandartTickets.getAttribute('data-link')
    refs.buyStandartTickets.onclick=  window.open(`${url}`,'_blank')
    // console.log(refs.buyStandartTickets.getAttribute('data-link'))
}
function onBuyVipTicketBtnClick(event) {
    if (event.target.nodeName !== 'BUTTON') {
        return
    }
    let url = refs.buyVipTickets.getAttribute('data-link')
    refs.buyVipTickets.onclick=  window.open(`${url}`,'_blank')
    // console.log(refs.buyVipTickets.getAttribute('data-link'))
}


refs.buyStandartTickets.addEventListener('click', onBuyStandartTicketBtnClick)

refs.buyVipTickets.addEventListener('click', onBuyVipTicketBtnClick)

// console.log(refs.buyBtns)
// console.log(refs.buyStandartTicket)
// console.log(refs.buyVipTickets.getAttribute('data-link'))
