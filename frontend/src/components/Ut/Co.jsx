import React, { useState } from 'react';
import styles from "./Co.module.css";
import Modal from "../Modal";
function MultipleCOForm({onClose}) {
  const [cos, setCos] = useState({
    CO1: [],
    CO2: [],
    CO3: [],
    CO4: [],
    CO5: [],
    CO6: [],
  });

  const handleOptionChange = (coKey, optionValue) => {
    // Update the selected options array for the specified CO
    setCos((prevState) => {
      const updatedCos = { ...prevState };
      const selectedOptions = [...updatedCos[coKey]];

      if (selectedOptions.includes(optionValue)) {
        // If the option is already selected, remove it
        const index = selectedOptions.indexOf(optionValue);
        selectedOptions.splice(index, 1);
      } else {
        // If the option is not selected, add it
        selectedOptions.push(optionValue);
      }

      updatedCos[coKey] = selectedOptions;
      return updatedCos;
    });
  };

  const handleSubmit = (e) => {
    console.log('Selected options for each CO:', cos);
    e.preventDefault();

    // Create an object to send as JSON data
    const requestData = {
      co1: cos.CO1,
      co2: cos.CO2,
      co3: cos.CO3,
      co4: cos.CO4,
      co5: cos.CO5,
      co6: cos.CO6,
    };

    var requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Specify JSON content type
      },
      body: JSON.stringify(requestData), // Convert to JSON
      redirect: 'follow',
    };

    fetch("http://127.0.0.1:8000/save_cos/", requestOptions) // Use the URL for your Django API endpoint
      .then(response => response.json())
      .then(result => {
        console.log(result);

        if (result.success) {
          console.log("COs saved successfully");
         


        } else if (result.message) {
          alert("COs not saved successfully.");
          console.log("User fail");
        } else {
          alert("Failed to save COs. Please try again.");
        }
        onClose();
      })
      .catch(error => console.log('error', error));
  };

  return (
    <Modal onClose={onClose}>
 <div className={styles.container}>
      <h2 className='h2'>Multiple CO Form</h2>
      <form  id="formdata">
        {/* Create checkboxes for each CO */}
        {['CO1', 'CO2', 'CO3', 'CO4', 'CO5', 'CO6'].map((coName) => (
          <div key={coName} className={styles.coSection}>
            <h3>{coName}</h3>
            <div className={styles.optionSection}>
              {['Q1(5)', 'Q2(5)', 'Q3(5)', 'Q4(5)', 'Q1(5).1', 'Q2(5).1', 'Q3(5).1', 'Q4(5).1'].map((option) => (
                <label key={option}>
                  <input
                    type="checkbox"
                    onChange={() => handleOptionChange(coName, option)}
                    checked={cos[coName].includes(option)}
                  />{' '}
                  {option}
                </label>
              ))}
            </div>
          </div>
        ))}
      </form>
      <button  onClick={handleSubmit} className={styles.btn} type="submit">Submit</button>
    </div>
    </Modal>
   
  );
}

export default MultipleCOForm;


