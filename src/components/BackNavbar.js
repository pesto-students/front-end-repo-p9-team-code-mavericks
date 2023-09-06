import React from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton } from "@mui/material";
import { useEffect, useState, useRef } from "react";

const BackNavbar = () => {

  const [isSticky, setIsSticky] = useState(true);
  const [prevScrollY, setPrevScrollY] = useState(0);
  const backRef = useRef('');

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > prevScrollY) {
      setIsSticky(false);
    } else {
      setIsSticky(true);
    }

    if (currentScrollY == 0) {
      backRef.current.style.position = 'sticky';
    }
    else {
      backRef.current.style.position = 'fixed';
    }

    setPrevScrollY(currentScrollY);
  };

  const goBack = () => {
    window.history.back();
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollY]);

  useEffect(() => {
    backRef.current.style.position = 'relative';
  }, []);

  return (
    <>
      <div
        ref = {backRef}
        style={{
          padding: '1%',
          zIndex: '100',
          transform: isSticky ? 'translateY(0%)' : 'translateY(-100%)',
          position: 'fixed',
          display: 'flex',
          alignItems: 'center',
          height: '6vh',
          width: '100vw',
          backgroundColor: 'orange',
          boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
          transition: 'transform 0.3s ease-in-out',
        }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <IconButton aria-label="go back" onClick={goBack}>
            <ArrowBackIcon style={{ color: 'white', fontSize: '3rem' }} />
          </IconButton>
        </div>
      </div>
    </>
  )
};

export default BackNavbar;