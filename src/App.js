import React from 'react';
import './App.css';

import Main from './components/Main'
import About from './components/AboutPage'

function App() {
  return (
    <div className="App">
      <Main />
      <About />
      <div className="footer"></div>
    </div>
  );
}

export default App;
