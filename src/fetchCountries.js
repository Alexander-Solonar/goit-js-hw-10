import { notiflixInfo } from './index';
import Notiflix from 'notiflix';

export function fetchCountries(name) {
  fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  )
    .then(respons => {
      if (!respons.ok) {
        throw new Error('Oops, there is no country with that name');
      }
      return respons.json();
    })
    .then(resp => {
      if (resp.length > 10) {
        notiflixInfo();
      } else if (resp.length === 1) {
        marcurCardInfo(resp);
      }
    })
    .catch(error => {
      Notiflix.Notify.failure(`${error}`);
    });
}

const divCard = document.querySelector('.country-info');

function marcurCardInfo(info) {
  return (divCard.innerHTML = `<div>
  <img src="${info[0].flags.svg}" alt="" width='40'>
  <h1>${info[0].name.official}</h1>
  <p><h2>Capital:</h2><span>${info[0].capital.join()}</span></p>
  <p><h2>Population:</h2><span>${info[0].population}</span></p>
  <p><h2>Languages:</h2><span>${Object.values(info[0].languages).join(
    ' '
  )}</span></p>
</div>`);
}
