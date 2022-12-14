export default function Card({ pokemon }) {
  return (
    <div>
      <div className="Card_img">
        <img src={pokemon.sprites.front_default} alt="" /> <br />
      </div>

      <div className="Card_name">{pokemon.name}</div>
      <div className="Card_types">
        {pokemon.types.map((type) => {
          return <div className="Card_type">{type.type.name}</div>;
        })}
      </div>
    </div>
  );
}
