import React from 'react';
import ProfileScreen from './Profile';
import DocumentsManager from './DocumentsManager';
import PaiementsManager from './PaiementsManager';

const ControllerComponent = ({ selectedItem }) => {


    switch (selectedItem) {
    case 'Profile':
      return <ProfileScreen />;
    case 'Documents':
      return <DocumentsManager />;
    case 'Paiement':
      return <PaiementsManager />;
    default:
      return null; 
  }
};

export default ControllerComponent;
