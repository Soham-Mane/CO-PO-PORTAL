import React, {useState} from "react";
import { TextField, FormControl, Button, Box,Typography } from "@mui/material";
import { Link } from "react-router-dom"
import Carousel from "react-multi-carousel";
import Carousel1 from "../Carousel/Carousel";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Alert from "../alert";
import TeacherForm from "../TeacherForm";
const Login = () => {
    const [email, setEmail] = useState("")
    const [result, setResult] = useState(null);
    const [password, setPassword] = useState("")
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [loggedIn, setLoggedIn] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [open, setOpen] = React.useState(false);
    const Alert = React.forwardRef(function Alert(props, ref) {
      return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    // const submitLoginHandler = (event) => {
    //     event.preventDefault();
    //     console.log('Logging in:',email,password);

    //     const form=document.getElementById('formlogin');
    //     const formData=new FormData(form);
        
    //     var requestOptions = {
    //       method: 'POST',
    //       body: formData,
    //       redirect: 'follow'
    //     };

    //     fetch("http://127.0.0.1:8000/login/",requestOptions)
    //     .then(response=>response.json())
    //       .then(result=>{
    //         console.log(result);

    //         if (result.success) {
    //           console.log("User success");
          
    //         } else if (result.message) {
    //           alert("Login not successful. Username or password is incorrect.");
    //           console.log("User fail");
    //         } else {
    //           alert("Failed to login. Please try again.");
    //         }
    //       })
    //       .catch(error=>console.log('error',error));
    //     // setEmailError(false)
    //     // setPasswordError(false)
 
    //     // if (email == '') {
    //     //     setEmailError(true)
    //     // }
    //     // if (password == '') {
    //     //     setPasswordError(true)
    //     // }
 
    //     // if (email && password) {
    //     //     console.log(email, password)
    //     // }
    // }
     
    const handleSubmit = async (event) => {
      event.preventDefault();
      // Validate email and password
      setEmailError(email === '');
      setPasswordError(password === '');
    
      if (email && password) {
        const form = document.getElementById('formdata');
        const formData = new FormData(form);
    
        var requestOptions = {
          method: 'POST',
          body: formData,
          redirect: 'follow',
        };
    
        try {
          const response = await fetch("http://127.0.0.1:8000/login/", requestOptions);
          const result = await response.json();
          setResult(result);
          console.log(result);   
          // Optionally, you can handle the response here, such as redirecting after a successful login.
          if (response.status===200) {
            // Redirect or perform other actions
            // alert("Successfully loggedin");
            console.log('Successfully logged in with: ',email,password);
            setLoggedIn(true);
            setShowAlert(true);
          }
          else{
         alert("Invalid Password")
         setShowAlert(false);
          }
        } catch (error) {
          console.log('Error:', error);
          // Handle the error, e.g., show an error message to the user.
        }
      }
    };
    
    const handleClick = () => {
     <Alert/>
    };     
    // const handleClose = (event, reason) => {
    //   if (reason === 'clickaway') {
    //     return;
    //   }
  
    //   setOpen(false);
    // };
    // const handleSubmit = async (event) => {
    //   event.preventDefault();
    
    //   // Validate email and password
    //   setEmailError(email === '');
    //   setPasswordError(password === '');
    
    //   if (email && password) {
    //     const form = document.getElementById('formdata');
    //     const formData = new FormData(form);
    
    //     var requestOptions = {
    //       method: 'POST',
    //       body: formData,
    //       redirect: 'follow',
    //     };
    
    //     try {
    //       const response = await fetch("http://127.0.0.1:8000/login/", requestOptions);
    // console.log("not success");
    //       if (response.status === 200) {
    //         // Show an alert when the status code is 200
    //         alert("Successfully logged in");
    //         console.log("success");
    //         // You can also consider redirecting the user to another page here.
    //       } else {
    //         // Handle other status codes as needed
    //         alert("Login failed. Please check your credentials.");
    //       }
    //     } catch (error) {
    //       console.log('Error:', error);
    //       // Handle the error, e.g., show an error message to the user.
    //     }
    //   }
    // };


    return ( 

      <React.Fragment>
        {!loggedIn ? (
          <Box className="p-8  rounded-lg shadow-lg max-w-md mx-auto flex flex-col justify-center items-center ">
            
            <form autoComplete="off" onSubmit={handleSubmit} id="formdata" className="w-full">
              <h2 className="text-2xl font-bold mb-6">Login Form</h2>
              <TextField 
                label="Email"
                onChange={e => setEmail(e.target.value)}
                required
                variant="outlined"
                color="secondary"
                type="email"
                name="email"
                fullWidth
                value={email}
                error={emailError}
                className="mb-4"
              />
              <TextField 
                label="Password"
                onChange={e => setPassword(e.target.value)}
                required
                variant="outlined"
                color="secondary"
                name="password"
                type="password"
                value={password}
                error={passwordError}
                fullWidth
                className="mb-4"
              />
              <Button onClick={handleClick} variant="contained" color="secondary" type="submit" className="w-full mb-4">Login</Button>
            </form>
            
            <Typography variant="body1" display="inline" className="mr-2">
              Need an account?
            </Typography>
            <Typography
              variant="body1"
              className="cursor-pointer text-blue-500 underline"
            >
              <Link to="/signup">Register Here</Link>
            </Typography>
          </Box>
 
        ) : (
          <TeacherForm result={result} />
        )}
      </React.Fragment>

    
     );
}
 
export default Login;


