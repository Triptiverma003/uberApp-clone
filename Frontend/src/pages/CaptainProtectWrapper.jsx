import React, { useContext, useEffect, useState } from 'react';
import { CaptainDataContext } from '../contexts/CaptainContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CaptainProtectWrapper = ({ children }) => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const { captain, setCaptain } = useContext(CaptainDataContext)  // Only destructure setCaptain if you're not using captain here
  const [isLoading, setIsLoading] = useState(true);  // Initialize loading state

  console.log(token);

  useEffect(() => {
    if (!token) {
        navigate('/Captain-Login');
    } else {
        axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
            if (response.status === 200) {
                //console.log("✅ Captain data received in ProtectWrapper:", response.data);
                setCaptain(response.data.captain);
                setIsLoading(false);
            }
        })
        .catch((err) => {
            console.error("❌ Error fetching captain profile:", err);
            localStorage.removeItem('token');
            navigate('/captain-login');
        });
    }
}, [token]);


  if (isLoading) {
    return <div>Loading...</div>;  // Show loading until captain data is fetched
  }

  return (
    <>
      {children}  {/* Render children if data is ready */}
    </>
  );
};

export default CaptainProtectWrapper;
