import {useState} from 'react'
import {Link} from 'react-router-dom' 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import React ,{useContext} from 'react'
import { CaptainDataContext } from '../contexts/CaptainContext';
import UserLogin from './UserLogin';


const CaptainLogin =() => {
    
const [email , setEmail] = useState('');
const [password , setPassword] = useState('');
const {captain , setCaptain} = React.useContext(CaptainDataContext)
const navigate = useNavigate()


const submitHandler = async(e)=>{
    e.preventDefault();
    const captain = {
        email:email,
        password,
    }
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captain)
    if(response.status === 200){
        const data = response.data
        setCaptain(data.captain)
        localStorage.setItem('token' , data.token)
        navigate('/captain-home')
    }
    setEmail('')
    setPassword('')
}
  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
        <div>
        <img className='w-20 mb-2' src = 'https://www.svgrepo.com/show/505031/uber-driver.svg'/> 
        <form onSubmit={(e)=>{
            submitHandler(e)
        }}>
        <h3 className='text-lg font-medium mb-2'>What's your email</h3>
        <input 
        //styling is being added
        className='bg-[#eeee]
        mb-7 rounded px-4 border w-full text-lg
        placeholder:text-base'
        required type='email' 
        placeholder='example@example.com'
        value = {email}
        onChange={(e)=>{
            setEmail(e.target.value)
        }}
        />
        <h3 className='text-lg font-medium mb-4'>Enter Password</h3>
        <input 
        required type = 'password'
        value = {password}
        onChange={(password)=>{
            setPassword(password.target.value)
        }}
        //styling is being added
        className='bg-[#eeee] mb-7 rounded px-4 border w-full text-lg placeholder:text-base'
        placeholder='example@example.com'/>
        <button className='bg-black text-white font-semibold mb-3 px-4 rounded py-2 w-full text-lg placeholder:text-base'>Login</button>
        <p className='text-center'>Want To Join ? <Link to = '/Captain-Signup' className='text-blue-600'> Register as a captain</Link></p>
        </form>
        </div>
        <div>
           <Link to = '/UserLogin'
           className='bg-[#d5622d] flex items-center justify-center rounded font-semibold mb-5 px-4 py-2 w-full text-lg placeholde:text-base text-white'>Sign in as User</Link>
        </div>
    </div>
  )
}

export default CaptainLogin
