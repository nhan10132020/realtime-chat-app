import Login from './components/Login/Login';
import ChatRoom from './components/ChatRoom/ChatRoom';
import {Routes,Route} from'react-router-dom';
import AuthProvider from './context/AuthProvider';
import AppProvider from './context/AppProvider';
import AddRoomModal from './components/Modals/AddRoomModal';
import InviteMemberModal from './components/Modals/InviteMemberModal';
function App() {
  return (
    <AuthProvider>
        <AppProvider>
          <Routes>
            <Route path='/login' element={<Login/>}/>
            <Route path='/' element={<ChatRoom/>}/>
          </Routes>
          <AddRoomModal/>
          <InviteMemberModal/>
        </AppProvider>
    </AuthProvider>
  );
}

export default App;
