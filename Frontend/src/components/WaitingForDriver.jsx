import React from 'react';
import toycar from '../assets/toyCar.jpg';

const WaitingForDriver = (props) => {
  return (
   <div>
          <h5 className='p-1 text-center w-[93%] absolute top-0 ' onClick={()=>{props.waitingForDriver(false)}}>
          <i className=" text-3xl text-gray-300 ri-arrow-down-wide-line"></i></h5>
          <div className='flex items-center justify-between'>
            <img className = 'h-14' src = {toycar}/>
            <div className='text-right'>
                <h2 className='text-lg font-medium'>{props.ride?.captain.fullname.firstname}</h2>
                <h4 className='text-lg font-semibold -mb-1 -mt-1'>{props.ride?.captain.vehicle.plate}</h4>
                <p className='text-sm text-gray-600'>Maruti Suzuki Alto</p>
                <h1 className='text-lg font-semibold'>{props.ride?.otp}</h1>
            </div>
          </div>
            <div className='w-full mt-5'>
              <div className='flex items-center gap-5 border-b-2 p-3'>
              <i className=" text-lg ri-map-pin-2-fill"></i>
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
      
              <div className='flex items-center gap-5  p-3'>
                  <i className="ri-currency-fill"></i>
              <div>
                  <h3 className='text-lg font-medium'>{props.ride?.fare}</h3>
                  <p className='text-sm -mt-1 text-gray-600'>Cash , cash </p>
               </div>
              </div>
           </div>
       </div>
  )
}

export default WaitingForDriver
