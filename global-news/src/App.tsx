import React from 'react';
import AppRouter from './router';
import { BrowserRouter } from 'react-router-dom'
import './App.css'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppRouter></AppRouter>
      </BrowserRouter>
    </div>
  );
}

export default App;
