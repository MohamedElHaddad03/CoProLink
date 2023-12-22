import React from 'react';
import ProfileScreen from './Profile';
import DocumentsManager from './DocumentsManager';
import PaiementsManager from './PaiementsManager';
import { Depense } from './Depense';
import  SettingsScreen from './SettingsScreen';
import AddUserScreen from './UsersManagement';
import ContactSupport from './ContactSupport';

const ControllerComponent = ({  selectedItem, setSelectedItem }) => {


    switch (selectedItem) {
    case 'Depenses' :
      return <Depense />
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
      return <SettingsScreen  selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
    default:
      return null; 
  }
};

export default ControllerComponent;
