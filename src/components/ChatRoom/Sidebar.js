import { Col, Row } from 'antd'
import React, { useContext } from 'react'
import RoomList from './RoomList'
import UserInfo from './UserInfo'
import styled from 'styled-components'
import { AppContext } from '../../context/AppProvider'

const SidebarStyled = styled.div`
    background: linear-gradient(#F6D4D8,#F4C5D2);
    color:white;
    height: 100vh;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    position:relative;
    
`;

const ArrowsCustoms = styled.div`
position:absolute;
top:50%;
left:calc(100% - 30px);
width: 0;
height: 0;
border-top: 15px solid transparent;
border-right: 30px solid #FFECEF;
border-bottom: 15px solid transparent;
opacity:0.6;
:hover{
  opacity:1;
  cursor:pointer;
}

`;

const ArrowCustomsOpen = styled.div`
position:absolute;
top:50%;
left:calc(100% - 30px);
width: 0;
height: 0;
border-top: 15px solid transparent;
border-left: 30px solid #FFECEF;
border-bottom: 15px solid transparent;
opacity:0.6;
:hover{
  opacity:1;
  cursor:pointer;
}
`

const Sidebar = () => {
  const {isSidebarVisible,setIsSidebarVisible} = useContext(AppContext);


  return (
    <SidebarStyled>
      {
        isSidebarVisible
        ?
      <Row>
          <Col span={24}><UserInfo/></Col>
          <Col span={24}><RoomList/></Col>
      </Row>
      : 
      ''
      }
    {isSidebarVisible?<ArrowsCustoms onClick={()=>{setIsSidebarVisible(false)}}></ArrowsCustoms>:<ArrowCustomsOpen onClick={()=>{setIsSidebarVisible(true)}}/>}
    </SidebarStyled>
  )
}

export default Sidebar