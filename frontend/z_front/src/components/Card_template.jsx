import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Card_template = (props) => {
  const backendURL = "http://localhost:999";

  const [food_data, setfoodData] = useState(null);

  useEffect(() => {
    fetch(`${backendURL}/api/specific_data?id=${props.i}`)
      .then((response) => response.json())
      .then((data) => setfoodData(data))
      .catch((error) =>
        console.log("error while getting the individual food data ")
      );
  }, []);

  return (
    <div>
      {food_data ? (
        <div>
          <Link to={`/Productpage/${props.i}`} className="card_outer">
            <div class="card card_frame">
              {/* console.log("this is the fooddata ") */}
              <img
                src={`/images/${food_data[0].f_img}`}
                class="card-img-top card_img"
                alt="food hai"
                style={{ "max-width": "100%", height: "25rem" }}
              />

              <div class="card-body">
                <div className="name_rating_div">
                  <h5 class="card-title only_nameclass">{food_data[0].naam}</h5>
                  <p class="onlyratingclass">{food_data[0].rating}</p>
                </div>

                <div className="price_div">
                  <div class="pricee">{food_data[0].price} Rs</div>
                  {console.log(food_data)}
                </div>
              </div>
            </div>
          </Link>
        </div>
      ) : (
        <div>...please wait loading</div>
      )}
    </div>
  );
};

export default Card_template;
