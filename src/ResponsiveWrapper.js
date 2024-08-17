import React, { useState, useEffect } from 'react';
import Mobile from './Mobile';
import App from './App';

const ResponsiveWrapper = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      {isMobile ? <Mobile /> : <App />}
    </>
  );
};

export default ResponsiveWrapper;
