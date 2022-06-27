import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import RoutesComponent from './routes/RoutesComponent.jsx';

const App = () => {
  return (
    <main className="App">
      <BrowserRouter>
        <RoutesComponent />
      </BrowserRouter>
    </main>
  );
};

export default App;
