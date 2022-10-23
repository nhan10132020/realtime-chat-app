import React, { useContext } from 'react'
import './chatRoom.css';
import {Row,Col } from 'antd'
import Sidebar from './Sidebar'
import ChatWindow from './ChatWindow'
import { AppContext } from '../../context/AppProvider';
const ChatRoom = () => {
  const {isSidebarVisible,setIsSidebarVisible} = useContext(AppContext);
  return (
    // <Row>
    //     <Col span={6}><Sidebar/></Col>
    //     <Col span={18}><ChatWindow/></Col>
    // </Row>
    <>
    {
      isSidebarVisible
      ?
    <div className='chatroom__content'>
        <div className='chatroom__content__sidebar'><Sidebar/></div>
        {window.innerWidth>=500?<div className='chatroom__content__chatWindow'><ChatWindow/></div>:<div/>}
    </div>
      :
      <div className='chatroom__content__close'>
        <div className='chatroom__content__sidebar'><Sidebar/></div>
        <div className='chatroom__content__chatWindow'><ChatWindow/></div>
    </div>
    }
    </>
  )
}

export default ChatRoom