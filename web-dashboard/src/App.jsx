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

  // CSS helper to hide text visually but keep it available for screen readers
  const srOnlyStyle = {
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: '0',
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    whiteSpace: 'nowrap',
    border: '0',
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
      <h1 style = {{textAlign: 'center'}}>IMPRINT Admin Dashboard</h1>
    <div style={{ 
        width: '95%', 
        maxWidth: '5000px', 
        margin: '0 auto', // Centers this whole block
        textAlign: 'left' // Ensures text inside starts at the left edge
      }}>
        <h3>Manage Scanners</h3>
        {/* We use a standard HTML table to display our scanner data. 
            The 'border' and 'cellPadding' are basic styles for visibility. 
        */}
        <table border="1" cellPadding="10" style={{ 
          //    'maxWidth' stops it from getting too huge on big monitors.
          width: '100%', 
          maxWidth: '5000px', 
          margin: '0 auto', 
          textAlign: 'left',          // Keep text readable
          border: '1px solid #ccc',   // Soft border color
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)' // Adds a tiny shadow for depth
        }}> 
        <caption style={srOnlyStyle}>
          Live status report of all registered RFID scanners, showing name, location, and connectivity.
        </caption>
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {/* .map() is a loop. It takes every 'scanner' in our state 
                and turns it into a table row (<tr>).             */}
          {scanners.map(scanner => (
          <tr key={scanner.id}>
            <td>{scanner.name}</td>
            <td>{scanner.location}</td>
            <td>{scanner.status}</td>
          </tr>
            ))}
        </tbody>
        </table>
        
          {/* This button will eventually trigger a form to export data*/}
        <button style={{ marginTop: '20px' }}>+ Export Data</button>
    </div>
    </div>
  );
}

export default App;