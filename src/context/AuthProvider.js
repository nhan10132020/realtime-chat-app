import { Spin } from 'antd';
import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { auth } from '../firebase/config';

export const AuthContext = React.createContext();

const AuthProvider = ({children}) => {
    const[user,setUser]= useState({});
    const [isLoading,setIsLoading]=useState(true);
    const navigate= useNavigate();
    useEffect(()=>{
        const unSubcrised=auth.onAuthStateChanged((user)=>{
            if(user){
                const {displayName,email,uid,photoURL}=user;
                setUser({displayName,email,uid,photoURL});
                setIsLoading(false);
                navigate('/');
            }
            else{
                setIsLoading(false);
                navigate('/login')
            }
        })
        

        //cleaned function
        return ()=>{
            unSubcrised();
        }
    },[navigate])
    
    return (
        <AuthContext.Provider value={{user}}>
            {isLoading?<Spin/> : children}
        </AuthContext.Provider>
       
    )
}

export default AuthProvider