import { useState, useEffect, useCallback } from "react";

export default function Pokemon() {
  const [pokemon, setPokemon] = useState([]);
  const [url, setUrl] = useState({
    current: "https://pokeapi.co/api/v2/pokemon/",
    next: null,
    previous: null,
  });
  const [image, setImage] = useState([]);
  const [types, setTypes] = useState([]);

  const next = () => {
    const nextUrl = {
      current: url.next,
      previous: url.current,
      next: null,
    };
    setUrl(nextUrl);
  };

  const previous = () => {
    const previousUrl = {
      current: url.previous,
      next: url.current,
      previous: null,
    };
    setUrl(previousUrl);
  };

  useEffect(() => {
    fetch(url.current)
      .then((res) => res.json())
      .then((data) => {
        setPokemon(data.results);
        setUrl({
          current: url.current,
          next: data.next,
          previous: data.previous,
        });
      })
      .catch((err) => console.log(err));
  }, [url.current]);

  useEffect(() => {
    pokemon.map((pokemon) => {
      fetch(pokemon.url)
        .then((res) => res.json())
        .then((data) => {
          setImage((current) => [...current, data.sprites.front_default]);

          setTypes((current) => [...current, data.types[0].type.name]);

          //   if (1 < data.types.length) {
          //     tab.push([data.types[0].type.name]);
          //     tab.push([data.types[1].type.name]);
          //     setTypes(tab);
          //     console.log(tab);
          //   } else {
          //     tab.push([data.types[0].type.name]);
          //     setTypes(tab);
          //     console.log(tab);
          //   }
        })
        .then(setImage([]))
        .then(setTypes([]))
        .catch((err) => console.log(err));
    });
  }, [pokemon]);

  var collator = new Intl.Collator(undefined, {
    numeric: true,
    sensitivity: "base",
  });

  image.sort(collator.compare);
  console.log(pokemon);
  console.log(types);

  return (
    <div>
      <ul>
        {pokemon.map((pokemon, i) => (
          <li key={i}>
            Nom du Pokemon : {pokemon.name} <img src={image[i]} alt="" /> <br />
            Type du Pokemon : {types[i]} <br />
            {pokemon.url}
          </li>
        ))}
      </ul>
      {url.previous && <button onClick={previous}>Previous</button>}
      {url.next && <button onClick={next}>Next</button>}
      <br />
    </div>
  );
}
