import React from 'react';
import cute from '../assets/CuteGirl.jpg';
const RidePopUp = (props) => {
  return (
    <div>
     <h5 className='p-1 text-center w-[93%] absolute top-0 ' onClick={()=>{
        props.setRidePopUpPanel(true);
        }}><i className=" text-3xl text-gray-300 ri-arrow-down-wide-line"></i></h5>
            <h3 className='text-2xl font-semibold mb-5 '>New Ride Available!</h3>
             <div className='flex items-center justify-between  p-3 bg-yellow-400 rounded-xl mt-4 '>
                <div className='flex items-center gap-3'>
                <img className = 'h-10 w-10 rounded-full object-cover'src = {cute}/>
                <h2 className='text-lg font-medium'>{props.ride?.user.fullname.firstname+ " " +props.ride?.user.fullname.lastname}</h2>
                </div>
                <h5 className='text-lg font-semibold'>2.2 km </h5>
             </div>
            <div className='flex justify-between flex-col items-center gap-2'>
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
                 <h3 className='text-lg font-medium'>₹{props.ride?.fare}</h3>
                 <p className='text-sm -mt-1 text-gray-600'>Cash , cash </p>
             </div>
             </div>
         </div>
             <div className='flex mt-5 w-full items-center justify-between'>
                <button className=' bg-green-600 text-white font-semibold p-3 px-10 rounded-lg mt-5'
                    onClick={()=>{
                        props.setConfirmRidePopUpPanel(true)
                        props.confirmRide()
                    }}>Accept</button>
                <button className=' bg-gray-300 text-black font-semibold p-3 px-10 rounded-lg mt-5'
                    onClick={()=>{
                        props.setRidePopUpPanel(false)
                }}
                >Ignore</button>
             </div>
         </div>
    </div>
  )
}

export default RidePopUp
