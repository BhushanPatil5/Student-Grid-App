import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Link } from "react-router-dom";




function App() {
  return (
      <div className="App">
        <header className="App-header">
          <p>
            <code> Welcome To Student Grid App</code>
          </p>

          <Link className="App-link" to="/student-grid">Click Here To Go Ahead</Link>
        </header>
      </div>
  );
}

export default App;
