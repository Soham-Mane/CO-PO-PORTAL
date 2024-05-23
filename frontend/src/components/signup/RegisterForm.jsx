import React, {useState} from 'react';
import { TextField, Button, Container, Stack, Box, Typography } from '@mui/material';
import { Link } from "react-router-dom"
 import './RegisterForm.css';
 import Alert from '@mui/material/Alert';
 import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import teacher from "../../images/teacher.png"
const RegisterForm = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState('')
    const [password, setPassword] = useState('')
    const [subject,setSubject]=useState('');
    const [open, setOpen] = React.useState(false);
    const [checked,setChecked]=useState([]);




    function handleSubmit(event) {
      console.log(checked);
      event.preventDefault();
      const form = document.getElementById('formdata');
      const formData = new FormData(form);
  
      var requestOptions = {
        method: 'POST',
        body: formData, // Pass the formData object, not a string
        redirect: 'follow'
      };
    
      fetch("http://127.0.0.1:8000/signup/", requestOptions)
        .then(response => 
          {
            if (response.status === 200) {
              window.location.href = "/login"; // Redirect to the login page
            }
            return response.json();
          }
          
          )
        .then(result => {
          console.log(result);
          console.log(firstName,lastName)

        })
      
        .catch(error => console.log('error', error));
    }

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
        <React.Fragment>
    
      

<Box sx={{ 
      padding: 7, 
      backgroundColor: '#f0f4f8', 
      borderRadius: '10px', 
      maxWidth: '500px', 
      margin: '0 auto', 
      textAlign: 'center', 
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}>
        <div className='flex justify-center items-center'>
        <img src={teacher} alt="placeholder" style={{ borderRadius: '50%', marginBottom: '20px', width: '100px', height: '100px' }} />

        </div>
      <h2 style={{ marginBottom: '20px', fontSize: '2.5rem', fontWeight: 'bold' }}>Register Form</h2>

      <form onSubmit={handleSubmit} id="formdata">
        <TextField
          type="text"
          variant='outlined'
          color='secondary'
          label="First Name"
          name="first_name"
          onChange={e => setFirstName(e.target.value)}
          value={firstName}
          fullWidth
          required
          style={{ marginBottom: '10px' }}
        />
        <TextField
          type="text"
          variant='outlined'
          color='secondary'
          label="Last Name"
          name="last_name"
          onChange={e => setLastName(e.target.value)}
          value={lastName}
          fullWidth
          required
          style={{ marginBottom: '10px' }}
        />
        <TextField
          type="email"
          variant='outlined'
          color='secondary'
          label="Email"
          name="email"
          onChange={e => setEmail(e.target.value)}
          value={email}
          fullWidth
          required
          style={{ marginBottom: '10px' }}
        />
        <TextField
          type="password"
          variant='outlined'
          color='secondary'
          label="Password"
          name="password"
          onChange={e => setPassword(e.target.value)}
          value={password}
          required
          fullWidth
          style={{ marginBottom: '10px' }}
        />
        <TextField
          type="date"
          variant='outlined'
          color='secondary'
          // label="Date of Joining"
          onChange={e => setDateOfBirth(e.target.value)}
          value={dateOfBirth}
          fullWidth
          required
          style={{ marginBottom: '20px' }}
        />
        <Button variant="contained" color="secondary" type="submit" onClick={handleClick} style={{ marginBottom: '20px' }}>Register</Button>
       
      </form>
      <Typography>Already have an account? 
        <Typography
          variant="body1" display="inline"
          style={{ cursor: 'pointer', textDecoration: 'underline', marginLeft: '3px' }}
          color="secondary"
        >
          <Link to="/login"> Login Here</Link>
        </Typography>
      </Typography>
    </Box>


        </React.Fragment>
     
    )

}
export default RegisterForm;

