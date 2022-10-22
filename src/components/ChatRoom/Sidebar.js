import { Col, Row } from 'antd'
import React from 'react'
import RoomList from './RoomList'
import UserInfo from './UserInfo'
import styled from 'styled-components'


const SidebarStyled = styled.div`
    background: linear-gradient(#F6D4D8,#F4C5D2);
    color:white;
    height: 100vh;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
`;

const Sidebar = () => {
  return (
    <SidebarStyled>
    <Row>
        <Col span={24}><UserInfo/></Col>
        <Col span={24}><RoomList/></Col>
    </Row>
    </SidebarStyled>
  )
}

export default Sidebar