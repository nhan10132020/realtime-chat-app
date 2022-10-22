import { UserAddOutlined } from '@ant-design/icons';
import { Avatar, Button, Form, Input, Tooltip } from 'antd';
import { formatRelative } from 'date-fns';
import React, { useContext, useMemo, useState } from 'react'
import styled from 'styled-components'
import { AppContext } from '../../context/AppProvider';
import { AuthContext } from '../../context/AuthProvider';
import { addDocument } from '../../firebase/services';
import useFirestore from '../../hooks/useFireStore';
import Message from './Message';

const DivStyled = styled.div`
    height: 100vh;
`;



const HeaderStyled = styled.div`
    display:flex;
    justify-content:space-between;
    height:56px;
    padding:0 16px;
    align-items:center;
    border-bottom: 1px solid rgb(230,230,230);

    .header__info{
        display:flex;
        flex-direction:column;
        justify-content:center;
    }
    .header__title{
        margin:0;
        font-weight:bold;
    }
    .header__description{
        font-size:12px;
    }
`;

const ButtonGroupStyled = styled.div`
    display:flex;
    align-item:center;
`;

const ContentStyled = styled.div`
    height: calc(100% - 56px);
    display:flex;
    flex-direction:column;
    padding:11px;
    justify-content:flex-end;
`;

const MesseageListStyled = styled.div`
    max-height:100%;
    overflow-y: auto;
`;

const FormStyled = styled(Form)`
    display:flex;
    justify-content:space-between;
    gap:4px;
    
    .ant-form-item{
        flex:1;
        margin:0;
        border-radius:5px;
    }
    
    .enterin{
        border-radius:12px;
    }
`;





const ChatWindow = () => {
    const {selectedRoomId,selectedRoom,members,setIsInviteMemberVisible} = React.useContext(AppContext);
    const {user:{uid,photoURL,displayName}}=useContext(AuthContext);
    const [inputValue,setInputValue]=useState('')
    
    const handleInputChange=(e)=>{
        setInputValue(e.target.value);
    }

    const handleOnSubmit=()=>{
        addDocument('messages',{
            text:inputValue,
            uid,
            photoURL,
            roomId: selectedRoomId,
            displayName
        })
        form.resetFields(['message']);
    }
    
    const [form] = Form.useForm();
    

    const condition=useMemo(()=>{
        return {
            fieldName:'roomId',
             operator: '==',
             compareValue:selectedRoomId
        }
    },[selectedRoomId]);
    const messages = useFirestore('messages',condition)
    

    

    return (
    <DivStyled>
        <HeaderStyled>
            <div className='header__info'>
                <p className='header__title'>{selectedRoom?.name}</p>
                <span className='header__description'>{selectedRoom?.description}</span>
            </div>
            <ButtonGroupStyled>
                <Button onClick={()=>{setIsInviteMemberVisible(true)}} type='text' icon={<UserAddOutlined/>}>Invite</Button>
                <Avatar.Group size="small" maxCount={2}>
                    {members.map((member)=>{
                        return (
                        <Tooltip title={member.displayName} key={member.uid}>
                            <Avatar src={member.photoURL}>{member.photoURL? '':member.displayName?member.displayName.charAt(0).toUpperCase():''}</Avatar>
                        </Tooltip>)
                    })}
                </Avatar.Group>
            </ButtonGroupStyled>
        </HeaderStyled>

        <ContentStyled>
            <MesseageListStyled>
                    {messages.map(message=>{
                        return <Message key={message.id} text={message.text} photoURL={message.photoURL} displayName={message.displayName} createdAt={message.createdAt}/>
                    })}
            </MesseageListStyled>
            <FormStyled form={form}>
                <Form.Item name='message'>
                    <Input onPressEnter={handleOnSubmit} onChange={handleInputChange} className='enterin' placeholder="...what's up"  autoComplete='off'/>
                </Form.Item>
                <Button onClick={handleOnSubmit} shape='round' type="primary">Send</Button>
            </FormStyled>
        </ContentStyled>
    </DivStyled>
  )
}

export default ChatWindow
// kiem tra thoi gian gui tin nhan
export function formatDate(seconds){
    let formattedDate = '';
    if(seconds){
        formattedDate = formatRelative(new Date(seconds * 1000), new Date());

        formattedDate = formattedDate.charAt(0).toUpperCase()+ formattedDate.slice(1);
    }

    return formattedDate
}