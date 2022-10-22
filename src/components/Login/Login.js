import React from 'react'
import {Row,Col,Typography,Button} from 'antd'
import firebase,{auth,db} from '../../firebase/config'
import { getAuth, signInWithPopup, FacebookAuthProvider } from "firebase/auth";
import { addDocument, generateKeywords } from '../../firebase/services';


const {Title}= Typography;
const fbProvider =  new FacebookAuthProvider();

const Login = () => {

    const handleFbLogin = async ()=>{
      const {user,_tokenResponse}= await signInWithPopup(auth, fbProvider);
        if(_tokenResponse.isNewUser){
            addDocument('users',{
                displayName: user.displayName,
                keywords: generateKeywords(user.displayName),
                email: user.email,
                photoURL: user.photoURL,
                uid: user.uid,
                providerId: user.uid
            })
        }
    }

    return (
        <div>
            <Row justify='center' style={{height:800}}>
                <Col span={8}>
                    <Title style={{textAlign:'center'}} level={3}>Core Teams chat</Title>
                    <Button style={{width:'100%',marginBottom: 5}}>
                        Login with Google
                    </Button>
                    <Button style={{width:'100%'}} onClick={handleFbLogin}>
                        Login with Facebook
                    </Button>
                </Col>
            </Row>
        </div>
    )
}

export default Login
