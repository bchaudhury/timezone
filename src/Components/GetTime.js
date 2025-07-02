import React from 'react'
import './GetTime.css'
import timezones from '../Data/TimeZone.json';

const GetTime = () => {
    // This component will handle fetching and displaying the time for a given location
    const fetchTime = async () => {
        const location = document.querySelector('select').value;
        const timeDisplay = document.getElementById('time');
        const dateDisplay = document.getElementById('date');
        const dayDisplay = document.getElementById('day');
        try {
            const response = await fetch(`https://timeapi.io/api/time/current/zone?timeZone=${location}`);
            if (!response.ok) {
                throw new Error('Location not found');
            }
            const data = await response.json();
            timeDisplay.textContent = data.time;
            dateDisplay.textContent = data.date;
            dayDisplay.textContent = data.dayOfWeek;
        } catch (error) {
            timeDisplay.textContent = error.message;
        }
        
    }

  return (
    <div className='time-container'>
        <h1>World Time</h1>
 
        <select className='location-select' onChange={fetchTime} type="text"> 
            <option value="">Select a location</option>
            {Object.keys(timezones).map((key, index) => (
                <option key={index} value={timezones[key]}>{key}</option>
            ))}
        </select>
        <br />
        

        {/* Display the fetched time here */}
        <div className="time-display">
            <p className='result'>Current Time:  <span id="time">--</span></p>
            <p className='result'>Current Date:  <span id="date">--</span></p>
            <p className='result'>Current Day:   <span id="day">--</span></p>
        </div>

    </div>
  )
}

export default GetTime