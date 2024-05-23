import React, { useState } from 'react';

const MyForm = () => {
  const [formData, setFormData] = useState({
    ECC501_1: [0, 0, 0, 0, 0, 0],
    ECC501_2: [0, 0, 0, 0, 0, 0],
    ECC501_3: [0, 0, 0, 0, 0, 0],
    ECC501_4: [0, 0, 0, 0, 0, 0],
    ECC501_5: [0, 0, 0, 0, 0, 0],
  });

  const handleInputChange = (event, eccKey, poIndex) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [eccKey]: prevFormData[eccKey].map((val, index) =>
        index === poIndex ? parseInt(value) : val
      ),
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    
    const requestData = { formData};
    const requestOptions={
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
        redirect: 'follow'
    };

    fetch("",requestOptions)
        .then((response)=>response.json())
        .then((result)=>{
            console.log(result);

            if(result.success) {
                console.log("Pos saved successfully!!");
            }
            else if(result.message) {
                alert("POs not saved successfully");
                console.log("User failed!!");
            }
            else{
                alert("Failed to save POs.Please try again.");
            }
        })
        .catch((error)=>console.log('error',error));
  };

  return (
    <div>
      <form id="formdata" onSubmit={handleSubmit}>
        {Object.keys(formData).map((eccKey) => (
          <div key={eccKey}>
            <h4>{eccKey}</h4>
            <div className="po-container">
            {formData[eccKey].map((value, poIndex) => (
              <div key={poIndex} className='po-input'>
                <label>
                  PO{poIndex + 1}:
                  <input
                    type="number"
                    name={poIndex}
                    value={value}
                    onChange={(event) => handleInputChange(event, eccKey, poIndex)}
                  />
                </label>
              </div>
            ))}
          </div>
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default MyForm;
