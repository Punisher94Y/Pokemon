const BASE_URL = "https://pokeapi.co/api/v2/";

export default {
  detail,
};

function detail(pokemon) {
  return fetch(`${BASE_URL}pokemon/${pokemon}`).then((res) => res.json());
}
