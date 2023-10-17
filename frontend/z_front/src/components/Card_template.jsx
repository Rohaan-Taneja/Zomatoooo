import React from "react";
import { Link } from "react-router-dom";

const Card_template = (props) => {
  return (
    <Link to={`/Productpage/${props.i0}`} className="card_outer">
      <div class="card card_frame">
        <img
          src={`/images/${props.i2}`}
          class="card-img-top card_img"
          alt="food hai"
          style={{ "max-width": "100%", height: "25rem" }}
        />

        <div class="card-body">
          <div className="name_rating_div">

            <h5 class="card-title only_nameclass">{props.i1}</h5>
            <p class="onlyratingclass">{props.i3}</p>

          </div>

          <div className="price_div" >

            <div class="pricee">{props.i4} Rs</div>
            
          </div>
        
        </div>
      </div>
    </Link>
  );
};

export default Card_template;
