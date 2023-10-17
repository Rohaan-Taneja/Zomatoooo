import React from "react";
import { useState } from "react";

const Taboptions = (props) => {
  //   function to update the selected tab
  function checkfortab(Event) {
    const tab_bttns = document.querySelectorAll(".type_btn");

    // remove active state from all the three tabs
    for (const btn of tab_bttns) {
      btn.classList.remove("active");
    }

    // adding active class to the clicked buttoon
    const clickedbttn = Event.target;
    clickedbttn.classList.add("active");
    props.setacttab(clickedbttn.textContent);
  }

  return (
    <div>
      <div className="types_below_navbar">

        <button onClick={checkfortab} className="type_btn type_btn active">
          
            {/* <img className="taboptions_img" src="/images/delivery.png" alt="Delivery" /> */}
            Delivery
    
        </button>
        <button onClick={checkfortab} className="type_btn type_btn">
          {/* <img className="taboptions_img" src="/images/dineout.png" alt="" /> */}
          Dine Out
        </button>
        <button onClick={checkfortab} className="type_btn type_btn">
          {/* <img className="taboptions_img" src="/images/nightlife.png" alt="" /> */}
          Nightlife
        </button>
        {/* {console.log(props.acttab)} */}
      </div>
    </div>
  );
};

export default Taboptions;
