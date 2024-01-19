import React from 'react'
import Navbar from './Navbar'
import Delivery from "./tabs/delivery content/Delivery"
import Nightlife from './tabs/nightlife content/Nightlife'
import Dinningout from './tabs/dinningout content/Dinningout'
import Taboptions from './Taboptions'
import { useState } from 'react'
import Filter from '../filters/Filter'
import Footer from './Footer'


const Header = () => {
  
  const [activetab,setactivetab]=useState("Delivery")

  const getactivetab=()=>{
    if(activetab==="Delivery"){
      return <Delivery />
    }

    if(activetab==="Dine Out"){
      return <Dinningout/>
    }

    if(activetab==="Nightlife"){
      return <Nightlife />
    }
  }
  return (
 
    <div>
      <Navbar />

      {/* finding out , which tab is active or selected */}
      <Taboptions acttab={activetab} setacttab={setactivetab} />
      <Filter />

      {/* after finding , we are displaying that active tab content */}
      {getactivetab()}

      <Footer />
      

     
    </div>
  )
}

export default Header
