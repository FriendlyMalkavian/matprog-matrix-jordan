import React from 'react';
import MatrixInput from './Components/MatrixInput';
import testMatrix from './vault/testMatrix';

import './App.css';

function App() {
  const data = testMatrix[1];
  return (
    <div className="App">
      <MatrixInput></MatrixInput>
    </div>
  );
}

export default App;
