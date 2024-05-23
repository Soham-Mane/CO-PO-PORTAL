import React from 'react'
import logo from "../../images/download.jpg";
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import "./NavbarLogout.css";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const NavbarLogout = () => {


  const [open, setOpen] = React.useState(false);
  const Alert = React.forwardRef(function Alert(props, ref) {
      return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

  const handleClick = () => {
    setOpen(true);
  };     
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
   

      return;
    }

    setOpen(false);
  };

  return (
    
        <div className="main">
  <img src={logo} className='logo'  alt="" />
  <div className='buttons'>
  {/* <Button variant="contained"></Button> */}
  <Link to="/">
  <Button type='submit' onClick={handleClick} variant="outlined" style={{ color: 'white', fontSize: '1.2rem' }}>Logout</Button>
  <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
  <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
    Logged Out Successfully!!
  </Alert>
</Snackbar>
  </Link>

  </div>

</div>
  
  )
}

export default NavbarLogout