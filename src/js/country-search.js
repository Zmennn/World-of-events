import { eventProcessing } from '../index';
import getRefs from './get-refs';
import countryCodes from '../country-codes.json';

const refs = getRefs();
const newArray = [];
let countryCodeValue = '';
let requestInputValue = '';

refs.linkDropdownBtn.addEventListener('click', showCountryDropdownForm);
refs.linkDropdownInput.addEventListener('input', inputValueCountryDropdownList);
refs.linkDropdownIcon.addEventListener('click', showCountryDropdownForm);

function showCountryDropdownForm(e) {
  countryCodeValue = '';
  if (refs.linkInputSearch.value === '') {
    requestInputValue = '';
  }
  document.getElementById('myDropdown').classList.toggle('show');
  refs.linkDropdownList.innerHTML = showCountryList(countryCodes);
  refs.linkDropdownBtn.textContent = 'Choose country';
  document.getElementById('myInput').value = '';
  refs.linkDropdownInput.scrollIntoView({
    behavior: 'smooth',
    block: 'center',
  });
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

function inputValueCountryDropdownList(e) {
  let inputValue, i;
  newArray.splice(0, 100);
  inputValue = refs.linkDropdownInput.value;
  const newInputValue =
    inputValue.substring(0, 1).toUpperCase() + inputValue.substring(1);
  for (i = 0; i < countryCodes.length; i++) {
    const nameCountry = countryCodes[i].name;
    if (nameCountry.slice(0, inputValue.length) === newInputValue) {
      newArray.push(nameCountry);
      refs.linkDropdownList.innerHTML = showCountryName(newArray);
    } else if (inputValue === '') {
      refs.linkDropdownList.innerHTML = showCountryList(countryCodes);
    }
  }
}

refs.linkDropdownList.addEventListener('click', showCountryEventInfo);

// Возвращается Сountry Code - element.code//
function showCountryEventInfo(e) {
  countryCodeValue = '';
  refs.linkDropdownBtn.textContent = e.target.textContent;
  countryCodes.forEach(element => {
    if (element.name === e.target.textContent) {
      refs.linkDropdownContent.classList.remove('show');
      countryCodeValue = element.code;
      requestCodeInfo(requestInputValue, countryCodeValue);

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
    refs.linkInputSearch.value = '';
  }
}

refs.linkInputSearchForm.addEventListener('submit', onInputChange);
refs.linkInputSearchBtn.addEventListener('click', onInputChange);

// Возвращается значение - input //
function onInputChange(e) {
  e.preventDefault();
  const input = refs.linkInputSearch.value;
  requestInputValue = input;
  requestCodeInfo(requestInputValue, countryCodeValue);
}

// Возвращается значения - input + code//
function requestCodeInfo() {
  console.log(requestInputValue, countryCodeValue);
}
