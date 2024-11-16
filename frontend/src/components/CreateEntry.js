import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreateEntry.css'; // Import the corresponding CSS file for this component

function CreateEntry() {
  const [entryText, setEntryText] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!entryText.trim()) {
      alert("Diary entry cannot be empty!");
      return;
    }
    console.log("Entry text:", entryText);

    // Prepare data to send to the backend
    const entryData = {
      timestamp: new Date().toISOString(),  // Java backend expects LocalDateTime.now(), so using current date
      content: entryText,
    };

    // Send POST request to create the entry
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/entries`, entryData)
      .then(response => {
        console.log('Entry created:', response.data);
        // Navigate to the EntryDetail page after creation
        navigate(`/entries/${response.data.id}`);
      })
      .catch(error => {
        console.error('Error creating entry:', error);
      });
  };

  return (
    <div className="create-entry-container">
      <h1 className="create-entry-title">Create a Diary Entry</h1>
      <form onSubmit={handleSubmit} className="create-entry-form">
        <div className="create-entry-date">
          <label>Date: {new Date().toLocaleDateString()}</label>
        </div>
        <div className="create-entry-textarea">
          <textarea
            value={entryText} 
            onChange={(e) => setEntryText(e.target.value)} 
            placeholder="Enter your diary entry here"
            required
          />
        </div>
        <div className="create-entry-submit">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default CreateEntry;
