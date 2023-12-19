import React from 'react';
import ProfileScreen from './Profile';
import DocumentsManager from './DocumentsManager';
// Other imports as needed

const ControllerComponent = ({ selectedItem }) => {


    switch (selectedItem) {
    case 'Profile':
      return <ProfileScreen />;
    case 'Documents':
      return <DocumentsManager />;
    default:
      return null; 
  }
};

export default ControllerComponent;
