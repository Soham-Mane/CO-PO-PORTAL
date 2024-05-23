import React, { useEffect, useState } from 'react';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import Chart from 'chart.js/auto';
import MyComponent from './PieChart';
import Histogram from './Histogram';
import PoGraph from './PoGraph';
import CoGraph from './CoGraph';


const Dashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/data/')
      .then(response => {
        if (response.ok) {
          console.log('Data fetched successfully');
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);
  
  const styles = StyleSheet.create({
    page: {
      fontFamily: 'Helvetica',
      fontSize: 12,
      paddingTop: 20,
      paddingLeft: 20,
      paddingRight: 20,
      paddingBottom: 20,
      backgroundColor: '#f0f0f0',
    },
    section: {
      marginBottom: 10,
    },
    title: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 5,
      color: '#333',
      textAlign: 'center',
    },
    keyValue: {
      marginBottom: 3,
      color: '#666',
    },
  });
  


  const generatePDF = () => {
    return (
      <Document>
        <Page style={styles.page}>
          <View style={styles.section}>
            <Text style={styles.title}>API Data</Text>
            {data && Object.entries(data).map(([key, value]) => (
              <Text key={key}>{key}: {JSON.stringify(value)}</Text>
            ))}
          </View>
        </Page>
      </Document>
    );
  };

  return (
    <div className='w-full '>
     <div className="w-full  px-4 py-4 flex justify-around bg-[#3D52AD]	">
      <h2 className='text-2xl text-white'>Admin Dashboard</h2>
        <PDFDownloadLink document={generatePDF()} fileName="Student-result.pdf">
          {({ blob, url, loading, error }) =>
             <div className="text-white">
             {loading ? 'Loading document...' : 'Download PDF'}
           </div>
          }
        </PDFDownloadLink>
      </div> 
  <div className="flex flex-wrap justify-center ">
  
      <div className="w-full md:w-1/3 px-4 py-4 ">
        <div className="bg-[#3c63c8] rounded-lg  p-6 text-center text-white">
          <h2 className="text-2xl font-bold">Total Students</h2>
          <p className="text-3xl mt-4">{data ? data.total_students : 'Loading...'}</p>
        </div>
      </div>
      <div className="w-full md:w-1/3 px-4 py-4">
        <div className="bg-green-500 rounded-lg shadow-lg p-6 text-center text-white">
          <h2 className="text-2xl font-bold">Successful Students</h2>
          <p className="text-3xl mt-4">{data ? data.successful_students : 'Loading...'}</p>
        </div>
      </div>
      <div className="w-full md:w-1/3 px-4 py-4">
        <div className="bg-red-500 rounded-lg shadow-lg p-6 text-center text-white">
          <h2 className="text-2xl font-bold">Failed Students</h2>
          <p className="text-3xl mt-4">{data ? data.unsuccessful_students : 'Loading...'}</p>
        </div>
      </div>
    </div>


{/* <div className="container mx-auto px-4 py-8 ">
  <div className="flex justify-items-stretch gap-8 w-full">
    {data && (
      <>
        <div className="w-full md:w-1/5 bg-blue-300 border border-blue-400 p-4 rounded-md">
          <h2 className="text-lg font-semibold mb-2">PO1</h2>
          <p className="text-xl">{data.po1}</p>
        </div>
        <div className="w-full md:w-1/5 bg-blue-300 border border-blue-400 p-4 rounded-md">
          <h2 className="text-lg font-semibold mb-2">PO2</h2>
          <p className="text-xl">{data.po2}</p>
        </div>
        <div className="w-full md:w-1/5 bg-blue-300 border border-blue-400 p-4 rounded-md">
          <h2 className="text-lg font-semibold mb-2">PO3</h2>
          <p className="text-xl">{data.po3}</p>
        </div>
        <div className="w-full md:w-1/5 bg-blue-300 border border-blue-400 p-4 rounded-md">
          <h2 className="text-lg font-semibold mb-2">PO4</h2>
          <p className="text-xl">{data.po4}</p>
        </div>
        <div className="w-full md:w-1/5 bg-blue-300 border border-blue-400 p-4 rounded-md">
          <h2 className="text-lg font-semibold mb-2">PO5</h2>
          <p className="text-xl">{data.po5}</p>
        </div>
        <div className="w-full md:w-1/5 bg-blue-300 border border-blue-400 p-4 rounded-md">
          <h2 className="text-lg font-semibold mb-2">CO1</h2>
          <p className="text-xl">{data.co1}</p>
        </div>
        <div className="w-full md:w-1/5 bg-blue-300 border border-blue-400 p-4 rounded-md">
          <h2 className="text-lg font-semibold mb-2">CO2</h2>
          <p className="text-xl">{data.co2}</p>
        </div>
        <div className="w-full md:w-1/5 bg-blue-300 border border-blue-400 p-4 rounded-md">
          <h2 className="text-lg font-semibold mb-2">CO3</h2>
          <p className="text-xl">{data.co3}</p>
        </div>
        <div className="w-full md:w-1/5 bg-blue-300 border border-blue-400 p-4 rounded-md">
          <h2 className="text-lg font-semibold mb-2">CO4</h2>
          <p className="text-xl">{data.co4}</p>
        </div>
        <div className="w-full md:w-1/5 bg-blue-300 border border-blue-400 p-4 rounded-md">
          <h2 className="text-lg font-semibold mb-2">CO5</h2>
          <p className="text-xl">{data.co5}</p>
        </div>
      </>
    )}
  </div>
</div> */}
{/* <div className="container mx-auto px-4 py-8 flex flex-row justify-center gap-4">
{
  data && (
    <>
     <div class="bg-teal-400 border border-teal-400 p-4 rounded-md w-1/2">
    <h2 class="text-xl font-bold text-black mb-2">CO Values</h2>
    <div class="grid grid-cols-2 gap-4">
  
        <div class="bg-white border border-teal-200 p-4 rounded-md text-center">
          <h3 class="text-xl font-bold text-teal-700 mb-2">CO1</h3>
          <p class="text-lg font-bold text-teal-500">{data.co1 ?? '2.60'}</p>
        </div>
  
        <div class="bg-white border border-teal-200 p-4 rounded-md text-center">
          <h3 class="text-xl font-bold text-teal-700 mb-2">CO2</h3>
          <p class="text-lg font-bold text-teal-500">{data.co2 ?? '2.60'}</p>
        </div>
  
        <div class="bg-white border border-teal-200 p-4 rounded-md text-center">
          <h3 class="text-xl font-bold text-teal-700 mb-2">CO3</h3>
          <p class="text-lg font-bold text-teal-500">{data.co3 ?? '2.60'}</p>
        </div>
  
        <div class="bg-white border border-teal-200 p-4 rounded-md text-center">
          <h3 class="text-xl font-bold text-teal-700 mb-2">CO4</h3>
          <p class="text-lg font-bold text-teal-500">{data.co4 ?? '2.60'}</p>
        </div>
  
        <div class="bg-white border border-teal-200 p-4 rounded-md text-center">
          <h3 class="text-xl font-bold text-teal-700 mb-2">CO5</h3>
          <p class="text-lg font-bold text-teal-500">{data.co5 ?? '2.60'}</p>
        </div>
  </div></div>
  <div class="bg-teal-400 border border-teal-400 p-4 rounded-md w-1/2">
    <h2 class="text-xl font-bold text-black mb-2">PO Values</h2>
    <div class="grid grid-cols-2 gap-4">
  
        <div class="bg-white border border-teal-200 p-4 rounded-md text-center">
          <h3 class="text-xl font-bold text-teal-700 mb-2">PO1</h3>
          <p class="text-lg font-bold text-teal-500">{data.po1}</p>
        </div>
  
        <div class="bg-white border border-teal-200 p-4 rounded-md text-center">
          <h3 class="text-xl font-bold text-teal-700 mb-2">PO2</h3>
          <p class="text-lg font-bold text-teal-500">{data.po2}</p>
        </div>
  
        <div class="bg-white border border-teal-200 p-4 rounded-md text-center">
          <h3 class="text-xl font-bold text-teal-700 mb-2">PO3</h3>
          <p class="text-lg font-bold text-teal-500">{data.po3}</p>
        </div>
  
        <div class="bg-white border border-teal-200 p-4 rounded-md text-center">
          <h3 class="text-xl font-bold text-teal-700 mb-2">PO4</h3>
          <p class="text-lg font-bold text-teal-500">{data.po4}</p>
        </div>
  
        <div class="bg-white border border-teal-200 p-4 rounded-md text-center">
          <h3 class="text-xl font-bold text-teal-700 mb-2">PO5</h3>
          <p class="text-lg font-bold text-teal-500">{data.po5}</p>
        </div>
  </div></div>
    </>
   
  )
}
 
</div> */}

<div className="container mx-auto px-4 py-8 flex flex-col items-center">
  {data && (
    <>
      <div className="bg-[#7091E6] border border-teal-400 p-4 rounded-md w-full mb-4">
        <h2 className="text-xl font-bold text-[#EDE8F5] mb-2">CO Values</h2>
        <div className="flex justify-between gap-4">
          {[1, 2, 3, 4, 5].map((index) => (
            <div key={`co${index}`} className="bg-white border border-teal-200 p-4 rounded-md text-center flex-grow">
              <h3 className="text-xl font-extrabold text-[#3D52A0] mb-2">CO{index}</h3>
              <p className="text-lg font-bold text-[ADBBDA]">{data[`co${index}`] ?? '2.60'}</p>
            </div>
          ))}  
        </div>
      </div>
      <div className="bg-[#7091E6] border border-teal-400 p-4 rounded-md w-full mb-4">
        <h2 className="text-xl font-bold text-[#EDE8F5] mb-2">PO Values</h2>
        <div className="flex justify-between gap-4">
          {[1, 2, 3, 4, 5].map((index) => (
            <div key={`po${index}`} className="bg-white border border-teal-200 p-4 rounded-md text-center flex-grow">
              <h3 className="text-xl font-extrabold	 text-[#3D52A0] mb-2">PO{index}</h3>
              <p className="text-lg font-bold text-[ADBBDA]">{data[`po${index}`]}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-[#7091E6] border border-teal-400 p-4 rounded-md w-full mb-4">
        <h2 className="text-xl font-bold text-[#EDE8F5] mb-2">PSO Values</h2>
        <div className="flex justify-between gap-4">
          {[1, 2, 3, 4, 5].map((index) => (
            <div key={`pso${index}`} className="bg-white border border-teal-200 p-4 rounded-md text-center flex-grow">
              <h3 className="text-xl font-extrabold text-[#3D52A0] mb-2">PSO{index}</h3>
              <p className="text-lg font-bold text-[ADBBDA]">{data[`pso${index}`] }</p>
            </div>
          ))}  
        </div>
      </div>
    </>
  )}
</div>




    <div className='w-full h-96 flex'>
<div className='w-1/2 ' >
<MyComponent/>
</div>
<div className='w-1/2 '>
  <Histogram/>
</div>

    </div>


<div className='w-full h-96 flex mt-16'>
<div className='w-1/2 '>
  <PoGraph/>
</div>
<div className='w-1/2 '>
  <CoGraph/>
</div>
</div>
   
    </div>
  
  );
};

export default Dashboard;

