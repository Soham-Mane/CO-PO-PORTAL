import React, { useState } from 'react';
import "./MyForm.css";
function DropdownExample() {
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedPOValues, setSelectedPOValues] = useState({
    po1: '',
    po2: '',
    po3: '',
    po4: '',
    po5: '',
    po6: '',
  });

  const options = ['ECC501.1', 'ECC501.2', 'ECC501.3', 'ECC501.4', 'ECC501.5'];

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handlePOChange = (event) => {
    const { name, value } = event.target;
    setSelectedPOValues({ ...selectedPOValues, [name]: value });

  };

  const submitHandler = (e) => {
    e.preventDefault();

    const selectedData = {
      ecc: selectedOption,
      po1: selectedPOValues.po1,
      po2: selectedPOValues.po2,
      po3: selectedPOValues.po3,
      po4: selectedPOValues.po4,
      po5: selectedPOValues.po5,
      po6: selectedPOValues.po6,
    };

    fetch('http://127.0.0.1:8000/save_pos/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedData),
      })
      .then((response) => response.json())
      .then((data) => {
        console.log('Response from the server:', data);
      })
      .catch((error) => {
        console.error('Error sending data:', error);
      });
    console.log('Selected Data:', selectedData);
    
  };

  return (
    <div className='container'>
      <h1 style={{ textAlign: 'center' }}>PO Mapping</h1>
      <label>Select an option: </label>
      <div style={{ display: 'flex' }}>
        <form onSubmit={submitHandler}>
          <select value={selectedOption} onChange={handleSelectChange}>
            <option value="">-- Select an option --</option>
            {options.map((option, index) => (
              <option key={index} name="ecc" value={option}>
                {option}
              </option>
            ))}
          </select>
          <div style={{ display: 'flex', alignItems: 'center', marginLeft: '10px' }}>
            {Array.from({ length: 6 }, (_, index) => {
              const poName = `po${index + 1}`;
              return (
                <div key={index}>
                  <p>PO{index + 1}</p>
                  <input
                    name={poName}
                    style={{ width: '25px', height: '25px', margin: '5px' }}
                    type="number"
                    value={selectedPOValues[poName]}
                    onChange={handlePOChange}
                  />
                </div>
              );
            })}
          </div>
          <button className='btn'>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default DropdownExample;
