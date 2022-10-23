import React,{useState} from 'react';
import useFirestore from '../hooks/useFireStore';
import { AuthContext } from './AuthProvider';
export const AppContext = React.createContext()

export default function AppProvider({children}){
//The code bellow handle visible of sidebar;
    const[isSidebarVisible,setIsSidebarVisible]= useState(true);

//The code bellow handle visible ann unvisible cua modal
    const[visible,setVisible]=useState(false);

    

//The code bellow handle visible ann unvisible cua modal
    const[isInviteMemberVisible,setIsInviteMemberVisible]=useState(false);


//The code bellow use to select the room
    const [selectedRoomId,setSelectedRoomId]=useState('')

//The code bellow handle hien thi rooms user dang co

    //get userUID
    const {user:{
        uid
    }}= React.useContext(AuthContext);

    
    //neu ta truyền thẳng roomsCondition(một object) vào useFireStore ở biến rooms, mỗi lần component này bị re-render lại thì sẽ tạo ra một object mới
    // mà trong useFireStore ta để dependencies là roomConditions, vì vậy useFireStore sẽ bị re-render không cần thiết
    // đó là lí do dùng useMemo
    const roomsCondition = React.useMemo(() => {
        return {
          fieldName: 'members',
          operator: 'array-contains',
          compareValue: uid,
        };
    }, [uid]);
    
    
    const rooms = useFirestore('rooms', roomsCondition);
    // cau truc cua 1 documents room
    /*
    {
        name: ' room name'
        description:' nsdjkflsadf'
        members:[uid1,uid2]
    }
    */

//find room that user selected
    const selectedRoom =React.useMemo(()=>{return rooms.find((room)=>{
        return (room.id === selectedRoomId);
    })||{}},[rooms,selectedRoomId])



//The code bellow show that find members who are in the selected room
    const usersCondition = React.useMemo(() => {
        return {
        fieldName: 'uid',
        operator: 'in',
        compareValue: selectedRoom.members,
        };
    }, [selectedRoom.members]);

    const members = useFirestore('users',usersCondition)


    return(
        <AppContext.Provider value={{rooms,members,visible,setVisible,selectedRoomId,setSelectedRoomId,selectedRoom,isInviteMemberVisible,setIsInviteMemberVisible,isSidebarVisible,setIsSidebarVisible}}>
            {children}
        </AppContext.Provider>
    )
}