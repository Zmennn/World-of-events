import { eventProcessing } from '../index';
import getRefs from './get-refs';
import countryCodes from '../country-codes.json';
const refs = getRefs();
const newArray = [];
refs.linkDropdownBtn.addEventListener('click', showCountryDropdownForm);
refs.linkDropdownInput.addEventListener('input', filterCountryDropdownList);
refs.linkDropdownIcon.addEventListener('click', showCountryDropdownForm);

function showCountryDropdownForm(e) {
  document.getElementById('myDropdown').classList.toggle('show');
  refs.linkDropdownList.innerHTML = showCountryList(countryCodes);
  refs.linkDropdownBtn.textContent = 'Choose country';
  document.getElementById('myInput').value = '';
}
function showCountryList(countryCodesArray) {
  return countryCodesArray
    .map(item => {
      return `
<ul class='name-list'>
  <li class='name-item'>${item.name}</li>
</ul>
`;
    })
    .join('');
}
function showCountryName(array) {
  return array
    .map(elem => {
      return `
<ul class='name-list'>
  <li class='name-item'>${elem}</li>
</ul>
`;
    })
    .join('');
}
function filterCountryDropdownList(e) {
  let input, filter, a, i, list;
  input = refs.linkDropdownInput;
  filter = input.value.toUpperCase();
  a = document.querySelectorAll('.name-item');
  list = document.querySelectorAll('.name-list');
  for (i = 0; i < a.length; i++) {
    const txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.split('')[0] === filter) {
      newArray.push(txtValue);
      refs.linkDropdownList.innerHTML = showCountryName(newArray);
    } else if (input.value === '') {
      refs.linkDropdownList.innerHTML = showCountryList(countryCodes);
    }
  }
}
refs.linkDropdownList.addEventListener('click', showCountryEventInfo);

// Возвращается Сountry Code - element.code//
function showCountryEventInfo(e) {
  refs.linkDropdownBtn.textContent = e.target.textContent;
  countryCodes.forEach(element => {
    if (element.name === e.target.textContent) {
      refs.linkDropdownContent.classList.remove('show');
      console.log(element.code);

      eventProcessing.standardRequest({ countryCode: element.code });
    }
  });
}
const headerZoneItem = document.querySelector('.header__item');
const headerZoneInput = document.querySelector('.container');
const headerZone = document.querySelector('.header');
headerZone.addEventListener('click', onBackdropClose);
headerZoneItem.addEventListener('click', onBackdropClose);
headerZoneInput.addEventListener('click', onBackdropClose);
document.addEventListener('click', onBackdropClose);
function onBackdropClose(e) {
  if (e.currentTarget === e.target) {
    refs.linkDropdownContent.classList.remove('show');
    refs.linkDropdownBtn.textContent = 'Choose country';
    document.getElementById('myInput').value = '';
  }
}
