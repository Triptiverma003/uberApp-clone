import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const CaptainDataContext = createContext();

const CaptainContext = ({ children }) => {
    const [captain, setCaptain] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCaptain = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error(" No token found. Redirecting...");
                    setIsLoading(false);
                    return;
                }
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
    
                //console.log(response.data);
                const captainData = response.data?.captain ?? response.data;
                if (!captainData?._id) {
                    throw new Error("Invalid captain data received");
                }
                // console.log("✅ Storing Captain Data:", captainData);
                setCaptain(captainData);
            } catch (err) {
                console.error(" Error fetching captain data:", err.message);
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };
    
        fetchCaptain();
    }, []);
    
    const updateCaptain = (captainData) => {
        //console.log("🔄 Updating Captain Data in Context:", captainData);
        setCaptain(captainData);
    };

    //console.log("🔥 CaptainContext.Provider Rendering:", { captain, isLoading, error });

    useEffect(() => {
        //console.log("🔥 Updating Captain State:", captain);
    }, [captain]);

    return (
        <CaptainDataContext.Provider value={{ captain, setCaptain, isLoading, error, updateCaptain }}>
            {children}
        </CaptainDataContext.Provider>
    );
};

export default CaptainContext;
