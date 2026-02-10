import React from 'react';

const Header = ({ title }) => {
  return (
    <header style={{ 
      padding: '1rem', 
      backgroundColor: '#667eea', 
      color: 'white',
      marginBottom: '2rem'
    }}>
      <h2>{title || 'Panel Agente'}</h2>
    </header>
  );
};

export default Header;
