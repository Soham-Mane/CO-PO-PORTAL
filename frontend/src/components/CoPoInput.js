import React, { useState } from "react";

function CoPoInput() {
  const [coPoMapping, setCoPoMapping] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);

  const handleMappingChange = (i, j, value) => {
    const updatedMapping = [...coPoMapping];
    updatedMapping[i][j] = parseInt(value, 10);
    setCoPoMapping(updatedMapping);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://127.0.0.1:8000/savecopo/", {
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
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">CO-PO Mapping Input</h2>
      <form onSubmit={handleSubmit}>
        <div>
          {coPoMapping.map((row, i) => (
            <div key={i} className="mb-2 flex">
              {row.map((value, j) => (
                <span key={j} className="mr-2">
                  <input
                    className="border rounded px-2 py-1"
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
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default CoPoInput;
