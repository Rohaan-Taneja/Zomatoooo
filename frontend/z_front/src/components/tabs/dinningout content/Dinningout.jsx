import React from "react";
import Card_template from "../../Card_template";
import { useEffect } from "react";
import { useState } from "react";

const Dinningout = () => {
  const fun = (food_item) => {
    // console.log(food_item , "thiss")
    return (
      <Card_template
        i0={food_item._id}
        i1={food_item.naam}
        i2={food_item.f_img}
        i3={food_item.rating}
        i4={food_item.price }
      />
    );
  };

  const backendURL = "https://zomatoo-backend-iht3.onrender.com";

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
        <h1 className="homepage_grid_content_heading">Trending dining restaurants in Delhi NCR</h1>
      </div>
      

      <div className="delivery_content_grid">
        {fetchedData.reverse().map(fun)}
      </div>
    </div>
  );
};

export default Dinningout;
