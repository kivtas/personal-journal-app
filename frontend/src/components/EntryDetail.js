import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './EntryDetail.css'; // Import the corresponding CSS file for this component

function EntryDetail() {
  const { id } = useParams(); // Get the entry ID from the route params
  const [entry, setEntry] = useState(null);
  const [error, setError] = useState(null);
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    axios.get(`${backendUrl}/api/entries/${id}`)
      .then(response => {
        setEntry(response.data);
      })
      .catch(error => {
        console.error('Error fetching entry details:', error);
        setError('Error fetching entry details');
      });
  }, [id]);

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (!entry) {
    return <p>Loading...</p>;
  }

  return (
    <div className="entry-detail-container">
      <h1 className="entry-detail-title">Entry Details</h1>
      <div className="entry-detail-content">
        <p><strong>Date:</strong> {new Date(entry.timestamp).toLocaleDateString()}</p>
        <p><strong>Content:</strong> {entry.content}</p>
        <p><strong>Sentiment:</strong> {entry.sentiment}</p>
      </div>
    </div>
  );
}

export default EntryDetail;
