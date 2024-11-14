import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Entries() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Fetching entries...');
    axios.get('http://localhost:8080/api/entries')
      .then(response => {
        console.log('Fetched entries:', response.data);
        setEntries(response.data);
      })
      .catch(error => {
        console.error('Error fetching entries:', error);
        setError('Error fetching entries');
      });
  }, []);
  
  // Render the entries list
  return (
    <div>
      <h1>Entries</h1>
      {error && <p>{error}</p>}
      <ul>
        {entries.length === 0 ? (
          <li>No entries available.</li>
        ) : (
          entries.map(entry => (
            <li key={entry.id}>
              {new Date(entry.timestamp).toLocaleDateString()} {/* Formats the date to display only the date part */}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default Entries;
