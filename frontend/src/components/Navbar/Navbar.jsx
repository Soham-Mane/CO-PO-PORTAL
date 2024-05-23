import React from 'react'
import logo from "../../images/download.jpg";
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import "./Navbar.css";
import Names from '../Names/Names';
const Navbar = () => {
  return (
    <>
      <div className="main1">
  <img src={logo} className='logo'  alt="" />
  <div className='buttons'>
  {/* <Button variant="contained"></Button> */}
  <Link to="/signup">
  <Button variant="outlined" style={{ color: 'black', fontSize: '1.2rem' }}>Faculty</Button>

  </Link>
  </div>

</div>
<Names/>
    </>
      
  
  )
}

export default Navbar