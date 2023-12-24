import React, { useState} from 'react'; 


const Person = ({ person }) => {

  const bubbleColors = ['#ffb1b1', '#86a697', '#4e4eff', '#3590ae', '#FF00FF', '#00e6e6'];
  const color = bubbleColors[Math.floor(Math.random() * bubbleColors.length)];
  const styles = {
      container: {
        width: '80px',
        height: '80px',
        backgroundColor: color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        margin: '10px',
        cursor: 'pointer',
        transition: 'transform 0.3s ease',
        animation: 'float 6s ease-in-out infinite',
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
        opacity: 0.8
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