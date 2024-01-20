import React from "react";
import Card_template from "../../Card_template";
import { useEffect } from "react";
import { useState } from "react";

const Dinningout = () => {
  // getting food id one by one and sending it to the template
  const fun = (food_item) => {
    return <Card_template i={food_item} />;
  };

  const backendURL = "https://zomatoo-backend-iht3.onrender.com";
  // const backendURL = "http://localhost:999";
  const [fetchedData2, setFetchedData2] = useState([null]);

  useEffect(() => {
    // Fetch data from your API endpoint
    fetch(`${backendURL}/api/data`)
      .then((response) => response.json()) // Convert the response to JSON
      .then((data) => setFetchedData2(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div>
      <div className="heading_div">
        <h1 className="homepage_grid_content_heading">
          Trending dining restaurants in Delhi NCR
        </h1>
      </div>

      {fetchedData2 ? (
        <div className="delivery_content_grid">
          {fetchedData2.map(fun)}
          {fetchedData2.map(fun)}
        </div>
      ) : (
        <div> loading ..... please wait </div>
      )}

      {console.log(fetchedData2)}
    </div>
  );
};

export default Dinningout;
