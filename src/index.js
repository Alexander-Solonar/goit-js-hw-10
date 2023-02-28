import debounce from 'lodash.debounce';
import './css/styles.css';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';

const divCard = document.querySelector('.country-info');
const userInput = document.querySelector('#search-box');
const DEBOUNCE_DELAY = 300;

userInput.addEventListener('input', debounce(inputCountry, DEBOUNCE_DELAY));

function inputCountry(event) {
  const name = event.target.value.trim();
  if (name === '') {
    divCard.innerHTML = '';
    return;
  }
  fetchCountries(name);
}

export function notiflixInfo() {
  Notiflix.Notify.info(
    'Too many matches found. Please enter a more specific name.'
  );
}
