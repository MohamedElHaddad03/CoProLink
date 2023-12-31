// App.js or your root component
import React from 'react';
import { AuthProvider } from './Context/AuthContext';
import MainScreen from './mainScreen'; // Your main component

const App = () => {
  return (
    <AuthProvider>
      <MainScreen />
    </AuthProvider>
  );
};

export default App;
