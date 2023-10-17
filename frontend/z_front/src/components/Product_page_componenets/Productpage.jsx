
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar";
import Product_Page_Overview_Section from "./Product_Page_Overview_Section";
import Product_Page_Photo_Section from "./Product_Page_Photo_Section";
import Footer from "../Footer";



const Productpage = () => {
  // got the productid here from the url . using useparams
  const { productid } = useParams();

  const [product, setproduct] = useState(null);

  // user login or logout details
  const [check_user_details, setcheck_user_details] = useState([false,null]);
  console.log("status " , check_user_details)


  const backendURL = "https://zomatoo-backend-iht3.onrender.com";

  // getting the product details
  useEffect(() => {
    fetch(`${backendURL}/api/productdetails/${productid}`)
      .then((response) => response.json())
      .then((data) => setproduct(data))
      .catch((error) => console.error("error in fetching data:", error));

  }, [productid]);

  useEffect(() => {
    // Fetch the login/logout status , to update the navbar
    fetch(`${backendURL}/user/loginlogoutstatus`)
      .then((response) => response.json()) // Convert the response to JSON
      .then((data) => setcheck_user_details(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  //when add to cart button is clicked , productid is sent to the backend , and it will be added to the cart
  const add_to_cart = () => {
    fetch(`${backendURL}/user/addtocart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        p_details: product[0]._id,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // You can handle a successful response here if needed
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        // You can handle the error here, such as showing an error message to the user
      });
  };

  return (
    //product usestate , contain all the data of that product , done on date ""19th""" aug , 26th aug se pehle khtmm krna hai
    // today = on 5th sept , i am designing the page
    <div>
      <Navbar />

      <div>
        {/* if product data is rendered and stored in the useeffect variable , then this this statement will run , */}
        {product ? (
          <div>
            {/* {console.log(product[0])} */}

            {/* product image secion  */}
            <Product_Page_Photo_Section
              foodimage={product[0].f_img}
              foodname={product[0].naam}
              foodrating={product[0].rating} />
              
            <div className="food_price_div">
              <div className="deal_of_the_day">deal of the day!!</div>

              {/* price label and add to cart row  */}
              <div className="price_and_pricelabe_div">
                <div className="food_price_label">Price :</div>
                <div className="food_price">{product[0].price} Rs</div>

                {/* displaying ad to cart button if login , else none  */}
                {check_user_details[0]?(
                  <div><button onClick={add_to_cart} className="add_to_cart_bttn">add to Cart</button></div>
                ):(
                  <p></p>
                )}
                
              </div>
            </div>
              
              {/* conplete overview section , containing about(overview) and review  */}
            <Product_Page_Overview_Section food_description={product[0].desc } foodprice={product[0].price} foodname={product[0].naam} foodtype={product[0].foodtype} />
          </div>
        ) : (
          <div>....loading</div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Productpage;
