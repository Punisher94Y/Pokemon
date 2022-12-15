import Header from "../Header";
import Pokedex from "../components/Cards/CardPokedex";
import getPokedex from "../components/Pokedex";
import PokemonSearch from "../components/PokemonSearch";

import { useState, useEffect } from "react";
import getPokemon from "../components/Pokemon";

export default function PageAccueil() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [details, setDetails] = useState(null);
  const [addPoke, setAddPoke] = useState();

  useEffect(() => {
    getPokedex().then((data) => {
      setData(data);
    });
  }, []);

  const handleClick = async () => {
    try {
      const responce = await PokemonSearch.detail(search);
      setDetails(responce);
    } catch (err) {
      setDetails({ error: "pokemon not found" });
    }
  };

  const tab = [];
  data.map((data) => {
    tab.push(data.pokeName);
  });

  let addPokeUrl = `https://pokeapi.co/api/v2/pokemon/${search}`;

  useEffect(() => {
    let tmp = getPokemon(addPokeUrl);
    setAddPoke(tmp);
  }, [search]);

  fetch(addPokeUrl) //1
    .then((response) => response.json()) //2
    .then((pokemon) => {
      console.log(pokemon.name);
      console.log(pokemon.types);
      console.log(pokemon.sprites.front_default);
    });

  // const putPokeToDB = async () => {
  //   if (tab.includes(search)) {
  //     return alert("existe deja");
  //   } else {
  //     fetch(addPokeUrl), {
  //       method: "POST",
  //       body: JSON.stringify({
  //         pokeName: search,
  //         pokeTypes: ,
  //         pokeImg: ,
  //       }),
  //       headers: { "Content-Type": "application/json" },
  //     })
  //       .then(alert("Vous avez ajouté le pokemon dans votre Pokédex"))
  //       .then(window.location.reload(true));
  //   }
  // };

  const delPokedex = async () => {
    fetch("http://localhost:5000/myPokedex", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(alert("Vous avez supprimer votre Pokédex"))
      .then(window.location.reload(true));
  };

  return (
    <div>
      <Header />
      {data.map((data, i) => {
        return <Pokedex key={i} data={data} />;
      })}
      <div>
        <h1>Let's look up a pokemon</h1>
        <input value={search} onChange={(evt) => setSearch(evt.target.value)} />
        <button onClick={handleClick}>Search</button>

        {details &&
          (details.error ? (
            <h1>{details.error}</h1>
          ) : (
            <div>
              <h1>{details.name}</h1>
              <img src={details.sprites.front_default} alt="" />
              {details.types.map((type) => {
                return <div className="Card_type">{type.type.name}</div>;
              })}
              <button>Ajouter le pokemon</button>
            </div>
          ))}
      </div>
      <button onClick={delPokedex}>Supprimer le pokédex</button>
    </div>
  );
}
