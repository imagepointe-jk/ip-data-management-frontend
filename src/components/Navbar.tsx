import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/design-library/">Design Library</Link>
        </li>
      </ul>
    </nav>
  );
}
