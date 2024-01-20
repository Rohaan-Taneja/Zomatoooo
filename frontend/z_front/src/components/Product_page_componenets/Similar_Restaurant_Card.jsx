import React from 'react'
import { Link } from "react-router-dom";

const Similar_Restaurant_Card = (props) => {

    const handleclick=()=>{
        window.scrollTo({top:0 , behavior:'smooth'})
    }


  return (
      <div>
        {props ? (
          <div>
            <Link to={`/Productpage/${props.i0}`} className="card_outer" onClick={handleclick}>
              <div class="card card_frame">
                {/* console.log("this is the fooddata ") */}
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
  
                  <div className="price_div">
                    <div class="pricee">{props.i4} Rs</div>
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
}

export default Similar_Restaurant_Card