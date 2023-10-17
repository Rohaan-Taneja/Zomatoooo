import React, { useState, useEffect } from "react";
import Card_template from "../Card_template";

const Similar_Restaurants_slider = (props) => {

  // ... is used = we are making a copy of the props.slides array and then storing it in the temp_arr.
  const temp_arr = [...props.slides];
  console.log(temp_arr)
  
  const [currentIndex, setCurrentIndex] = useState(0);

  const slider = (food_item, index) => {
    // console.log(food_item, index);

    return (
      <Card_template
        key={food_item._id}
        i0={food_item._id}
        i1={food_item.naam}
        i2={food_item.f_img}
        i3={food_item.rating}
        i4={food_item.price}
      />
    );
  };

  useEffect(() => {
    if (temp_arr.length > 5) { // Check if there are more than one slide
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % temp_arr.length);
      }, 3000); // Change slide every 3 seconds

      return () => clearInterval(interval);
    }
  }, [temp_arr]); // Include temp_arr as a dependency

  return (
    <div className="slider-container">

      <div className="slider" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {temp_arr.map(slider)}
      </div>
    </div>
  );
};

export default Similar_Restaurants_slider;
