import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Card_template from "../../Card_template";

const Delivery = () => {
  const fun = (food_item) => {
    return (
      <Card_template
        i0={food_item._id}
        
        i1={food_item.naam}
        i2={food_item.f_img}
        i3={food_item.rating}
        i4={food_item.price}
      />
    );
  };

  const backendURL = "http://localhost:999";
  const [fetchedData, setFetchedData] = useState([]);

  useEffect(() => {
    // Fetch data from your API endpoint
    fetch(`${backendURL}/api/data`)
      .then((response) => response.json()) // Convert the response to JSON
      .then((data) => setFetchedData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

 
  return (
    <div>
      <div className="heading_div"> 
      <h1 className="homepage_grid_content_heading">Best Delivery Restaurants in Delhi NCR</h1>
      </div>
      
      <div className="delivery_content_grid">
        {fetchedData.map(fun)}
        {fetchedData.map(fun)}
        
      </div>
    </div>
  );
};

export default Delivery;
