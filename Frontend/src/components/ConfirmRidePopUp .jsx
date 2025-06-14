import React, { useState } from 'react';
import cute from '../assets/CuteGirl.jpg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ConfirmRidePopUp = (props) => {
  // Debug: log all received props
  console.log("Debug - ConfirmRidePopUp props:", props);

  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("Debug - Submitting ride confirmation with OTP:", otp);
    console.log("Debug - Ride ID:", props.ride?._id);

    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`, {
        params: {
          rideId: props.ride._id,
          otp: otp,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      
      console.log("Debug - Response from start-ride:", response.data);
      
      if (response.status === 200) {
        // Use the correct and consistent prop names.
        if (props.setConfirmRidePopUpPanel) {
          props.setConfirmRidePopUpPanel(false);
        } else {
          console.error("Debug - setConfirmRidePopUpPanel prop not provided.");
        }
        if (props.setRidePopupPanel) {
          props.setRidePopupPanel(false);
        } else {
          console.error("Debug - setRidePopupPanel prop not provided.");
        }
        navigate('/captain-riding', { state: { ride: props.ride } });
      }
    } catch (error) {
      console.error("Debug - Error confirming ride:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div>
      <h5 
        className='p-1 text-center w-[93%] absolute top-0'
        onClick={() => {
          // This button seems to be intended for toggling the panel; adjust as needed.
          if (props.setConfirmRidePopUpPanel) {
            props.setConfirmRidePopUpPanel(true);
          }
            else {
            console.error("Debug - setConfirmRidePopUpPanel prop not provided.");
          }
        }}
      >
        <i className="text-3xl text-gray-300 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className='text-2xl font-semibold mb-5'>Confirm Your Ride</h3>
      <div className='flex items-center justify-between p-3 bg-yellow-400 rounded-xl mt-4'>
        <div className='flex items-center gap-3'>
          <img className='h-10 w-10 rounded-full object-cover' src={cute} alt="User" />
          <h2 className='text-lg font-medium'>{props.ride?.user?.fullname?.firstname}</h2>
        </div>
        <h5 className='text-lg font-semibold'>2.2 km</h5>
      </div>
      <div className='flex justify-between flex-col items-center gap-2'>
        <div className='w-full mt-5'>
          <div className='flex items-center gap-5 border-b-2 p-3'>
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className='text-lg font-medium'>Renuka Orthopaedic Center</h3>
              <p className='text-sm -mt-1 text-gray-600'>{props.ride?.pickup}</p>
            </div>
          </div>
          <div className='flex items-center gap-5 border-b-2 p-3'>
            <i className="ri-map-pin-user-line"></i>
            <div>
              <h3 className='text-lg font-medium'>Renuka Orthopaedic Center</h3>
              <p className='text-sm -mt-1 text-gray-600'>{props.ride?.destination}</p>
            </div>
          </div>
          <div className='flex items-center gap-5 p-3'>
            <i className="ri-currency-fill"></i>
            <div>
              <h3 className='text-lg font-medium'>{props.ride?.fare}</h3>
              <p className='text-sm -mt-1 text-gray-600'>Cash, cash</p>
            </div>
          </div>
        </div>
        <div className='mt-6 w-full'>
          <form onSubmit={submitHandler}>
            <input 
              value={otp} 
              onChange={(e) => setOtp(e.target.value)} 
              type='text' 
              className='bg-[#eee] px-6 py-4 font-mono text-lg rounded-lg w-full mt-3'  
              placeholder='Enter OTP'
            />
            <button className='w-full bg-green-600 text-white font-semibold p-2 rounded-lg mt-5 flex justify-center'>
              Confirm
            </button>
            <button
              className='w-full bg-red-500 text-white font-semibold p-2 rounded-lg mt-2'
              onClick={() => {
                if (props.setConfirmRidePopUpPanel) {
                  props.setConfirmRidePopUpPanel(false);
                } else {
                  console.error("Debug - setConfirmRidePopUpPanel prop not provided.");
                }
                if (props.setRidePopupPanel) {
                  props.setRidePopupPanel(false);
                } else {
                  console.error("Debug - setRidePopupPanel prop not provided.");
                }
              }}
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRidePopUp;
