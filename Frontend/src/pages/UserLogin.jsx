import {React , useState , useContext } from 'react'
import { Link, Navigate, useNavigate} from 'react-router-dom'
import {UserDataContext} from '../contexts/UserContext'
import axios from 'axios'

const UserLogin = () => {
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [userData , setUserData] = useState({});

    const {user , setUser} = useContext(UserDataContext)
    const navigate = useNavigate()

    const submitHandler =async(e)=>{
        e.preventDefault();
        const userData = {
            email : email,
            password : password
        }
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login` , userData);
        if(response.status === 200){
            const data = response.data
            setUser(data.user)
            localStorage.setItem('token' , data.token)
            navigate('/home')
        }
        setEmail('');
        setPassword('');
    }
  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
        <div>
        <img className='w-16 mb-10' src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Uber_logo_2018.png/1200px-Uber_logo_2018.png'/> 
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
        <p className='text-center'>New here ? <Link to = '/UserSignup' className='text-blue-600'> Create New Account</Link></p>
        </form>
        </div>
        <div>
           <Link to = '/Captain-Login'
           className='bg-[#10b461] flex items-center justify-center rounded font-semibold mb-5 px-4 py-2 w-full text-lg placeholde:text-base text-white'>Sign in as Captain</Link>
        </div>
    </div>
  )
}

export default UserLogin
