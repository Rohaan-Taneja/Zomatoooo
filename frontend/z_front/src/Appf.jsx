import React from 'react'
import { Routes ,Route, Link } from 'react-router-dom';
import Header from './components/Header'
import Filters_Result_Page from './filters/Filters_Result_Page';
import Productpage from './components/Product_page_componenets/Productpage';
import Cart from './components/cart/Cart.jsx';




const Appf = () => {
  return (
    <>

      <Routes>
        <Route path='/' element={<Header/>} />
        <Route  path='/Productpage/:productid' element={<Productpage/>}/>
        <Route path='/filter/:filter_query' element={<Filters_Result_Page />}/>
        <Route path='/Cart' element={<Cart/>}/>
      </Routes>

    
    </>
        
      
    
  )
}

export default Appf
