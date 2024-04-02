import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Offer = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  //   console.log(params.id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);
  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <main>
      <div className="offer-container">
        <div className="offer-picture">
          <img src={data.product_image.secure_url} alt={data.product_name} />
        </div>

        <div className="offer-infos">
          <div>
            <span className="offer-price">{data.product_price} €</span>
          </div>
          {data.product_details.map((detail) => {
            console.log(detail);
            const keys = Object.keys(detail);
            // console.log(keys);
            const keyName = keys[0];
            // console.log(keyName);
            return (
              <div key={keyName} className="offer-list">
                <ul>
                  <li>
                    <span>{keyName}</span>
                    <span>{detail[keyName]}</span>
                  </li>
                </ul>
              </div>
            );
          })}
          <div className="divider"></div>
          <div>
            <br></br>
            <span>{data.product_name}</span>
            <br></br>
            <br></br>
            <span>{data.product_description}</span>
            <br></br>
            <br></br>
            <div className="card-avatar">
              <img
                src={data.owner.account.avatar?.secure_url}
                alt={data.owner.account.username}
              />
              <span>{data.owner.account.username}</span>
            </div>
            <div className="sale">
              <button>Acheter</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Offer;
