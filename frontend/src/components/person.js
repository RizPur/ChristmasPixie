import React, { useState, useEffect } from 'react';

const Person = ({ person }) => {
    const styles = {
      container: {
        width: '100px',
        height: '100px',
        backgroundColor: '#f0f0f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        margin: '10px',
        cursor: 'pointer',
        transition: 'transform 0.3s ease',
      },
      name: {
        opacity: 0,
        transition: 'opacity 0.3s ease',
        fontSize: '14px',
        textAlign: 'center'
      },
      containerHover: {
        transform: 'scale(1.1)'
      },
      nameHover: {
        opacity: 1
      }
    };
  
    const [hover, setHover] = useState(false);
  
    return (
      <div 
        style={{ 
          ...styles.container, 
          ...(hover ? styles.containerHover : {}) 
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <span style={{ 
          ...styles.name, 
          ...(hover ? styles.nameHover : {}) 
        }}>
          {person.name}
        </span>
      </div>
    );
  };

  export default Person;