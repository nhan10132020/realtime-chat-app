import React, { useContext, useState } from 'react'
import {Form, Modal, Select, Spin,Avatar} from 'antd'
import AppProvider, { AppContext } from '../../context/AppProvider'
import debounce from 'lodash/debounce'
import { db } from '../../firebase/config';
import { collection ,query,where,orderBy,limit,getDocs} from 'firebase/firestore';
import { doc ,updateDoc} from 'firebase/firestore';
//a debounce component help us don't waste memory to search, sau khi chúng ta dừng lại việc nhập khoảng thời gian debounceTimeOut thì mới bắt đầu thực hiện callback
function DebounceSelect({fetchOptions,debounceTimeout=300,...props}){


    const [fetching,setFetching]= useState(false);
    const [options,setOptions] = useState([])

    const debounceFetcher = React.useMemo(()=>{
        const loadOptions = (value)=>{
            setOptions([]);
            setFetching(true);

            fetchOptions(value,props.curMembers).then(newOptions=>{
                setOptions(newOptions);
                setFetching(false);
            })
        }
        return debounce(loadOptions,debounceTimeout);
    },[debounceTimeout,fetchOptions])

    return(
        <Select
        labelInValue
        filterOption={false}
        onSearch={debounceFetcher}
        notFoundContent={fetching? <Spin size='small'/>:null}
        options={options}
        {...props}
        >
            {
            /*
                options: [{label:displayName,value:uid,photoURL},{label:displayName,value:uid,photoURL}},.. ]
                
            */
            }
        </Select>
    )
}


const fetchUserList = async(search,curMembers)=>{
    
    return await getDocs(query(collection(db,'users'),where('keywords','array-contains',search),orderBy('displayName'),limit(25)))
        .then(snapshot=>{
            return snapshot.docs.map(doc=>{
                return{
                    label:doc.data().displayName,
                    value:doc.data().uid,
                    photoURL: doc.data().photoURL
                }
            }).filter(opt=>!(curMembers.includes(opt.value)))
        })
}



const InviteMemberModal = () => {
    const {selectedRoomId,selectedRoom} = useContext(AppContext);
    const {isInviteMemberVisible,setIsInviteMemberVisible}= React.useContext(AppContext);
    const[value,setValue]=useState([])
    //getData from Form tag
    //this is form hook, add this to form tag and this will get the value
    //when click ok this will be return an object when use method form.getFieldValue() with field: name(on Form.Item) and value is what u write in input
    const [form] = Form.useForm();

    
    const handleCancel =()=>{
        form.resetFields();
        setIsInviteMemberVisible(false)
    }

    const handleOk=()=>{
        form.resetFields();
        // update fields member [array] in collection rooms
        const roomRef = doc(db,'rooms',selectedRoomId);
        updateDoc(roomRef,{
            members: [...selectedRoom.members,...value.map(val=>val.value)]
        })
        setIsInviteMemberVisible(false)
    }

  return (
    setIsInviteMemberVisible&&<Modal
    title="Add new member"
    open={isInviteMemberVisible}
    onOk={handleOk}
    onCancel={handleCancel}
    >
        <Form form={form} layout="vertical">
            <DebounceSelect
                mode="multiple"
                label="Member's name"
                value={value}
                placeholder="Enter Member's name ..."
                fetchOptions={fetchUserList}
                onChange={newValue=>{setValue(newValue)}}
                style={{width:'100%'}}
                curMembers={selectedRoom.members}
            />

        </Form>
    </Modal>
  )
}

export default InviteMemberModal