import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Productpage from "./Product_page_componenets/Productpage";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

  const navigate = useNavigate();

  const [check_user_details, setcheck_user_details] = useState([]);

  // usestate to store the searched item 
  const [searched_item , setsearched_item] =useState("");

 var searched_item_id=null;

  //function = if logout is pressed , check_login_logout will se to false , to update navbar
  const updatelogin = () => {
    const updated_status = [ false , null];

    setcheck_user_details(updated_status);
  };

  const backendURL = "http://localhost:999";

  useEffect(() => {
    // Fetch the login/logout status , to update the navbar
    fetch(`${backendURL}/user/loginlogoutstatus`)
      .then((response) => response.json()) // Convert the response to JSON
      .then((data) => setcheck_user_details(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  
  // function to set the searched item 
  const setting_searched_item=(e)=>{
    console.log(e.target.value)
    setsearched_item(e.target.value)
  }

  //function to search for sercheditem in backend
  const searching_item = async (e) => {
    e.preventDefault();
    console.log(searched_item);
    console.log("call to hua hai");
  
    try {
      const response = await fetch(`${backendURL}/restaurant/${searched_item}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      searched_item_id = data;
      
      console.log(searched_item, searched_item_id);
      
      //changing the url to the searched product , productpage url
      if (searched_item_id !== null) {
        navigate(`/Productpage/${searched_item_id}`);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  return (
    
    <div className="col d-flex justify-content-center outercontainer_of_navbar">
      <nav className=" custom navbar navbar-expand-lg bg-white">
        <div className="container-fluid">
          <a className="navbar-brand zomatoo" href="/">
            ZOMATOO
          </a>


          <form className="d-flex search_bar" role="search" onSubmit={searching_item}>
            <input
            onChange={setting_searched_item}
              className="form-control me-2"
              id="restaurant"
              name="restaurant"
              type="search"
              placeholder=" &#128269;  Search for restaurant, listed in this Zomatoo"
              aria-label="Search"
              
            />
          </form>


          {/* div for register/login or name/cart/logout  */}
          <div>
            
            {/* //if status is false or not logged in */}
            {!check_user_details[0] && (
              <ul className="navbar_reg_login_list">
                <li className="nav-item">
                  <a
                    className="mr-2"
                    aria-current="page"
                    href="http://localhost:999/user/register"
                    role="button"
                  >
                    Register
                  </a>
                </li>
                <li className="nav-item ">
                  <a
                    className=" ml-3"
                    href="http://localhost:999/user/login"
                    role="button"
                  >
                    login
                  </a>
                </li>
              </ul>
            )}

           

            {/* if status is  logged it  check_userdetails[0]= true/false and check_userdetails[1] = user name  */}
            {check_user_details[0] && (

              <div>
                
                {/* if user is logged in then this will display */}
                <div class="dropdown-container">

                  {/* this is the user name , which will display on upfront  */}
                  <button class="username_navbar"> <img className="userimage_navbar" src={"/images/user.jpg"} alt="user hai" />{check_user_details[1]} <div className="dropdownicon"> ^</div></button>

                  {/* div containing dropdown menu , which will appear on hover */}
                  <div class="dropdown-content">

                    {/* cart link , 1st option  */}
                    <div>
                      <Link to={"/cart"} >my cart</Link>
                    </div>


                    {/* logout link , secont option  */}
                    <div>
                      <a onClick={updatelogin} href="http://localhost:999/user/logout">logout</a>
                    </div>
                  </div>
                </div>             
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
