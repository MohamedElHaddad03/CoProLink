import React, { Suspense, lazy, useContext } from 'react';
import ProfileScreen from './Profile';
import DocumentsManager from './DocumentsManager';
import PaiementsManager from './PaiementsManager';
import { DepenseTest } from './DepTest';
import Statistics from './Statistics';  // Updated line
import SettingsScreen from './SettingsScreen';
import AddUserScreen from './usersTest';
import ContactSupport from './ContactSupport';
import ErrorBoundary from '../errorBoundry';
// import { Statistics } from './Statistics';
import LoginScreen from './Login';
import { useAuth } from '../Context/AuthContext';
import { Text, View } from 'react-native';
import CopropCreate from './CopropCreate';
import CreateSyndic from './CreateSyndic';

const LazyStatistics = () => {
  return (
    <Suspense fallback={<View><Text>Loading Statistics...</Text></View>}>
      <Statistics />
    </Suspense>
  );
};

const ControllerComponent = ({ selectedItem, setSelectedItem }) => {
  switch (selectedItem) {
    case 'Login':
      return <LoginScreen />
    case 'Depenses':
      return <DepenseTest />
    case 'Statistiques':
      return <LazyStatistics />;
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
     // return <SettingsScreen selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
     return <CreateSyndic/>
    default:
      return <LoginScreen />;
  }
};

export default ControllerComponent;
