import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Carousel1 from './Carousel/Carousel';
const TeacherForm = ({ result }) => {
    const [subject, setSubject] = useState('');
    const [year, setYear] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", { subject, year });
        setSubject('');
        setYear('');
    };
    const getPastYears = () => {
        const currentYear = new Date().getFullYear();
        const years = [];
        for (let i = 0; i < 5; i++) {
            years.push(currentYear - i);
        }
        return years;
    };
    return (
        <div className="teacher-form-container bg-gray-100 p-6 rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-4">Teacher Form</h2>
            <form onSubmit={handleSubmit} className="teacher-form">
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Name:</label>
                    <input type="text" id="name" value={result.first_name+result.last_name} readOnly className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500" />
                </div>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Email :</label>
                    <input type="text" id="name" value={result.email} readOnly className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500" />
                </div>
                <div className="mb-4">
    <label htmlFor="subject" className="block text-gray-700 font-semibold mb-2">Subject:</label>
    <select id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} required className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500">
        <option value="">Select a Subject</option>
        <option value="Math">CSS</option>
        <option value="Science">SPCC</option>
        <option value="History">QA</option>
        <option value="English">MC</option>
        <option value="Computer Science">Computer Science</option>
        <option value="Computer Science">AI</option>
        {/* Add more options as needed */}
    </select>
</div>

                <div className="mb-6">
                    <label htmlFor="year" className="block text-gray-700 font-semibold mb-2">Year:</label>
                    <select id="year" value={year} onChange={(e) => setYear(e.target.value)} required className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500">
                        <option value="">Select a Year</option>
                        {getPastYears().map((year) => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                </div>
                <Link to="/carousel">
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300" >Submit</button>
                </Link>
            </form>
        </div>
    );
};

export default TeacherForm;
