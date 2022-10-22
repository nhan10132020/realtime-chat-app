import React from 'react'
import {Form, Modal,Input} from 'antd'
import { AppContext } from '../../context/AppProvider'
import { AuthContext } from '../../context/AuthProvider';
import { addDocument } from '../../firebase/services';

const AddRoomModal = () => {
    const {visible,setVisible}= React.useContext(AppContext);
    const {user:{uid}}=React.useContext(AuthContext);
    //getData from Form tag
    //this is form hook, add this to form tag and this will get the value
    //when click ok this will be return an object when use method form.getFieldValue() with field: name(on Form.Item) and value is what u write in input
    const [form] = Form.useForm();

    
    const handleCancel =()=>{
        //unvisible modal
        setVisible(false)

        //resetForm
        form.resetFields();
    }

    const handleOk=()=>{
        //logic add new room to firestore database
        addDocument('rooms',{
            ...form.getFieldValue(),
            members:[uid]
        })

        //resetForm
        form.resetFields();
        setVisible(false)
    }

  return (
    <Modal
    title="Add New Room"
    open={visible}
    onOk={handleOk}
    onCancel={handleCancel}
    >
        <Form form={form} layout="vertical">
            <Form.Item label="Room's name" name='name' rules={[{
                required:true,
                message:"Please enter your room's name"
            }]}>
                <Input placeholder="Enter name ..."></Input>
            </Form.Item>
            <Form.Item label="Room's description" name='description'>
                <Input.TextArea placeholder="Enter description ..."></Input.TextArea>
            </Form.Item>
        </Form>
    </Modal>
  )
}

export default AddRoomModal