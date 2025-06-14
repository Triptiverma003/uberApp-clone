import React, { useRef, useState } from 'react'
import uberlogo from '../assets/Uber-Logo.png'
import map from '../assets/UberMap.gif'
import { Link , useLocation } from 'react-router-dom'
import FinishRide from '../components/FinishRide'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import LiveTracking from '../components/LiveTracking'

const CaptainRiding = () => {
const [finishRidePanel, setFinishRidePanel] = useState(false)
const finishRidePanelRef = useRef(null)
const location = useLocation()
const rideData = location.state?.ride
useGSAP(function () {
    if (finishRidePanel) {
        gsap.to(finishRidePanelRef.current, {
            transform: 'translateY(0)'
        })
      } else {
        gsap.to(finishRidePanelRef.current, {
            transform: 'translateY(100%)'
        })
    }}, [ finishRidePanel ])
  return (
        
        <div className='h-screen relative flex flex-col justify-end'>
        <div className='fixed p-3 top-0 flex items-center justify-between w-full'>
            <img className='w-16' src={uberlogo} alt='Uber Logo' />
            <Link to='/home' className='fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
            <i className='text-lg font-medium ri-logout-box-line'></i>
            </Link>
        </div>
        <div className='h-1/5 p-4 bg-yellow-400 flex items-center justify-between relative'>
            <h5 className='p-1 text-center w-[95%] absolute top-0 ' onClick={()=>{
                setFinishRidePanel(true)
            }}><i className=" text-3xl text-black-300 ri-arrow-up-wide-line"></i></h5>
            <h4 className='text-xl font-semibold'>4 km away</h4>
            <button className=' bg-green-600 text-white font-semibold p-3 px-10 rounded-lg mt-5'>Complete Ride</button>
        </div>
        <div  ref = {finishRidePanelRef} className='fixed w-full z-10 bottom-0 bg-white p-3 py-6 pt-10 translate-y-full h-screen'>
            <FinishRide 
             ride = {rideData}
            setFinishRidePanel = {setFinishRidePanel}/>
      </div>
      <div className='h-screen fixed w-screen top-0 z-[-1]'>
           <LiveTracking/>
        </div>
    </div>
  )
}

export default CaptainRiding
