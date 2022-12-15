export default function Pokedex({ data }) {
  return (
    <div>
      <div className="Card">
        <div className="Card_img">
          <img src={data.pokeImg} alt="" /> <br />
        </div>

        <div className="Card_name">{data.pokeName}</div>
        <div className="Card_types">
          {data.pokeTypes.map((type) => {
            return <div className="Card_type">{type.type.name}</div>;
          })}
        </div>
      </div>
    </div>
  );
}
