import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth';
import { logout } from '../../store/authSlice';
import Button from '../Button';

const Logout = () => {
   const dispatch = useDispatch();
   async  function logout(){
    await authService.logout()
    .then(()=>{
        dispatch(logout())
    })
   }


  return (
    <div>
       <Button 
       className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
       onClick={logout}       
       >Logout</Button>
    </div>
  )
}

export default Logout