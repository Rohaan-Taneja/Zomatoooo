import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Card_template from "../../Card_template";

const Delivery = () => {
  // getting food id one by one and sending it to the template
  const fun = (food_item) => {
    return <Card_template i={food_item} />;
  };

  const backendURL = "https://zomatoo-backend-iht3.onrender.com";
  // const backendURL = "http://localhost:999";
  const [fetchedData, setFetchedData] = useState([null]);

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
        <h1 className="homepage_grid_content_heading">
          Best Delivery Restaurants in Delhi NCR
        </h1>
      </div>

      {fetchedData ? (
        <div className="delivery_content_grid">
          {() => {
            for (let i = fetchedData.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [fetchedData[i], fetchedData[j]] = [fetchedData[j],fetchedData[i],];}
              {console.log(fetchedData)}
          }}

          {fetchedData.map(fun)}
          {fetchedData.reverse().map(fun)}
        </div>
      ) : (
        <div> please wait loading ........</div>
      )}
    </div>
  );
};

export default Delivery;
