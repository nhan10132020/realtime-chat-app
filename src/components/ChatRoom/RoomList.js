import React, { useContext } from 'react'
import { Button, Collapse, Typography } from 'antd'
import styled from 'styled-components';
import {PlusSquareOutlined} from '@ant-design/icons'
import useFirestore from '../../hooks/useFireStore';
import { AuthContext } from '../../context/AuthProvider';
import { AppContext } from '../../context/AppProvider';
const {Panel} = Collapse;

const PanelStyled = styled(Panel)`
    &&&{
        position:relative;
        .ant-collapse-content-box {
            padding: 0 ;
        }
        
        .addroom{
            color:black;
            padding:0;
            margin-left:40px;
            opacity:0.5;
            font-size:12px;
            
            
        }
        .addroom:hover{
           opacity:1;
        }
        .ant-collapse-header{
            backGround:#FFE3E1;
        }
        .ant-typography:hover{
            background-color:white;
            color:black;
        }
    }
`;

const LinkStyled = styled(Typography.Link)`
    &&{
    display:block;
    padding: 5px 40px;
    margin-bottom:5px;
    color:white;
    }
`;

const RoomList = () => {
    const {rooms,setVisible,setSelectedRoomId,setIsSidebarVisible} = React.useContext(AppContext)
    
    const handleAddRoom=()=>{
        setVisible(true);
    }

    function handleRoomClick(room){
        setSelectedRoomId(room.id);
        if(window.innerWidth<=500){
        setIsSidebarVisible(false)
        }
    }

  return (
    <Collapse ghost defaultActiveKey={['1']}>
        <PanelStyled  header="List of room" key={1}>
            {
                rooms?.map(room=>{
                    return <LinkStyled onClick={()=>{handleRoomClick(room)}} key={room.id} strong italic>{room.name}</LinkStyled>
                })
            }
            <Button onClick={handleAddRoom} className='addroom' type='text' icon={<PlusSquareOutlined/>}>Add</Button>
        </PanelStyled>
    </Collapse>
  )
}

export default RoomList