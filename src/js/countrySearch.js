const countryCodes = [
  { code: 'US', name: 'United States Of America' },
  ,
  { code: 'AD', name: 'Andorra' },
  ,
  { code: 'AR', name: 'Argentina' },
  ,
  { code: 'AT', name: 'Austria' },
  ,
  { code: 'AZ', name: 'Azerbaijan' },
  ,
  { code: 'BS', name: 'Bahamas' },
  ,
  { code: 'AI', name: 'Anguilla' },
  ,
  { code: 'BH', name: 'Bahrain' },
  ,
  { code: 'AU', name: 'Australia' },
  ,
  { code: 'BB', name: 'Barbados' },
  ,
  { code: 'BM', name: 'Bermuda' },
  ,
  { code: 'BR', name: 'Brazil' },
  ,
  { code: 'BG', name: 'Bulgaria' },
  ,
  { code: 'CA', name: 'Canada' },
  ,
  { code: 'BE', name: 'Belgium' },
  ,
  { code: 'CL', name: 'Chile' },
  ,
  { code: 'CN', name: 'China' },
  ,
  { code: 'CO', name: 'Colombia' },
  ,
  { code: 'CR', name: 'Costa Rica' },
  ,
  { code: 'HR', name: 'Croatia' },
  ,
  { code: 'CY', name: 'Cyprus' },
  ,
  { code: 'CZ', name: 'Czech Republic' },
  ,
  { code: 'DK', name: 'Denmark' },
  ,
  { code: 'DO', name: 'Dominican Republic' },
  ,
  { code: 'EC', name: 'Ecuador' },
  ,
  { code: 'EE', name: 'Estonia' },
  ,
  { code: 'FO', name: 'Faroe Islands' },
  ,
  { code: 'FI', name: 'Finland' },
  ,
  { code: 'FR', name: 'France' },
  ,
  { code: 'GE', name: 'Georgia' },
  ,
  { code: 'DE', name: 'Germany' },
  ,
  { code: 'GH', name: 'Ghana' },
  ,
  { code: 'GI', name: 'Gibraltar' },
  ,
  { code: 'GB', name: 'Great Britain' },
  ,
  { code: 'GR', name: 'Greece' },
  ,
  { code: 'HK', name: 'Hong Kong' },
  ,
  { code: 'HU', name: 'Hungary' },
  ,
  { code: 'IS', name: 'Iceland' },
  ,
  { code: 'IN', name: 'India' },
  ,
  { code: 'IE', name: 'Ireland' },
  ,
  { code: 'IL', name: 'Israel' },
  ,
  { code: 'IT', name: 'Italy' },
  ,
  { code: 'JM', name: 'Jamaica' },
  ,
  { code: 'JP', name: 'Japan' },
  ,
  { code: 'KR', name: 'Korea, Republic of' },
  ,
  { code: 'LV', name: 'Latvia' },
  ,
  { code: 'LB', name: 'Lebanon' },
  ,
  { code: 'LT', name: 'Lithuania' },
  ,
  { code: 'LU', name: 'Luxembourg' },
  ,
  { code: 'MY', name: 'Malaysia' },
  ,
  { code: 'MT', name: 'Malta' },
  ,
  { code: 'MX', name: 'Mexico' },
  ,
  { code: 'MC', name: 'Monaco' },
  ,
  { code: 'ME', name: 'Montenegro' },
  ,
  { code: 'MA', name: 'Morocco' },
  ,
  { code: 'NL', name: 'Netherlands' },
  ,
  { code: 'AN', name: 'Netherlands Antilles' },
  ,
  { code: 'NZ', name: 'New Zealand' },
  ,
  { code: 'ND', name: 'Northern Ireland' },
  ,
  { code: 'NO', name: 'Norway' },
  ,
  { code: 'PE', name: 'Peru' },
  ,
  { code: 'PL', name: 'Poland' },
  ,
  { code: 'PT', name: 'Portugal' },
  ,
  { code: 'RO', name: 'Romania' },
  ,
  { code: 'RU', name: 'Russian Federation' },
  ,
  { code: 'LC', name: 'Saint Lucia' },
  ,
  { code: 'SA', name: 'Saudi Arabia' },
  ,
  { code: 'RS', name: 'Serbia' },
  ,
  { code: 'SG', name: 'Singapore' },
  ,
  { code: 'SK', name: 'Slovakia' },
  ,
  { code: 'SI', name: 'Slovenia' },
  ,
  { code: 'ZA', name: 'South Africa' },
  ,
  { code: 'ES', name: 'Spain' },
  ,
  { code: 'SE', name: 'Sweden' },
  ,
  { code: 'CH', name: 'Switzerland' },
  ,
  { code: 'TW', name: 'Taiwan' },
  ,
  { code: 'TH', name: 'Thailand' },
  ,
  { code: 'TT', name: 'Trinidad and Tobago' },
  ,
  { code: 'TR', name: 'Turkey' },
  ,
  { code: 'UA', name: 'Ukraine' },
  ,
  { code: 'AE', name: 'United Arab Emirates' },
  ,
  { code: 'UY', name: 'Uruguay' },
  ,
  { code: 'VE', name: 'Venezuela' },
];

import getRefs from './get-refs';
const refs = getRefs();
console.log(countryCodes[0].code);
const newArray = [];

function eventSearch(countryCode) {
  fetch(
    `https://app.ticketmaster.com/discovery/v2/events.json?countryCode=${countryCode}&apikey=AmacJHw1PVxi43hxMLwa56XAbBAafJvj`,
  )
    .then(response => response.json())
    .then(data => console.log(data._embedded.events));
}

refs.linkDropdownBtn.addEventListener('click', showCountryDropdownForm);
refs.linkDropdownInput.addEventListener('input', filterCountryDropdownList);
function showCountryDropdownForm(e) {
  document.getElementById('myDropdown').classList.toggle('show');
  refs.linkDropdownList.innerHTML = showCountryList(countryCodes);
}

function showCountryList(countryCodes) {
  return countryCodes
    .map(array => {
      return `
<ul class='name-list'>
  <li class='name-item'>${array.name}</li>
</ul>
`;
    })
    .join('');
}

function showCountryName(array) {
  // console.log(array);
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
