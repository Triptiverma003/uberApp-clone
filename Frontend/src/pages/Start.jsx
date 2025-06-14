import React from 'react';
import {Link} from 'react-router-dom'
const Start = () => {
  return (
    <div>
        <div className='h-screen pt-8 flex justify-between flex-col  w-full bg-cover bg-center bg-[url(https://images.pexels.com/photos/11060589/pexels-photo-11060589.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)]'>
        <img className = 'w-16 ml-8' src='https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Uber_logo_2018.png/1200px-Uber_logo_2018.png'/>
            <div  className='bg-white py-5 px-4 pb-7'>
            <h2 className='text-3xl font-bold'>Get Started With Uber</h2>
            <Link to = '/UserLogin' className=' flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5'>Continue</Link>
            </div>
        </div>
    </div>
  );
};

export default Start;
