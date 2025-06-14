import React, { useState } from 'react'
import { Link , useNavigate} from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../contexts/UserContext';
const UserSignup = () => {
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')
    const [firstname , setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [userData , setUserData] = useState('')

    const navigate = useNavigate()

    const {user , setUser} = React.useContext(UserDataContext )

    const submitHandler = async(e) =>{
        e.preventDefault()
        const newUser = {
            fullname:{
                firstname:firstname,
                lastname:lastname
            },
            email:email,
            password:password
        }

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser)
        if(response.status === 201){
           const data = response.data
           setUser(data.user)
           localStorage.setItem('token' , data.token)
            navigate('/home')
        }
        setEmail('')
        setPassword('')
        setFirstname('')
        setLastname('')
    }

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
        <div>
        <img className='w-16 mb-10' src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Uber_logo_2018.png/1200px-Uber_logo_2018.png'/> 
        <form onSubmit={(e)=>{
            submitHandler(e)
        }}>
        <h3 className='text-lg font-medium mb-6'>What's your name</h3>
        <div className='flex gap-4 mb-5' >
        <input 
        //styling is being added
        className='bg-[#eeee]
        rounded px-4 border  text-lg
        placeholder:text-base w-1/2'
        required type='text' 
        placeholder='Firstname'
        value = {firstname}
        onChange={(e)=>{
            setFirstname(e.target.value)
        }}
        />
        <input 
        //styling is being added
        className='bg-[#eeee]
        rounded px-4 border  text-lg
        placeholder:text-base w-1/2'
        required type='text' 
        placeholder='Lastname'
        value = {lastname}
        onChange={(e)=>{
            setLastname(e.target.value)
        }}
        />
        </div>

        <h3 className='text-lg font-medium mb-6'>What's your email</h3>
        <input 
        //styling is being added
        className='bg-[#eeee]
        mb-5 rounded px-4 border w-full text-lg
        placeholder:text-base'
        required type='email' 
        placeholder='example@example.com'
        value = {email}
        onChange={(e)=>{
            setEmail(e.target.value)
        }}
        />
        <h3 className='text-lg font-medium mb-6'>Enter Password</h3>
        <input 
        required type = 'password'
        //styling is being added
        className='bg-[#eeee] mb-5 rounded px-4 border w-full text-lg placeholder:text-base'
        placeholder='example@example.com'
        value = {password}
        onChange={(e)=>{
            setPassword(e.target.value)
        }}
        />
        <button className='bg-black text-white font-semibold mb-3 px-4 rounded py-2 w-full text-lg placeholder:text-sm'>Register</button>
        <p className='text-center'>Already have an account ?<Link to = '/UserLogin' className='text-blue-600'> Login</Link></p>
        </form>
        </div>
        <div>
          <p className='text-[10px] leading-tight'>This site is protected by reCaptcha and the <span className='underline'>Google Policy</span> and <span className='underline'>Terms Of Services</span></p>
        </div>
    </div>
  )
}

export default UserSignup
