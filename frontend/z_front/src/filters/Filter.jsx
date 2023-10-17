import React, { useState } from "react";
import Ratings_Filter from "./Ratings_Filter";
import Price_Filter from "./Price_Filter";

const Filter = () => {
  const [rightMenu, setRightMenu] = useState("Ratings");

  function handleRightMenuClick(Event) {
    const rating_and_price_bttns = document.querySelectorAll(".rate_and_price_bttn");


    // removing selected class from all the button
    for (const btn of rating_and_price_bttns) {
      btn.classList.remove("selected_filter");
    }

    // adding selected class to the selected button
    const clicked_bttn = Event.target;
    clicked_bttn.classList.add("selected_filter");

    //setting the value of the selected button , so that right menu can open
    setRightMenu(Event.target.textContent);
  }

  // function to remove the backdrop of the modal 
  const removebackdrop =()=>{
    const modal_div_class=document.querySelector(".show")
    modal_div_class.remove();
  }

  return (
    <div>

      {/* filter button row  */}
      <div className="outer_filters_row">

        {/* filter buuton  */}
      <button type="button" onClick={removebackdrop} class="filter_button" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Filters
      </button>

      </div>
        
            
      {/* <!-- Modal div --> */}
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        
      >
        <div class="modal-dialog modal-dialog-centered modal-xl">

          {/* div containing heading div and content div */}
          <div class="modal-content">

            {/* filter page heading div, containing heading and cross bttn  */}
            <div class="modal-header">

              {/* heading */}
              <div class="filter_page_title" id="exampleModalLabel">
                Filters
              </div>

              {/* cross button  */}
              <button type="button"class="btn-close" data-bs-dismiss="modal"aria-label="Close"></button>

            </div>

            {/* div containing all the content of the filter buttons and type  */}
            <div class="custom_modal_height">

              {/* filter page completemenu  */}
              <div className="menu_outer">

                {/* div containing the the two buttons of filter  */}
                <div className="menu_left_part">

                  <button className="rate_and_price_bttn selected_filter" onClick={handleRightMenuClick}>Ratings</button>

                  <button className="rate_and_price_bttn" onClick={handleRightMenuClick}>price</button>
                </div>

                {/* which buuton is clicked on basis if that , this right menu is selected  */}
                <div className="menu_right_part">

                  {/* Use conditional rendering to display the selected content */}
                  {rightMenu === "Ratings" && <Ratings_Filter />}
                  {rightMenu === "price" && <Price_Filter />}
                </div>
  
              </div>
            
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
