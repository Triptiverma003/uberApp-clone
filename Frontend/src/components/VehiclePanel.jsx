import React from 'react';
import toycar from '../assets/toyCar.jpg';
import ubermoto from '../assets/Uber-Moto.webp';
import uberauto from '../assets/uber-auto.webp';

const   VehiclePanel = (props) => {
  // Log the fare object to verify that it's being passed correctly
  console.log('VehiclePanel fare:', props.fare);
  
  // Destructure fare values with a fallback default
  const { car = 0, moto = 0, auto = 0 } = props.fare || {};

  return (
    <div>
      <h5 
        className='p-1 text-center w-[93%] absolute top-0'
        onClick={() => props.setVehiclePanel(false)}
      >
        <i className="text-3xl text-gray-300 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className='text-2xl font-semibold mb-5'>Choose a vehicle</h3>
      
      {/* UberGo */}
      <div 
        onClick={() => {
          props.setConfirmRidePanel(true)
          props.selectVehicle('car')}}
        className='flex border-2 active:border-black mb-2 w-full p-3 rounded-xl items-center justify-between'
      >
        <img className='h-12' src={toycar} alt="UberGo" />
        <div className='w-1/2'>
          <h4 className='font-medium text-lg'>
            UberGo <span><i className="ri-user-fill">4</i></span>
          </h4>
          <h5 className='font-medium text-sm'>2 mins away</h5>
          <p className='font-medium text-xs'>Affordable, compact rides</p>
        </div>
        <h2 className='text-lg font-semibold'>₹{car ? car : 'N/A'}</h2>
      </div>
      
      {/* Moto */}
      <div 
        onClick={() => {
        props.setConfirmRidePanel(true)
        props.selectVehicle('moto')
        }}
        className='flex border-2 active:border-black w-full p-3 rounded-xl items-center justify-between'
      >
        <img className='h-10' src={ubermoto} alt="Moto" />
        <div className='w-1/2'>
          <h4 className='font-medium text-lg'>
            Moto <span><i className="ri-user-fill"></i> 1</span>
          </h4>
          <h5 className='font-medium text-sm'>3 mins away</h5>
          <p className='font-medium text-xs'>Affordable, motorcycle rides</p>
        </div>
        <h2 className='text-lg font-semibold'>₹{moto ? moto : 'N/A'}</h2>
      </div>
      
      {/* UberAuto */}
      <div 
        onClick={() => {
        props.setConfirmRidePanel(true)
        props.selectVehicle('auto')
        }}
        className='flex border-2 active:border-black w-full p-3 rounded-xl items-center justify-between'
      >
        <img className='h-10' src={uberauto} alt="UberAuto" />
        <div className='w-1/2'>
          <h4 className='font-medium text-lg'>
            UberAuto <span><i className="ri-user-fill"></i> 3</span>
          </h4>
          <h5 className='font-medium text-sm'>5 mins away</h5>
          <p className='font-medium text-xs pb-3'>Affordable, compact rides</p>
        </div>
        <h2 className='text-lg font-semibold'>₹{auto ? auto : 'N/A'}</h2>
      </div>
    </div>
  );
};

export default VehiclePanel;
