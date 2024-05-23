import React, {useState,useEffect} from 'react'
import {Link} from "react-router-dom";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import "./Carousel.css";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import assignments from "../../images/assignment.jpg";
import semExams from "../../images/semExams.jpg";
import ut from "../../images/ut.png";
import attendance from '../../images/attendance.jpeg';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import SendIcon from '@mui/icons-material/Send';
import NavbarLogout from "../NavbarLogout/NavbarLogout";
import quizess from "../../images/quiz.png";
import feedback from "../../images/feedback.png";
import practical from "../../images/Practical.jpg";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import DropdownExample from '../PO/MyForm1';
import Co from "../Ut/Co";
import Login from '../Login/Login';
import PracticalExam from "../PracticalExam";
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Carousel1 = () => {
  console.log("Hello")
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
const [selectedFile, setSelectedFile] = useState(null);
const [selectedFileUt,setSelectedFileUt]=useState(null);
const [selectedFileSem,setSelectedFileSem]=useState(null);
const [selectedFileAtt,setSelectedFileAtt]=useState(null);
const [selectedFileQuiz,setSelectedFileQuiz]=useState(null);
const [selectedFileFeed,setSelectedFileFeed]=useState(null);
const [modifiedCsv, setModifiedCsv] = useState(null);
const [selectedFilePrac,setSelectedFilePrac]=useState(null);
const [showCOForm, setShowCOForm] = useState(false); // State variable to manage the visibility of the CO form
const [showPracform,setShowPracForm]=useState(false);


//ASSIGNMENT POST
const handleFileChangeAss=(e)=>{
  setSelectedFile(e.target.files[0]);
}
const handleFileUploadAss = async (e) => {
  e.preventDefault();

  if (!selectedFile) {
    console.log('Please select a file before uploading.');
    return;
  }

  const formData = new FormData();
  formData.append('file', selectedFile);

  try {
    const response = await fetch('http://127.0.0.1:8000/assignment/', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      // Parse the response as text (CSV content)
      const csvContent = await response.text();

      // Generate a unique filename for the CSV file
      const uniqueFilename = `final_assignment_${Date.now()}.csv`;

      // Create a blob from the CSV content
      const csvBlob = new Blob([csvContent], { type: 'text/csv' });

      // Create a URL for the blob
      const url = window.URL.createObjectURL(csvBlob);

      // Create a temporary link element
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', uniqueFilename);

      // Append the link to the document body and trigger the download
      document.body.appendChild(link);
      link.click();

      // Remove the link from the document body
      document.body.removeChild(link);

      console.log('CSV file downloaded successfully!');
    } else {
      console.error('Failed to upload file.');
      // You can handle the error response here.
    }
  } catch (error) {
    console.error('An error occurred:', error);
    // Handle any network or other errors here.
  }
};

//UT POST
const handleFileChangeUt=(e)=>{
  setSelectedFileUt(e.target.files[0]);
  setShowCOForm(true);
}

const handleCloseModal = () => {
  setShowCOForm(false); // Hide the modal when onClose is called

};

const handleFileUploadUt = async (e) => {

  e.preventDefault();

  if (!selectedFileUt) {
    console.log('Please select a file before uploading.');
    return;
  }
console.log(selectedFileUt);
  const formData = new FormData();
  formData.append('file', selectedFileUt);

  try {
    const response = await fetch('http://127.0.0.1:8000/check/', {
      method: 'POST',
      body: formData,
    });
    if (response.ok) {
      const csvContent = await response.text();

      // Generate a unique filename for the CSV file
      const uniqueFilename = `final_unit_${Date.now()}.csv`;

      // Create a blob from the CSV content
      const csvBlob = new Blob([csvContent], { type: 'text/csv' });

      // Create a URL for the blob
      const url = window.URL.createObjectURL(csvBlob);

      // Create a temporary link element
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', uniqueFilename);

      // Append the link to the document body and trigger the download
      document.body.appendChild(link);
      link.click();

      // Remove the link from the document body
      document.body.removeChild(link);

      console.log('CSV file downloaded successfully!');

      // You can handle the success response here.
    }
else {
      console.error('Failed to upload file.');
      // You can handle the error response here.
    }
  } catch (error) {
    console.error('An error occurred:', error);
    // Handle any network or other errors here.
  }
  
}

//SEM POST
const handleFileChangeSem=(e)=>{
  setSelectedFileSem(e.target.files[0]);

}
const handleFileUploadSem = async (e) => {
  e.preventDefault();
console.log("Hello");
  if (!selectedFileSem) {
    console.log('Please select a file before uploading.');
    return;
  }
console.log(selectedFileSem);
  const formData = new FormData();
  formData.append('file', selectedFileSem);

  try {
    const response = await fetch('http://127.0.0.1:8000/endsemexam/', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const csvContent = await response.text();

      // Generate a unique filename for the CSV file
      const uniqueFilename = `final_endsem_${Date.now()}.csv`;

      // Create a blob from the CSV content
      const csvBlob = new Blob([csvContent], { type: 'text/csv' });

      // Create a URL for the blob
      const url = window.URL.createObjectURL(csvBlob);

      // Create a temporary link element
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', uniqueFilename);

      // Append the link to the document body and trigger the download
      document.body.appendChild(link);
      link.click();

      // Remove the link from the document body
      document.body.removeChild(link);

      console.log('CSV file downloaded successfully!');

      // You can handle the success response here.
    } else {
      console.error('Failed to upload file.');
      // You can handle the error response here.
    }
  } catch (error) {
    console.error('An error occurred:', error);
    // Handle any network or other errors here.
  }
}

//ATTENDANCE POST

//QUIZESS
const handleFileChangeQuiz=(e)=>{
  setSelectedFileQuiz(e.target.files[0]);

}
const handleFileUploadQuiz = async (e) => {
  e.preventDefault();

  if (!selectedFileQuiz) {
    console.log('Please select a file before uploading.');
    return;
  }
console.log(selectedFileQuiz);
  const formData = new FormData();
  formData.append('file', selectedFileQuiz);

  try {
    const response = await fetch('http://127.0.0.1:8000/quiz/', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const csvContent = await response.text();

      // Generate a unique filename for the CSV file
      const uniqueFilename = `final_quiz_${Date.now()}.csv`;

      // Create a blob from the CSV content
      const csvBlob = new Blob([csvContent], { type: 'text/csv' });

      // Create a URL for the blob
      const url = window.URL.createObjectURL(csvBlob);

      // Create a temporary link element
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', uniqueFilename);

      // Append the link to the document body and trigger the download
      document.body.appendChild(link);
      link.click();

      // Remove the link from the document body
      document.body.removeChild(link);

      console.log('CSV file downloaded successfully!');

      // You can handle the success response here.
    } else {
      console.error('Failed to upload file.');
      // You can handle the error response here.
    }
  } catch (error) {
    console.error('An error occurred:', error);
    // Handle any network or other errors here.
  }
}

//Feedback POST
const handleFileChangeFeed=(e)=>{
  setSelectedFileFeed(e.target.files[0]);

}
const handleFileUploadFeed = async (e) => {
  e.preventDefault();

  if (!selectedFileFeed) {
    console.log('Please select a file before uploading.');
    return;
  }
console.log(selectedFileFeed);
  const formData = new FormData();
  formData.append('file', selectedFileFeed);

  try {
    const response = await fetch('http://127.0.0.1:8000/feedback/', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const csvContent = await response.text();

      // Generate a unique filename for the CSV file
      const uniqueFilename = `final_feedback_${Date.now()}.csv`;

      // Create a blob from the CSV content
      const csvBlob = new Blob([csvContent], { type: 'text/csv' });

      // Create a URL for the blob
      const url = window.URL.createObjectURL(csvBlob);

      // Create a temporary link element
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', uniqueFilename);

      // Append the link to the document body and trigger the download
      document.body.appendChild(link);
      link.click();

      // Remove the link from the document body
      document.body.removeChild(link);

      console.log('CSV file downloaded successfully!');

      // You can handle the success response here.
    }else {
      console.error('Failed to upload file.');
      // You can handle the error response here.
    }
  } catch (error) {
    console.error('An error occurred:', error);
    // Handle any network or other errors here.
  }
}

// Prac EXAM POST
const handleFileChangePrac=(e)=>{
  setSelectedFilePrac(e.target.files[0]);
  setShowPracForm(true);

}
const handleCloseModalPrac = () => {
  setShowPracForm(false); // Hide the modal when onClose is called
};
const handleFileUploadPrac = async (e) => {
  e.preventDefault();

  if (!selectedFilePrac) {
    console.log('Please select a file before uploading.');
    return;
  }
console.log(selectedFilePrac);
  const formData = new FormData();
  formData.append('file', selectedFilePrac);

  try {
    const response = await fetch('http://127.0.0.1:8000/analyze_experiments/', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const csvContent = await response.text();

      // Generate a unique filename for the CSV file
      const uniqueFilename = `final_feedback_${Date.now()}.csv`;

      // Create a blob from the CSV content
      const csvBlob = new Blob([csvContent], { type: 'text/csv' });

      // Create a URL for the blob
      const url = window.URL.createObjectURL(csvBlob);

      // Create a temporary link element
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', uniqueFilename);

      // Append the link to the document body and trigger the download
      document.body.appendChild(link);
      link.click();

      // Remove the link from the document body
      document.body.removeChild(link);

      console.log('CSV file downloaded successfully!');

      // You can handle the success response here.
    }else {
      console.error('Failed to upload file.');
      // You can handle the error response here.
    }
  } catch (error) {
    console.error('An error occurred:', error);
    // Handle any network or other errors here.
  }
}


    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };
  return (
    <>
   <NavbarLogout/>
    <div className="carousel-main">    
        <Carousel responsive={responsive} className='carousel'>
          {/* ASSIGNMENTS */}
<div className="flex justify-center items-center h-screen">
            <div className="bg-gray-100 rounded-lg p-8 shadow-md">
                <div className='title text-center'>
                    <h2>Assignments</h2>
                </div>
                <div className='upload flex justify-center mb-4'>
                    <img src={assignments} className='assignment-image' alt="Assignments" />
                </div>
                <div className='submit text-center'>
                    <form className='form' action="" id="assignment-form">
                        <input className="file-input hidden" onChange={handleFileChangeAss} type="file" accept=".csv" />
                        <Button onClick={handleFileUploadAss} variant="contained" color="primary" endIcon={<SendIcon />}>
                            Upload
                        </Button>
                    </form>
                </div>
            </div>
        </div>
{/* UNIT TESTS */}
<div className="flex justify-center items-center h-screen">
            <div className="bg-gray-100 rounded-lg p-8 shadow-md">
                <div className='title text-center'>
                    <h2>Unit Test</h2>
                </div>
                <div className='upload flex justify-center mb-4'>
                    <img src={ut} className='assignment-image' alt="Assignments" />
                </div>
                <div className='submit text-center'>
                    <form className='form' action="" id="assignment-form">
                        <input className="file-input hidden" onChange={handleFileChangeUt} type="file" accept=".csv" />
                        <Button onClick={handleFileUploadUt} variant="contained" color="primary" endIcon={<SendIcon />}>
                            Upload
                        </Button>
                    </form>
                </div>
            </div>
        </div>
       
      

{/* SEMESTERS */}
<div className="flex justify-center items-center h-screen">
            <div className="bg-gray-100 rounded-lg p-8 shadow-md">
                <div className='title text-center'>
                    <h2>End Sem Exams</h2>
                </div>
                <div className='upload flex justify-center mb-4'>
                    <img src={semExams} className='assignment-image' alt="Assignments" />
                </div>
                <div className='submit text-center'>
                    <form className='form' action="" id="assignment-form">
                        <input className="file-input hidden" onChange={handleFileChangeSem} type="file" accept=".csv" />
                        <Button onClick={handleFileUploadSem} variant="contained" color="primary" endIcon={<SendIcon />}>
                            Upload
                        </Button>
                    </form>
                </div>
            </div>
        </div>


{/* QUIZESS */}
<div className="flex justify-center items-center h-screen">
            <div className="bg-gray-100 rounded-lg p-8 shadow-md">
                <div className='title text-center'>
                    <h2>Quiz</h2>
                </div>
                <div className='upload flex justify-center mb-4'>
                    <img src={quizess} className='assignment-image' alt="Assignments" />
                </div>
                <div className='submit text-center'>
                    <form className='form' action="" id="assignment-form">
                        <input className="file-input hidden" onChange={handleFileChangeQuiz} type="file" accept=".csv" />
                        <Button onClick={handleFileUploadQuiz} variant="contained" color="primary" endIcon={<SendIcon />}>
                            Upload
                        </Button>
                    </form>
                </div>
            </div>
        </div>


{/* Feedback */}

<div className="flex justify-center items-center h-screen">
            <div className="bg-gray-100 rounded-lg p-8 shadow-md">
                <div className='title text-center'>
                    <h2>Feedback</h2>
                </div>
                <div className='upload flex justify-center mb-4'>
                    <img src={feedback} className='assignment-image' alt="Assignments" />
                </div>
                <div className='submit text-center'>
                    <form className='form' action="" id="assignment-form">
                        <input className="file-input hidden" onChange={handleFileChangeFeed} type="file" accept=".csv" />
                        <Button onClick={handleFileUploadFeed} variant="contained" color="primary" endIcon={<SendIcon />}>
                            Upload
                        </Button>
                    </form>
                </div>
            </div>
        </div>
{/* Practical Exam */}
<div className="flex justify-center items-center h-screen">
            <div className="bg-gray-100 rounded-lg p-8 shadow-md">
                <div className='title text-center'>
                    <h2>practical Exam</h2>
                </div>
                <div className='upload flex justify-center mb-4'>
                    <img src={practical} className='assignment-image' alt="Assignments" />
                </div>
                <div className='submit text-center'>
                    <form className='form' action="" id="assignment-form">
                        <input className="file-input hidden" onChange={handleFileChangePrac} type="file" accept=".csv" />
                        <Button onClick={handleFileUploadPrac} variant="contained" color="primary" endIcon={<SendIcon />}>
                            Upload
                        </Button>
                    </form>
                </div>
            </div>
        </div>

{/* PO*/}
{/* <Link to="/copoinput">
<div className="box-upload1">
<img src={ut} className='assignment-image' alt="Assignments" />
  <div className='title'>  <h2>PO-Mapping</h2></div>
  </div>
  </Link> */}

<div className="flex justify-center items-center h-screen">
            <div className="bg-gray-100 rounded-lg p-8 shadow-md">
                <div className='title text-center'>
                    <h2>CO PO INPUT</h2>
                </div>
                <div className='upload flex justify-center mb-4'>
                    <img src={ut} className='assignment-image' alt="Assignments" />
                </div>
                <div className='submit text-center'>
                      <Link to="/copoinput">
                      <Button variant="contained" color="primary" endIcon={<SendIcon />}>
                           Select CO PO
                        </Button>
                      </Link>
                </div>
            </div>
        </div>
</Carousel>



<div className='process'> 
<Link to="/dashboard"> 
<Button variant="contained" endIcon={<SendIcon />}>Dashboard</Button>
</Link>
   
</div>
    </div>
  
    {showCOForm && <Co onClose={handleCloseModal} />}
    {showPracform && <PracticalExam onClose={handleCloseModalPrac} />}


    </>
  )
}

export default Carousel1