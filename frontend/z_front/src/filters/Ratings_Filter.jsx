import React, { useState } from "react";
import { Link } from "react-router-dom";

const RatingsFilter = () => {
  //usestate to store the value of the current rating
  const [filter_query, setfilter_query] = useState(3); // Initial value

  //this function called whenevr the rating is changed
  const handleInputChange = (event) => {
    const newValue = parseInt(event.target.value);
    setfilter_query(newValue);
    // console.log(newValue);
  };
  

  return (
    // user will select the rating and selected rating is stored in the usestate and on click of apply button a new url is opened
    // containing the rating as parameter and a new component will open using routes in Appf.js

    <div>

      <div className="rating_page">

         {/* div containing label and selected rating  */}
        <div className="selectedrating_label_and_rating_div">

          <div className="rating_heading">Rating</div>
          <div className="actual_rating"> {filter_query}+</div>
        </div>



        <div class="form-group">

          {/* label = 2,3,4 above the input range  */}
          <div class="range-labels">
            <span class="label">2</span>
            <span class="label">3</span>
            <span class="label">4</span>
          </div>

          {/* input range  */}
          <input type="range" class="form-range range_input" min="2" max="4" step="1" id="customRange3" value={filter_query} onChange={handleInputChange} />
          
        </div>  

        {/* when this apply button is clicked , appf.js is checked , and there we have written a route , that if this link is called which component to be displayed  */}
        {/* the coponenet will be displayed , with below as the link , then in that component we will call the backend and get the data that we want to display */}
        <div className="rating_apply_btn_div" type="button">

          <Link to={`/filter/${filter_query}`} className="price_filter_apply_bttn">Apply</Link>
        </div>

      </div>

      
    </div>
  );
};

export default RatingsFilter;
