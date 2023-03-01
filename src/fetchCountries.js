export function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  ).then(respons => {
    if (!respons.ok) {
      throw new Error();
    }
    return respons.json();
  });
}
