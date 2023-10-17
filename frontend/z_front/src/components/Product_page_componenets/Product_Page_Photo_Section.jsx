import React from "react";

const Product_Page_Photo_Section = (props) => {
  console.log(props.foodimage);
  return (

    //  today on 6th sept , completed the css of this component 
    <div>
      <div className="productpage_image_outer">
        <div className="productpage_image_flex">
          {/* big image div */}
          <div className="productpage_image_flex_div1">
            <img
              src={`/images/${props.foodimage}`}
              className="productpage_image_flex_image1"
              alt="image1"
            />
          </div>

          {/* smaill images div (smaall 2 images ) */}
          <div className="productpage_image_flex_div2">
            <img
              className="image_set2"
              src={`/images/${props.foodimage}`}
              alt="imag2"
            />
            <img
              className="image_set2"
              src={`/images/${props.foodimage}`}
              alt="image3"
            />
          </div>
          <div className="productpage_image_flex_div3">
            <img
              src={`/images/${props.foodimage}`}
              className="productpage_image_flex_image3"
              alt="image1"
            />
            <div class="text-overlay">{props.foodname}</div>
          </div>

          
        </div>
      </div>
      {/* food details div  */}
      <div className="productpage_image_details">
        <div className="food_name_rating_row">
          <div className="food_name">{props.foodname}</div>
          <div className="food_rating">{props.foodrating} &#9734;</div>
        </div>
      </div>
    </div>
  );
};

export default Product_Page_Photo_Section;
