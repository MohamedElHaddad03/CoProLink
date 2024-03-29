import React, { Suspense, lazy, useContext } from 'react';
import ProfileScreen from './Profile';
import DocumentsManager from './DocumentsManager';
import PaiementsManager from './PaiementsManager';
import { DepenseTest } from './DepTest';
import Statistics from './Statistics';  // Updated line
import SettingsScreen from './SettingsScreen';
import AddUserScreen from './usersTest';
import ContactSupport from './ContactSupport';
// import { Statistics } from './Statistics';
import LoginScreen from './Login';
import { useAuth } from '../Context/AuthContext';
import { Text, View } from 'react-native';
import CopropCreate from './CopropCreate';
import CreateSyndic from './CreateSyndic';
import UserStatistics from './UserStatistics';

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
      return <AddUserScreen />
    case 'ContactSupport':
      return <ContactSupport />
    case 'Settings':
      return <SettingsScreen selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
    // return <CreateSyndic/>
    case 'Coprop':
      return <CopropCreate ></CopropCreate>
    case 'Syndic':
      return <CreateSyndic ></CreateSyndic>
    case 'UserStatistics':
      return <UserStatistics ></UserStatistics>
    default:
      return <LoginScreen />;
  }
};

export default ControllerComponent;
