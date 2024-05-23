import React, { useState } from 'react';
import styles from "../components/Ut/Co.module.css";
import Modal from "./Modal";
function PracticalExam({onClose}) {
  const [cos, setCos] = useState({
    Exp1: '',
    Exp2: '',
    Exp3: '',
    Exp4: '',
    Exp5: '',
    Exp6: '',
    Exp7: '',
    Exp8: '',
    Exp9: '',
  });

  const handleOptionChange = (expKey, optionValue) => {
    // Update the selected option for the specified experiment
    setCos((prevState) => {
      const updatedCos = { ...prevState };
      updatedCos[expKey] = optionValue;
      return updatedCos;
    });
  };

  const handleSubmit = (e) => {
    console.log('Selected options for each experiment:', cos);
    e.preventDefault();

    // Create an object to send as JSON data
    const requestData = {
      exp1: cos.Exp1,
      exp2: cos.Exp2,
      exp3: cos.Exp3,
      exp4: cos.Exp4,
      exp5: cos.Exp5,
      exp6: cos.Exp6,
      exp7: cos.Exp7,
      exp8: cos.Exp8,
      exp9: cos.Exp9,
    };

    var requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Specify JSON content type
      },
      body: JSON.stringify(requestData), // Convert to JSON
      redirect: 'follow',
    };

    fetch("http://127.0.0.1:8000/analyze_experiments/", requestOptions) // Use the URL for your Django API endpoint
      .then(response => response.json())
      .then(result => {
        console.log(result);

        if (result.success) {
          console.log("Experiments saved successfully");
        } else if (result.message) {
          alert("Experiments not saved successfully.");
          console.log("User fail");
        } else {
          alert("Failed to save experiments. Please try again.");
        }
        onClose();
      })
      .catch(error => console.log('error', error));
  };

  return (
    <Modal onClose={onClose}>

<div className="bg-gray-100 min-h-screen py-8">
  <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
    <h2 className="text-2xl font-bold mb-6">Multiple Experiment Form</h2>
    <form id="formdata">
      {/* Create radio buttons for each Experiment */}
      {['Exp1', 'Exp2', 'Exp3', 'Exp4', 'Exp5', 'Exp6', 'Exp7', 'Exp8', 'Exp9'].map((expName) => (
        <div key={expName} className="mb-6">
          <h3 className="text-lg font-semibold mb-2">{expName}</h3>
          <div className="flex flex-wrap">
            {['Co1', 'Co2', 'Co3', 'Co4', 'Co5'].map((option) => (
              <label key={option} className="flex items-center mr-4 mb-2">
                <input
                  type="radio"
                  name={expName}
                  value={option}
                  onChange={(e) => handleOptionChange(expName, e.target.value)}
                  checked={cos[expName] === option}
                  className="form-radio text-indigo-600 h-4 w-4"
                />
                <span className="ml-2">{option}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
      <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" type="submit">Submit</button>
    </form>
  </div>
</div>

      </Modal>

  );
}

export default PracticalExam;


// import React, { useState } from 'react';


// function PracticalExam() {
//   const [cos, setCos] = useState({
//     Exp1: '',
//     Exp2: '',
//     Exp3: '',
//     Exp4: '',
//     Exp5: '',
//     Exp6: '',
//     Exp7: '',
//     Exp8: '',
//     Exp9: '',
//   });

//   const handleOptionChange = (expKey, optionValue) => {
//     setCos((prevState) => ({ ...prevState, [expKey]: optionValue }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const requestData = {
//       exp1: cos.Exp1,
//       exp2: cos.Exp2,
//       exp3: cos.Exp3,
//       exp4: cos.Exp4,
//       exp5: cos.Exp5,
//       exp6: cos.Exp6,
//       exp7: cos.Exp7,
//       exp8: cos.Exp8,
//       exp9: cos.Exp9,
//     };

//     // Implement your logic for sending data to the API endpoint
//     console.log('Selected options:', requestData);
//   };

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-100">
//       <div className="container mx-auto px-4 py-8 flex flex-col items-center">
//         <h2 className="text-3xl font-bold text-blue-500 mb-8">Multiple Experiment Form</h2>

//         <form id="formdata" className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
//           {['Exp1', 'Exp2', 'Exp3', 'Exp4', 'Exp5', 'Exp6', 'Exp7', 'Exp8', 'Exp9'].map(
//             (expName) => (
//               <div key={expName} className="mb-6 border-b border-gray-200">
//                 <h3 className="text-xl font-bold text-gray-800 mb-2">{expName}</h3>
//                 <div className="flex flex-wrap">
//                   {['Co1', 'Co2', 'Co3', 'Co4', 'Co5'].map((option) => (
//                     <label key={option} className="mr-4 flex items-center">
//                       <input
//                         type="radio"
//                         name={expName}
//                         value={option}
//                         onChange={(e) => handleOptionChange(expName, e.target.value)}
//                         checked={cos[expName] === option}
//                         className="focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:outline-none border border-gray-300 rounded-md p-2"
//                       />
//                       <span className="ml-2 text-gray-700 text-base">{option}</span>
//                     </label>
//                   ))}
//                 </div>
//               </div>
//             )
//           )}

//           <button
//             onClick={handleSubmit}
//             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 mt-4"
//             type="submit"
//           >
//             Submit
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default PracticalExam;

