import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto'; // Import all Chart.js charts

function CoGraph() {
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
      const ctx = document.getElementById('myChart3').getContext('2d');
      if (!ctx) {
        console.error('Chart canvas element not found.');
        return;
      }

      // Extract specific quiz data (assuming proper key names)
      const PoData = {
        labels: ['CO1', 'CO2', 'CO3', 'CO4', 'CO5'],
        datasets: [
          {
            label: 'Quizzes',
            label: 'CO',
            data: [
              data.co1,
              data.co2,
              data.co3,
              data.co4,
              data.co5,
            ],
            backgroundColor: [
                'rgba(203, 0, 0, 0.8)',
                'rgba(0, 0, 255, 1)',
                'rgba(255, 206, 86, 0.8)', // Yellow
                'rgba(75, 192, 192, 0.8)', // Green
                'rgba(153, 102, 255, 0.8)', // Purple
              ],
            borderColor: [
               
            ],
            borderWidth: 1,
          },
        ],
      };

      const chart = new Chart(ctx, {
        type: 'pie',
        data: PoData,
        options: {
          // Add desired options (e.g., title, legend)
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
<h2 className="text-2xl font-semibold mb-4 text-center">CO Graph</h2>
<div>
   
   <canvas id="myChart3" height="250" width="250"  style={{ maxWidth: '100%', maxHeight: '100%' }}/>
 </div>
  </>
 
  );
}

export default CoGraph;
