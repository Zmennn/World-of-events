import getRefs from './get-refs';
import countryCodes from '../country-codes.json';
const refs = getRefs();

const newArray = [];

refs.linkDropdownBtn.addEventListener('click', showCountryDropdownForm);
refs.linkDropdownInput.addEventListener('input', filterCountryDropdownList);
function showCountryDropdownForm(e) {
  document.getElementById('myDropdown').classList.toggle('show');
  refs.linkDropdownList.innerHTML = showCountryList(countryCodes);
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

function showCountryEventInfo(e) {
  refs.linkDropdownBtn.textContent = e.target.textContent;
  refs.linkDropdownContent.innerHTML = '';
  countryCodes.forEach(element => {
    if (element.name === e.target.textContent) {
      eventSearch(element.code);
      document.getElementById('myDropdown').classList.toggle('show');
    }
  });
}
