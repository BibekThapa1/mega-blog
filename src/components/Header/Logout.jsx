import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth';
import {useNavigate} from "react-router-dom"
import { logout as storeLogout } from '../../store/authSlice';
import Button from '../Button';

const Logout = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   async  function logout(){
    navigate("/")

    await authService.logout()
    .then(()=>{
        dispatch(storeLogout());
    })
   }


  return (
    <div>
       <Button 
       className='m-3 duration-200 hover:bg-blue-100 text-xl rounded-full	'
       onClick={()=>{
        logout();

       }}       
       >Logout</Button>
    </div>
  )
}

export default Logout