import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import History from './components/History';

function App() {
  return (
    <Router>
      <nav>
        <a href="/">Dashboard</a> | <a href="/history">History</a>
      </nav>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </Router>
  );
}

export default App;
