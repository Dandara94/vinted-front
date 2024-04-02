import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

// Je récupère la fonction handleToken en props
const Signup = ({ handleToken }) => {
  // States qui gèrent mes inputs
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsLetter, setNewsLetter] = useState(false);

  //   State qui gère le message d'erreur
  const [errorMessage, setErrorMessage] = useState("");

  //   Permet de naviguer au click après avoir exécuté du code
  const navigate = useNavigate();

  // Fonction qui sera appelée lors de la validation du formulaire
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      //   Je fais disparaitre un éventuel message d'erreur
      setErrorMessage("");
      //   Requête axios :
      // - Premier argument : l'url que j'interroge
      // - deuxième : le body que j'envoi
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        {
          email: email,
          username: username,
          password: password,
          newsletter: newsLetter,
        }
      );
      console.log("===> la réponse", response.data);
      //   Cookies.set("vinted-token", response.data.token, { expires: 15 });
      // J'enregistre le token dans mon state et mes cookies
      handleToken(response.data.token);
      // Je navigue vers ma page /
      navigate("/");
    } catch (error) {
      console.log(error.response.data);
      //   console.log(error.response.status); // Pour voir le message d'erreur transmis par le serveur
      // Si je reçois le status 409
      if (error.response.status === 409) {
        // Je met à jour mon state errorMessage
        setErrorMessage(
          "This email already has an account, please use another one"
        );
      } else if (error.response.data.message === "Missing parameters") {
        setErrorMessage("Please fill in all the fields");
      }
    }
  };

  return (
    <div className="signup-container">
      <h2>S'inscrire</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          name="username"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          name="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />

        <div className="checkbox-container">
          <div className="checkbox">
            <input
              checked={newsLetter}
              type="checkbox"
              onChange={() => {
                setNewsLetter(!newsLetter);
              }}
            />
            <span>S'inscrire à notre newsletter</span>
          </div>
          <p>
            En m'inscrivant je confirme avoir lu et accepté les Termes &
            Conditions et Politique de Confidentialité de Vinted. Je confirme
            avoir au moins 18 ans.
          </p>
        </div>
        <input type="submit" value="S'inscrire" />
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </form>
      <div className="signup-link">
        <Link to="/login">Tu as déjà un compte ? Connecte-toi !</Link>
      </div>
    </div>
  );
};

export default Signup;
