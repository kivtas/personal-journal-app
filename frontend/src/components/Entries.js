import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Entries.css'; // Make sure to create a corresponding CSS file

function Entries() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Fetching entries...');
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/entries`)
      .then(response => {
        console.log('Fetched entries:', response.data);
        setEntries(response.data);
      })
      .catch(error => {
        console.error('Error fetching entries:', error);
        setError('Error fetching entries');
      });
  }, []);

  const handleDelete = (entryId) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/entries/${entryId}`)
        .then(() => {
          setEntries(entries.filter(entry => entry.id !== entryId));
          console.log('Entry deleted:', entryId);
        })
        .catch(error => {
          console.error('Error deleting entry:', error);
          setError('Error deleting entry');
        });
    }
  };

  return (
    <div className="entries-container">
      <h1 className="entries-title">Your Diary Entries</h1>
      {error && <p className="error-message">{error}</p>}
      <ul className="entries-list">
        {entries.length === 0 ? (
          <li className="no-entries">No entries available.</li>
        ) : (
          entries.map(entry => (
            <li key={entry.id} className="entry-item">
              <Link to={`/entries/${entry.id}`} className="entry-link">
                {new Date(entry.timestamp).toLocaleDateString()}
              </Link>
              <button className="delete-button" onClick={() => handleDelete(entry.id)}>
                Delete
              </button>
            </li>
          ))
        )}
      </ul>
      <div className="create-entry-link">
        <Link to="/create_entry">Create a New Entry</Link>
      </div>
    </div>
  );
}

export default Entries;
