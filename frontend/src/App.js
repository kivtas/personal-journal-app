import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Update Switch to Routes and import Route correctly
import Homepage from './components/Homepage';
import Entries from './components/Entries';

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li><a href="/">Homepage</a></li>
          <li><a href="/entries">Entries</a></li>
          <li><a href="/trends">Trends</a></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/entries" element={<Entries />} />
      </Routes>
    </Router>
  );
}

export default App;
