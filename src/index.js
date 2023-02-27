import debounce from 'lodash.debounce';
import './css/styles.css';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';

const userInput = document.querySelector('#search-box');
const DEBOUNCE_DELAY = 300;

userInput.addEventListener('input', debounce(inputCountry, DEBOUNCE_DELAY));

function inputCountry(event) {
  const name = event.target.value.trim();
  if (name === '') {
    return;
  }
  fetchCountries(name);
}

export function notiflixInfo() {
  Notiflix.Notify.info(
    'Too many matches found. Please enter a more specific name.'
  );
}

// const obj = {
//   name: {
//     age: 32,
//   },
// };
// console.log(obj['name']);
