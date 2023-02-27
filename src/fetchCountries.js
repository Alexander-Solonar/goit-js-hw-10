import { notiflixInfo } from './index';

export function fetchCountries(name) {
  fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  )
    .then(respons => respons.json())
    .then(resp => {
      if (resp.length > 10) {
        notiflixInfo();
      } else if (resp.length === 1) {
        console.log(resp[0].name.official);
      }
    });
  // .then(resp => {
  //   console.log(resp[0].flags.svg);
  //   return resp;
  // })
  // .then(resp => {
  //   console.log(resp[0].capital.join());
  //   return resp;
  // })
  // .then(resp => {
  //   console.log(resp[0].population);
  //   return resp;
  // })
  // .then(resp => {
  //   const x = resp[0].languages;
  //   console.log(Object.values(x).join(' '));
  // });
}
