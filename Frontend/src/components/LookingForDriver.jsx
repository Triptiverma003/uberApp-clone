import React from 'react';
import toycar from '../assets/toyCar.jpg';

const LookingForDriver =(props) => {
  return (
    <div>
       <h5 className='p-1 text-center w-[93%] absolute top-0 '
           onClick={()=>{
               props.setVehicleFound(false)
           }}><i className=" text-3xl text-gray-300 ri-arrow-down-wide-line"></i></h5>
       <h3 className='text-2xl font-semibold mb-5 '>Looking for a driver.</h3>
       <div className='flex justify-between flex-col items-center gap-2'>
           <img className = 'h-24' src={toycar}/>
       <div className='w-full mt-5'>
           <div className='flex items-center gap-5 border-b-2 p-3'>
           <i className=" text-lg ri-map-pin-2-fill"></i>
           <div>
               <h3 className='text-lg font-medium'>Renuka Orthopaedic Center</h3>
               <p className='text-sm -mt-1 text-gray-600'>{props.pickup}</p>
           </div>
           </div>
   
           <div className='flex items-center gap-5 border-b-2 p-3'>
               <i className="ri-map-pin-user-line"></i>
           <div>
               <h3 className='text-lg font-medium'>Renuka Orthopaedic Center</h3>
               <p className='text-sm -mt-1 text-gray-600'>{props.destination}</p>
           </div>
           </div>
   
           <div className='flex items-center gap-5  p-3'>
               <i className="ri-currency-fill"></i>
           <div>
               <h3 className='text-lg font-medium'>₹{props.fare[props.vehicleType]}</h3>
               <p className='text-sm -mt-1 text-gray-600'>Cash , cash </p>
            </div>
           </div>
        </div>
    </div>
    </div>
  )
}

export default LookingForDriver
