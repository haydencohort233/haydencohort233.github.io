import React, { useState, useEffect, useRef } from 'react';
import styles from './DesktopIcon.module.css';

const DesktopIcon = ({ icon, label, onClick }) => {
  const [isHighlighted, setIsHighlighted] = useState(false);
  const iconRef = useRef(null);
  const clickTimeoutRef = useRef(null);

  const handleSingleClick = () => {
    setIsHighlighted(true);
  };

  const handleDoubleClick = () => {
    onClick();
    setIsHighlighted(false); // Optionally remove highlight after opening
  };

  const handleClick = () => {
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
      clickTimeoutRef.current = null;
      handleDoubleClick();
    } else {
      clickTimeoutRef.current = setTimeout(() => {
        handleSingleClick();
        clickTimeoutRef.current = null;
      }, 200); // 200ms delay to differentiate between single and double-click
    }
  };

  // Remove highlight when clicking outside of the icon
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (iconRef.current && !iconRef.current.contains(event.target)) {
        setIsHighlighted(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={iconRef}
      className={`${styles.desktopIconContainer} ${isHighlighted ? styles.highlighted : ''}`}
      onClick={handleClick}
    >
      <div className={styles.iconContainer}>
        <img src={icon} alt={label} className={styles.iconImage} />
        <p className={styles.iconLabel}>{label}</p>
      </div>
    </div>
  );
};

export default DesktopIcon;
