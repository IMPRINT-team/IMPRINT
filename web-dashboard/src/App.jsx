//Help from Gemini
import React, { useState } from 'react';

/**
 * App is the main functional component for the IMPRINT Admin Dashboard.
 */
function App() {
  /**
   * Eventually, this data will be fetched from the IMPRINT API.
   */
  const [scanners, setScanners] = useState([
    { id: 1, name: "North Gate", location: "Building A", status: "Online" },
    { id: 2, name: "Lab Door", location: "Room 302", status: "Offline" },
  ]);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>IMPRINT Admin Dashboard</h1>
      <p>Centralized resource lifecycle management for RFID nodes.</p>
      
      <h3>Manage Scanners</h3>
      {/* We use a standard HTML table to display our scanner data. 
          The 'border' and 'cellPadding' are basic styles for visibility. 
      */}
      <table border="1" cellPadding="10" style={{ width: '100%', textAlign: 'left' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* .map() is a loop. It takes every 'scanner' in our state 
              and turns it into a table row (<tr>). 
          */}
          {scanners.map(scanner => (
            <tr key={scanner.id}>
              <td>{scanner.name}</td>
              <td>{scanner.location}</td>
              <td>{scanner.status}</td>
              <td>
                <button onClick={() => alert('Editing logic is a future Sprint task!')}>
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* This button will eventually trigger a form to export data*/}
      <button style={{ marginTop: '20px' }}>+ Export Data</button>
    </div>
  );
}

export default App;