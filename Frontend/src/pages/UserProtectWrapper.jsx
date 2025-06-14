import React , { useContext , useEffect , useState } from 'react';
import { UserDataContext} from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const UserProtectWrapper = ({children}) => {
    const token = localStorage.getItem('token')
    
    const navigate = useNavigate()
    const { user, setUser } = useContext(UserDataContext)  // Only destructure setCaptain if you're not using captain here
    const [isLoading, setIsLoading] = useState(true); 

    console.log(token)

    useEffect(()=>{
        if(!token){
            navigate('/UserLogin')
        }else{
            axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile` , {
                headers:{
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response)=>{
                if(response.status === 200){
                    setUser(response.data);
                    setIsLoading(false);
                }
            })
            .catch((err)=>{
                console.log(err);
                localStorage.removeItem('token');
                navigate('/UserLogin');
            });
        }
    } , [navigate , token , setUser]);

    if (isLoading) {
        return <div>Loading...</div>;  // Show loading until captain data is fetched
    }
  return (
    <>
        {children}
    </>
  )
}

export default UserProtectWrapper
