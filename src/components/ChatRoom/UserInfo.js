import { Avatar, Button, Typography } from 'antd'
import React, { useEffect } from 'react'
import styled from 'styled-components'
import { AuthContext } from '../../context/AuthProvider';
import { auth, db } from '../../firebase/config';

const WrapperStyled = styled.div`
    display:flex;
    justify-content:space-between;
    padding:12px 16px;
    border-bottom: 1px solid rgba(82,38,83);

    .username{
        margin-left:5px;
    }
`;


const UserInfo = () => {

    const {user:{
        displayName,
        photoURL
    }} = React.useContext(AuthContext);
    
  return (
    <WrapperStyled>
    <div>
        <Avatar src={photoURL}>{photoURL?'':displayName?displayName.charAt(0).toUpperCase():''}</Avatar>
        <Typography.Text className='username'>{displayName}</Typography.Text>
    </div>
    <Button 
    onClick={()=>{
        auth.signOut();
    }} 
    type='primary'  
    shape='round' 
    danger >
        Log Out
    </Button>
    </WrapperStyled>
  )
}

export default UserInfo