import React, { useState } from "react";

function Pso() {
  const [coPoMapping, setCoPoMapping] = useState([
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ]);

  const handleMappingChange = (i, j, value) => {
    const updatedMapping = [...coPoMapping];
    updatedMapping[i][j] = parseInt(value, 10);
    setCoPoMapping(updatedMapping);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://127.0.0.1:8000/pso/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ coPoMapping }), // Pass coPoMapping directly as an object
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Selected values:", coPoMapping); // Log the selected values after submitting
        console.log(data); // Log the response from the server
      })
      .catch((error) => console.error(error));
  };
  

  return (
    <div className="container mx-auto p-4 bg-gray-100 rounded-md shadow-md">
      <h2 className="text-lg font-bold mb-4 text-center">PSO INPUT</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-5 gap-4">
          {coPoMapping.map((row, i) => (
            <div key={i} className="flex flex-col">
              {row.map((value, j) => (
                <span key={j} className="mb-2">
                  <input
                    className="border rounded px-2 py-1 text-center"
                    type="number"
                    value={value}
                    onChange={(e) => handleMappingChange(i, j, e.target.value)}
                  />
                </span>
              ))}
            </div>
          ))}
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Pso;
