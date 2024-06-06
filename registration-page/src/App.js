import React from 'react';
import './App.css';
import Register from './registerPage/Register';
import Login from './loginPage/Login'; // Import the Login component

function App() {
  return (
    <div className="App">
      {/* Render the Register and Login components */}
      <Register />
      <Login />
    </div>
  );
}

export default App;
