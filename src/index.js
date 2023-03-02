import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';

const divCard = document.querySelector('.country-info');
const ulList = document.querySelector('.country-list');
const userInput = document.querySelector('#search-box');

const DEBOUNCE_DELAY = 300;

userInput.addEventListener('input', debounce(inputCountry, DEBOUNCE_DELAY));

function inputCountry(event) {
  const name = event.target.value.trim();
  if (name === '') {
    divCard.innerHTML = '';
    ulList.innerHTML = '';
    return;
  }

  fetchCountries(name)
    .then(checkValidity)
    .catch(() => {
      divCard.innerHTML = '';
      ulList.innerHTML = '';
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
}

function checkValidity(respon) {
  if (respon.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  } else if (respon.length === 1) {
    ulList.innerHTML = '';
    createMarkupCard(...respon);
  } else {
    divCard.innerHTML = '';
    createMarkupListCountry(respon);
  }
}

function createMarkupCard({ flags, name, capital, population, languages }) {
  const language = Object.values(languages).join(', ');

  return (divCard.innerHTML = `
  <div class ="country-name"><img src="${flags.svg}" alt="Flag ${name.official}" width='40' height='30'>
  <h1>${name.official}</h1></div>
  <ul class="list-info">
  <li class="item-info">Capital:<span class="span-info">${capital}</span></li>
  <li class="item-info">Population:<span class="span-info">${population}</span></li>
  <li class="item-info">Languages: <span class="span-info">${language}</span></li>
</ul>`);
}

function createMarkupListCountry(country) {
  ulList.innerHTML = country.reduce((html, { flags, name }) => {
    return (
      html +
      `<li class=country-item><img src="${flags.svg}" alt="" width='50' height='40';> <h2>${name.common}</h2></li>`
    );
  }, '');
}
