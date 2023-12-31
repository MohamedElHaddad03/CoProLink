import React, { useContext } from 'react';
import ProfileScreen from './Profile';
import DocumentsManager from './DocumentsManager';
import PaiementsManager from './PaiementsManager';
import { DepenseTest } from './DepTest';
import SettingsScreen from './SettingsScreen';
import AddUserScreen from './usersTest';
import ContactSupport from './ContactSupport';
import ErrorBoundary from '../errorBoundry';
import { Statistics } from './Statistics';
import LoginScreen from './Login';
import { useAuth } from '../Context/AuthContext';
const ControllerComponent = ({ selectedItem, setSelectedItem }) => {

  // const { user } = useAuth();

  // // Check if the user is authenticated
  // const isAuthenticated = !!user;

  // // Function to render the appropriate screen based on authentication status

  //   if (selectedItem === 'Login') {
  //     return <LoginScreen />;
  //   }

  //   // Check if the user is authenticated before rendering certain screens
  //   if (!isAuthenticated) {
  //     return <LoginScreen />;
  //   }

  switch (selectedItem) {
    case 'Login':
      return<LoginScreen/>
    case 'Depenses':
      return <DepenseTest />
    case 'Statistiques':
      return <Statistics />
    case 'Profile':
      return <ProfileScreen />
    case 'Documents':
      return <DocumentsManager />
    case 'Paiement':
      return <PaiementsManager />
    case 'AddUser':
      return (<ErrorBoundary><AddUserScreen /></ErrorBoundary>)
    case 'ContactSupport':
      return <ContactSupport />
    case 'Settings':
      return <SettingsScreen selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
    default:
      return <LoginScreen />;
  }
};

export default ControllerComponent;
