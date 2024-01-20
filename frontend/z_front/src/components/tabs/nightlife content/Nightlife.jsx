import React from "react";
import { useEffect } from "react";
import Card_template from "../../Card_template";
import { useState } from "react";

const Nightlife = () => {
  // getting food id one by one and sending it to the template
  const fun = (food_item) => {
    return <Card_template i={food_item} />;
  };

  const backendURL = "https://zomatoo-backend-iht3.onrender.com";
  // const backendURL = "http://localhost:999";
  const [fetcheddata3, setfetcheddata3] = useState([null]);

  useEffect(() => {
    // Fetch data from your API endpoint
    fetch(`${backendURL}/api/data`)
      .then((response) => response.json()) // Convert the response to JSON
      .then((data) => setfetcheddata3(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div>
      <div className="heading_div">
        <h1 className="homepage_grid_content_heading">
          Nightlife Restaurants in Delhi NCR
        </h1>
      </div>


      {fetcheddata3 ? (<div className="delivery_content_grid">
        {fetcheddata3.map(fun)}
        {fetcheddata3.reverse().map(fun)}
      </div>):(<div classsname> please wait....</div>)}

      
    </div>
  );
};

export default Nightlife;
