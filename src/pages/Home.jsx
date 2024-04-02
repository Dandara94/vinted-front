import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import hero from "../assets/img/hero.jpg";

const Home = ({ search }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offers"
        );

        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [search]);
  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <>
      <div className="hero-container">
        <div className="hero">
          <img src={hero} alt="hero" />
        </div>
      </div>

      <div className="main-container">
        {data.offers.map((offer) => {
          return (
            <div className="card-container" key={offer._id}>
              <Link to={`/offers/${offer._id}`}>
                <article>
                  <div className="card-avatar">
                    <img
                      src={offer.owner.account.avatar?.secure_url}
                      alt={offer.owner.account.username}
                    />
                    <span>{offer.owner.account.username}</span>
                  </div>
                  <div className="card-product">
                    <img
                      src={offer.product_image.secure_url}
                      alt={offer.product_name}
                    />
                    <div className="info">
                      <p>{offer.product_price} €</p>
                      <p>{offer.product_details[1].TAILLE}</p>
                      <p>{offer.product_details[0].MARQUE}</p>
                    </div>
                  </div>
                </article>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Home;
