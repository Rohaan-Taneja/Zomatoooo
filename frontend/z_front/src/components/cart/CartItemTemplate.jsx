import React from "react";
import { Link } from "react-router-dom";

const CartItemTemplate = (props) => {
  return (
    <div className="cart_template_outer">
      <Link
        className="link_to_the_productpage"
        to={`/Productpage/${props.i_id}`}
      >
        <div className="cart_item">
          <div>
            {/* whenevr you want to give the address of the image , and that is
            stored in the public folder , give the address in this format , dont
            specify the public folder name */}
            <img
              className="cart_food_image"
              src={`/images/${props.i_img}`}
              alt="food hai "
            />
          </div>
          <div className="name_price_div">
            <div className="cart_item_name">{props.i_name}</div>
            
            <div className="price_quantity_div">
              <div className="cart_item_price">
                <div>{props.i_price} </div>Rs</div>
              <div className="cart_item_quantity">
                <div>quantity:</div>{props.i_quan}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CartItemTemplate;
