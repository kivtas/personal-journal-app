import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Homepage from './components/Homepage';
import Entries from './components/Entries';
import EntryDetail from './components/EntryDetail';
import CreateEntry from './components/CreateEntry';
import Trends from './components/Trends';
import './App.css';  // Import the CSS for App.js

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/">Homepage</Link></li>
          <li><Link to="/entries">Entries</Link></li>
          <li><Link to="/trends">Trends</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/entries" element={<Entries />} />
        <Route path="/entries/:id" element={<EntryDetail />} />
        <Route path="/create_entry" element={<CreateEntry />} />
        <Route path="/trends" element={<Trends />} />
      </Routes>
    </Router>
  );
}

export default App;
