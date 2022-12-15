export default function Card({ pokemon, i }) {
  const putPokeToDB = async (pokemon) => {
    console.log(pokemon);
    fetch("http://localhost:5000/allPokemon", {
      method: "POST",
      body: JSON.stringify({
        pokeName: pokemon.name,
        pokeTypes: pokemon.types,
      }),
      headers: { "Content-Type": "application/json" },
    }).catch((err) => console.log(err));
  };

  return (
    <div className="Card">
      <div className="Card_img">
        <img src={pokemon.sprites.front_default} alt="" /> <br />
      </div>

      <div className="Card_name">{pokemon.name}</div>
      <div className="Card_types">
        {pokemon.types.map((type) => {
          return <div className="Card_type">{type.type.name}</div>;
        })}
      </div>
      <button onClick={putPokeToDB}>Ajouter au pokédex</button>
    </div>
  );
}
