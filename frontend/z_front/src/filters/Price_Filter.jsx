import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Price_Filter = () => {
  var [filter_query, setfilter_query] = useState("");

  const set_order = (event) => {
    // console.log(event.target.value)
    setfilter_query(event.target.value);
    // console.log(event.target.value)
  };

  return (
    <div>

      <div className="outer_of_price_filter_page">

        {/* radio button div for price high to low  */}
        <div className="radiobttn_class">

          <input type="radio" name="price" id="price" value={"high_to_low"} onClick={set_order} />

          <label htmlFor="priceinput" className="radio_btn_label">
            price high to low
          </label>
        </div>

        {/* radio button for price low to high  */}
        <div className="radiobttn_class">
          
          <input type="radio" name="price" id="price" value={"low_to_high"} onClick={set_order} />

          <label htmlFor="priceinput" className="radio_btn_label">
            price low to high
          </label>
        </div>
        
      </div>

      {/* when this apply button is clicked , appf.js is checked , and there we have written a route , that if this link is called which component to be displayed  */}
      {/* the coponenet will be displayed , with below as the link , then in that component we will call the backend and get the data that we want to display */}
      <div className="pricefilter_appy_div" type="button">
      <Link to={`/filter/${filter_query}`} className="price_filter_apply_bttn">
        Apply
      </Link>
      </div>
    </div>
  );
};

export default Price_Filter;
