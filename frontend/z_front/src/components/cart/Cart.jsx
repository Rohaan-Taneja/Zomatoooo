import React, { useState } from "react";
import { useEffect } from "react";
import CartItemTemplate from "./CartItemTemplate";
import Navbar from "../Navbar";
import { Link } from "react-router-dom";
import Footer from "../Footer";

const Cart = () => {
  const [cart_data, setcart_data] = useState([]);

  const backendURL = "https://zomatoo-backend-iht3.onrender.com" ;

  
  useEffect(() => {
    // Fetch  cart data from  API endpoint
    fetch(`${backendURL}/user/cart_data`)
      .then((response) => response.json())
      .then((data) => setcart_data(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);


  


  // function for the payment , data in the cart is send to backend and url to proceed further will come 
  const checkout=()=>{
    fetch(`${backendURL}/user/checkout`,{
      method: "POST",
      headers :{
        "content-type": "application/json",
      },
      body: JSON.stringify({cart_data})
    })
    .then((res) =>{
      if(res.ok) return res.json()
      return res.json().then(json=>Promise.reject(json))

    })
    .then(({url})=>{
      console.log("this is the url", url)
      window.location=url
    })
    .catch(e =>{
      console.log(e.error)
    })
  }

  //code to calculate the total number of items and total amount of the cart
  var number_of_items_incart = 0;
  var total_amount_of_cart = 0;

  for (const item of cart_data) {
    var ip = Number(cart_data[number_of_items_incart].product_price);
    number_of_items_incart = number_of_items_incart + 1;
    total_amount_of_cart = Number(Number(ip) + Number(total_amount_of_cart));

    // console.log(
    //   item,
    //   "i am the cart item ",
    //   number_of_items_incart,
    //   "price=",
    //   total_amount_of_cart
    // );
  }

  const cart_item_func = (cart_item) => {
    // console.log("i am the cart item", cart_item);
    return (
      <CartItemTemplate
        i_id={cart_item.product_id}
        i_img={cart_item.product_img}
        i_price={cart_item.product_price}
        i_name={cart_item.product_name}
        i_quan={cart_item.product_quantity}
      />
    );
  };

  return (
    <div>
      {/* {console.log("i am in the cart and the card dat is " , cart_data)} */}
      <div className="cart_outer_grid">
        <div className="cart">
          <div className="cart_heading_row">
            <div className="cart_heading">Food Cart</div>
            <div className="no_of_items">{number_of_items_incart} items</div>
          </div>

          <hr className="horizontal_line" />
          {cart_data.map(cart_item_func)}
        </div>
        <div className="cart_total_amaount_section">
          <div className="summary">Summary</div>

          <hr className="cart_total_div_hr" />

          <div className="total_items_div">
            <div className="total_itmes_label">Total Items </div>
            <div className="total_items_value">{number_of_items_incart}</div>
          </div>

          <div className="total_amount_div">
            <div className="total_amount_label">Total Amount</div>
            <div className="total_amount_value">{total_amount_of_cart} Rs</div>
          </div>
          <div className="delivery_charges_div">
            <div className="delivery_charges_label">delivery charges</div>
            <div className="delivery_charges_value">30 Rs</div>
          </div>

          <div className="grand_total_div">
            <div className="grand_total_label">Grand Total</div>
            <div className="grand_total_value">
              <hr />
              {total_amount_of_cart + 30} Rs
            </div>
          </div>
          
          {/* pay button  */}
          <div className="pay_bttn_div"> 
          <button onClick={checkout} className="order">order krro</button>
          </div>
          
        </div>
        
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
