import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Card_template from "../components/Card_template";
import Navbar from "../components/Navbar";
import Filter from "./Filter";
import Footer from "../components/Footer";

const Filters_Result_Page = () => {
  const { filter_query } = useParams();
  console.log("selected rating is = ", filter_query);

  var [FetchedData, setFetchedData] = useState([]);

  const fun = (food_item) => {
    // console.log(food_item , "thiss")
    return (
      <Card_template
        i={food_item._id}
      />
    );
  };

  const backendURL = "https://zomatoo-backend-iht3.onrender.com";

  useEffect(() => {
    fetch(`${backendURL}/filter/${filter_query}`)
      .then((response) => response.json()) // Convert the response to JSON
      .then((data) => setFetchedData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, [filter_query]);

  return (
    <div >
      <Navbar />

      <div className="filters_row">
        <Filter />

        {/* rating tag */}
        {(filter_query === "2" ||
          filter_query === "3" ||
          filter_query === "4") && (<div className="rating_button"> rating {filter_query}.0+</div>
          
        )}

        {/* price tag  */}
        {(filter_query === "high_to_low" || filter_query === "low_to_high") && (
          <div className="rating_button"> price {filter_query} </div>
        )}
      </div>
      <hr className="horizontal_line_of_filter_result_page"/>

      <div className="filtered_content_grid">{FetchedData.map(fun)}</div>
      
      <Footer />
    </div>
  );
};

export default Filters_Result_Page;
