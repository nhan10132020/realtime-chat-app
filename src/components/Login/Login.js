import React from 'react'
import {auth} from '../../firebase/config'
import {  signInWithPopup, FacebookAuthProvider } from "firebase/auth";
import { addDocument, generateKeywords } from '../../firebase/services';
import './login.css'
import { FacebookFilled,GoogleCircleFilled } from '@ant-design/icons';



const fbProvider =  new FacebookAuthProvider();

const Login = () => {

    const handleFbLogin = async ()=>{
      const {user,_tokenResponse}= await signInWithPopup(auth, fbProvider);
        if(_tokenResponse.isNewUser){
            addDocument('users',{
                displayName: user.displayName,
                keywords: generateKeywords(user.displayName),
                email: user.email,
                photoURL: user.photoURL,
                uid: user.uid,
                providerId: user.uid
            })
        }
    }

    return (
        <div className='box'>
            <div className='content__login'>
                <h2 className='content__name title'>Teams Chat</h2>
                <div className='content__buttons ' style={{marginBottom:'0.6rem'}}>
                    <button onClick={handleFbLogin} className='content__button content__button__facebook' style={{border:0}}><FacebookFilled style={{color:'white', marginRight:'10px', fontSize:'1rem'}}/><span style={{color:'white'}}>Continue with <span style={{fontWeight:'800'}}>Facebook</span></span></button>
                </div>
                <div className='content__buttons '>
                    <button className='content__button content__button__google' style={{border:0}}><GoogleCircleFilled style={{color:'white', marginRight:'10px', fontSize:'1rem'}}/><span style={{color:'white'}}>Continue with <span style={{fontWeight:'800'}}>Google</span></span></button>
                </div>
            </div>
        </div>
    )
}

export default Login
