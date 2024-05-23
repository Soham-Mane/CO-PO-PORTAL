import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto'; // Import all Chart.js charts

function Histogram() {
  const [data, setData] = useState(null); // Initially, data is null
  const [isLoading, setIsLoading] = useState(false); // Flag for loading state
  const [error, setError] = useState(null); // Store any error

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // Set loading state to true
      try {
        const response = await fetch('http://127.0.0.1:8000/data/');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const fetchedData = await response.json();
        setData(fetchedData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error); // Store the error for handling in the render function
      } finally {
        setIsLoading(false); // Set loading state to false even in case of errors
      }
    };

    fetchData(); // Call the getData function on component mount
  }, []);

  useEffect(() => {
    if (data) { // Create chart only if data is available
      const ctx = document.getElementById('myChart1').getContext('2d');
      if (!ctx) {
        console.error('Chart canvas element not found.');
        return;
      }

      // Extract specific data for the histogram
      const histogramData = {
        labels: ['End Semester', 'Test 1', 'Test 2'],
        datasets: [
          {
            label: 'Percentage Scores',
            data: [
              data.rounded_percentage_endesem,
              data.rounded_percentage_test1,
              data.rounded_percentage_test2,
            ],
            backgroundColor: [
                'rgba(203, 0, 0, 0.8)',
                'rgba(0, 0, 255, 1)',
                'rgba(255, 206, 86, 1)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };

      const chart = new Chart(ctx, {
        type: 'bar', // Use 'bar' for histogram
        data: histogramData,
        options: {
          // Add desired options (e.g., scales, title, legend)
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true // Start the y-axis at 0 for better visualization
              }
            }]
          }
        },
      });

      return () => chart.destroy(); // Clean up chart on component unmount
    }
  }, [data]);

  if (isLoading) {
    return <p>Loading data...</p>;
  }

  if (error) {
    return <p>Error fetching data: {error.message}</p>;
  }

  return ( // Render the chart only if data is available and no errors occur
  <>
  <h2 className="text-2xl font-semibold mb-4 text-center">Exams</h2>
     <div>
      <canvas id="myChart1" height="200" width="400" />
    </div>
  </>
 
  );
}

export default Histogram;
