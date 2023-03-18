import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { UserContext } from '../App';
import { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import {  signInWithEmailAndPassword   } from 'firebase/auth';

import '../App.css';

import GroomerApi from '../apis/GroomerApi';
import { auth } from '../firebase';

function LoginScreen() {

    const navigate = useNavigate();

    const groomerApi = new GroomerApi();
    const { setUser } = useContext(UserContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        signInWithEmailAndPassword(auth, email, password)
            .then(async (credential) => { 
                const user = credential.user;
                let groomer = await groomerApi.getGroomer(user.uid);
                setUser(groomer);
                navigate('/appointments');
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
            });
    };

    return (
        <div className="container-sm">
            <h1 id="headline-title">Welcome back GEXTer</h1>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={(event) => { 
                        setEmail(event.target.value);
                    }}/>
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={(event) => { 
                        setPassword(event.target.value);
                    }}/>
                </Form.Group>
                
                <div className="login-buttons">
                    <Button onClick={ async () => await handleLogin() } variant="primary">
                        Login
                    </Button>
                    <Button onClick={() => { 
                        navigate('/create-account');
                    }} id="secondary-button" variant="secondary">
                        Go to create account page
                    </Button>
                </div>
            </Form>
        </div>
  );
}

export default LoginScreen;