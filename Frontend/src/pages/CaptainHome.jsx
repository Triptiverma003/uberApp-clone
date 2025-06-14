import uberlogo from '../assets/Uber-Logo.png'
import map from '../assets/UberMap.gif'

import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import CaptainDetails from '../components/CaptainDetails'
import RidePopUp from '../components/RidePopUp'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ConfirmRidePopUp from '../components/ConfirmRidePopUp '
import { useEffect, useContext } from 'react'
import { SocketContext } from '../contexts/SocketContext'
import { CaptainDataContext } from '../contexts/CaptainContext'
import axios from 'axios'

const CaptainHome = () => {
  const [ridePopUpPanel, setRidePopUpPanel] = useState(false);
  const [ConfirmridePopUpPanel, setConfirmridePopUpPanel] = useState(false);

  const ridePopUpPanelRef = useRef(null);
  const ConfirmridePopUpPanelRef = useRef(null);
  const [ride, setRide] = useState(null);

  const { socket } = useContext(SocketContext);
  const { captain } = useContext(CaptainDataContext);

  // Only emit socket events if captain data is available
  useEffect(() => {
  if (captain && captain._id) {
    console.log("Captain defined, sending join event:", captain._id);
    socket.emit("join", {
      userId: captain._id,
      userType: "captain"
    });

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            socket.emit("update-location-captain", {
              userId: captain._id,
              location: {
                lng: position.coords.longitude, // or use 'lat' if backend expects that
                ltd: position.coords.latitude
              }
            });
          },
          (error) => {
            console.error("Error obtaining location:", error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };

    // Update location immediately, then every 10 seconds.
    updateLocation();
    const locationInterval = setInterval(updateLocation, 10000);

    //return () => clearInterval(locationInterval);
  } else {
    console.error("Captain is not defined or missing _id:", captain);
  }
}, [socket, captain]);

  socket.on('new-ride', (data) => {
    console.log(data);
     setRide(data)
    setRidePopUpPanel(true)

})

async function confirmRide() {

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {

        rideId: ride._id,
        captainId: captain._id,


    }, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })

    setRidePopUpPanel(false)
    setConfirmridePopUpPanel(true)

}

  useGSAP(function () {
    if (ridePopUpPanel) {
        gsap.to(ridePopUpPanelRef.current, {
            transform: 'translateY(0)'
        })
      } else {
        gsap.to(ridePopUpPanelRef.current, {
            transform: 'translateY(100%)'
        })
    }}, [ ridePopUpPanel ])

    useGSAP(function () {
      if (ConfirmridePopUpPanel) {
          gsap.to(ConfirmridePopUpPanelRef.current, {
              transform: 'translateY(0)'
          })
        } else {
          gsap.to(ConfirmridePopUpPanelRef.current, {
              transform: 'translateY(100%)'
          })
      }}, [ConfirmridePopUpPanel])

  return (
    <div className='h-screen'>
      <div className='fixed p-3 top-0 flex items-center justify-between w-full'>
        <img className='w-16' src={uberlogo} alt='Uber Logo' />
        <Link to='/home' className='fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
          <i className='text-lg font-medium ri-logout-box-line'></i>
        </Link>
      </div>
      <div className='h-3/5 p-6'>
        <img className='h-full w-full object-cover' src={map} alt='Map' />
      </div>
      <div className='h-2/5 p-4'>
        <CaptainDetails/>
      </div>
      <div  ref = {ridePopUpPanelRef} className='fixed w-full z-10 bottom-0 bg-white p-3 py-6 pt-10 translate-y-full'>
        <RidePopUp 
        ride = {ride}
        setRidePopUpPanel = {setRidePopUpPanel}  
        setConfirmRidePopUpPanel = {setConfirmridePopUpPanel}
        confirmRide={confirmRide}
        />
      </div>
      <div  ref = {ConfirmridePopUpPanelRef} className='fixed w-full z-10 bottom-0 bg-white p-3 py-6 pt-10 translate-y-full h-screen'>
        <ConfirmRidePopUp 
        ride = {ride}
        setConfirmridePopUpPanel = {setConfirmridePopUpPanel} 
        setRidePopUpPanel = {setRidePopUpPanel}/>
      </div>
    </div>
  );
};

export default CaptainHome;
