import logo from "../assets/img/logo.svg";

import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = ({ token, handleToken, search, setSearch }) => {
  return (
    <>
      <div className="header-container">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="logo vinted" />
          </Link>
        </div>
        <div className="search-container">
          <FontAwesomeIcon icon="fa-magnifying-glass" className="search-icon" />
          <input
            className="input-search"
            placeholder="Rechercher des articles"
            type="text"
            name="search"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          />
        </div>
        <div className="button">
          {token ? (
            <button
              style={{
                backgroundColor: "#c2175b",
                color: "white",
                border: "#c2175b",
              }}
              onClick={() => {
                // Je me déconnecte en appelant la fonction handleToken et en lui donnant null en argument
                handleToken(null);
              }}
            >
              {" "}
              Se déconnecter
            </button>
          ) : (
            <>
              <Link to="/signup">
                <button className="button-signup">s'inscrire</button>
              </Link>
              <Link to="/login">
                <button className="button-login">se connecter</button>
              </Link>
            </>
          )}
        </div>
        <div className="sale">
          <Link to="/publish">
            <button>vends tes articles</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;
