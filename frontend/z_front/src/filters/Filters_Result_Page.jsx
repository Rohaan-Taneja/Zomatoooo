import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Filter from "./Filter";
import Footer from "../components/Footer";
import Similar_Restaurant_Card from "../components/Product_page_componenets/Similar_Restaurant_Card";

const Filters_Result_Page = () => {
  const { filter_query } = useParams();
  // console.log("selected rating is = ", filter_query);

  var [FilteredData, setFilteredData] = useState([]);

  const fun = (food_item) => {
    if(food_item){
      console.log("hello ji , this is the rating," , food_item.price)
      return  <Similar_Restaurant_Card
      key={food_item._id}
      i0={food_item._id}
      i1={food_item.naam}
      i2={food_item.f_img}
      i3={food_item.rating}
      i4={food_item.price}
    />

    }
    
  };

  const backendURL = "https://zomatoo-backend-iht3.onrender.com";

  // sending the filtered query to the backend and getting the result
  useEffect(() => {
    fetch(`${backendURL}/filter/${filter_query}`)
      .then((response) => response.json()) // Convert the response to JSON
      .then((data) => setFilteredData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, [filter_query]);

  return (
    <div>
      <Navbar />

      <div className="filters_row">
        <Filter />

        {/* rating tag */}
        {(filter_query === "2" ||
          filter_query === "3" ||
          filter_query === "4") && (
          <div className="rating_button"> rating {filter_query}.0+</div>
        )}

        {/* price tag  */}
        {(filter_query === "high_to_low" || filter_query === "low_to_high") && (
          <div className="rating_button"> price {filter_query} </div>
        )}
      </div>
      <hr className="horizontal_line_of_filter_result_page" />

      <div className="filtered_content_grid">{FilteredData.map(fun)}</div>
      {console.log(FilteredData)}

      <Footer />
    </div>
  );
};

export default Filters_Result_Page;
