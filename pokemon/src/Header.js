import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div>
      <Link to="/">Acceuil</Link>
      <br />
      <Link to="/allPokemon">All Pokemon</Link>
    </div>
  );
}
