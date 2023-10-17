import React from "react";
import { useState } from "react";
import Overview from "./Overview";
import Review from "./Review";

const Product_Page_Overview_Section = (props) => {
  const [activesection, setactivesection] = useState("Overview");


  // section button code , ,which section to display , Overview/review 
  const section = (Event) => {
    const sections_bttns = document.querySelectorAll(".type_btn");

    // remove active state from all the two tabs
    for (const btn of sections_bttns) {
      console.log(btn)
      btn.classList.remove("active");
    }

    // adding active class to the clicked buttoon
    const clickedsection = Event.target;
    clickedsection.classList.add("active");
    setactivesection(clickedsection.textContent);
  };

  const getactivesection = () => {
    if (activesection === "Overview") {
      return <Overview  foodprice = {props.foodprice}  fooddesc={props.food_description} foodnaam={props.foodname} foodtype={props.foodtype}/>;
    }

    if (activesection === "Reviews") {
      return <Review />;
    }
  };
  return (
    <div>
      <div className="types_below_navbar">
        <button onClick={section} className="type_btn type_btn active">Overview</button>
        <button onClick={section} className="type_btn type_btn">Reviews</button>
      </div>

      {/* displaying the active section =>  overview/reviews  */}
      {getactivesection()}
    </div>
  );
};

export default Product_Page_Overview_Section;
