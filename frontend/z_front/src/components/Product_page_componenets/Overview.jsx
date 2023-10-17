import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import Similar_Restaurants_slider from './Similar_Restaurants_slider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Overview = (props) => {

    // storing the similar restaurants
    const [similar_restaurant , setsimilar_restaurant] = useState( null)

    const backendURL = "http://localhost:999";

    useEffect(() => {
        // Fetch data from your API endpoint
        fetch(`${backendURL}/api/similar_restaurant/${props.foodtype}`)
          .then((response) => response.json()) // Convert the response to JSON
          .then((data) => setsimilar_restaurant(data))
          .catch((error) => console.error("Error fetching data:", error));
      }, []);
  return (
    <div className='overview_section'>
        <div className='subsections_individual_div'>
        <div className='overview_heading'>About  <b>{props.foodnaam}</b> </div>
        <div className='overview_content'>{props.fooddesc}</div>

        </div>
        
        <div className='subsections_individual_div'> 
            <div className='overview_heading'>People Say This Place Is Known For</div>
            <div className='overview_content'>Seating Area, Weekend Brunch, Student Crowd, Good Wifi, Tamper Proof Packaging, Interior</div>
        </div>

        <div className='subsections_individual_div'>
            <div className='overview_heading'>Average Cost</div>
            <div className='overview_content'><b> ₹{props.foodprice * 2} </b> for two people (approx.)</div>
            <div className='overview_content' >Exclusive of applicable taxes and charges, if any</div>
        </div>

        <div className='subsections_individual_div'>
            <div className='overview_heading'>Cash and Cards accepted</div>
            <div className='overview_heading'>Digital payments accepted</div>
        </div>

        {console.log(similar_restaurant)}
        <div className='overview_heading'>
        Similar restaurants to  <b>{props.foodnaam}</b>
        </div>
        {similar_restaurant ?(
            <div className='slider_flex'>
                <Similar_Restaurants_slider slides={similar_restaurant} />

            </div>
        ):(
            <div>....loading</div>
        )}
        

        <div className='subsections_individual_div'>
            <div className='overview_heading'>More Info</div>
            <div className='overview_zomatoo_grid'>
                <div  className='overview_content'> &#128690; Home Delivery</div>
                <div className='overview_content'>  <i class="fa-solid fa-utensils"></i> Indoor Seating</div>
                <div className='overview_content'> <i class="fa-solid fa-people-arrows"></i> Takeaway Available</div>
                <div className='overview_content'> <i class="fa-solid fa-wifi"></i> Wifi</div>
            </div>
            
        </div> 
      
    </div>
  )
}

export default Overview
