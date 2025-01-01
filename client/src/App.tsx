import { Link, NavLink, Outlet } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <>
      <header>
        <Link to="/">
          <h1 className="logo">Wild Series</h1>
        </Link>
      </header>

      <nav className="navbar">
        <ul>
          <li>
            <NavLink to="/categories">Catégories</NavLink>
          </li>
          <li>
            <NavLink to="/programs">Séries</NavLink>
          </li>
        </ul>
      </nav>

      <main className="text-box">
        <Outlet />
      </main>

      <footer>
        Développé par la&nbsp;
        <a
          href="https://www.wildcodeschool.com/"
          className="wcs"
          target="_blank"
          rel="noopener noreferrer"
        >
          Wild Code School
        </a>
      </footer>
    </>
  );
}

export default App;
