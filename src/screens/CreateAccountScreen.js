import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../App.css';
import {  createUserWithEmailAndPassword   } from 'firebase/auth';
import { auth } from '../firebase';
import { useState } from 'react';
import GroomerApi from '../apis/GroomerApi';
import { useNavigate } from "react-router-dom";

function CreateAccountScreen() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const groomerApi = new GroomerApi()

    const navigate = useNavigate();

    const createUser = async () => {
        await createUserWithEmailAndPassword(auth, email, password)
            .then(async (credentail) => { 
                await groomerApi.createGroomer({
                    email: email,
                    firstName: firstName,
                    lastName: lastName,
                    authId: credentail.user.uid,
                })
                    .then((message) => { 
                        console.log(message);
                        navigate('/');
                    })
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });
    };

    return (
        <div className="container-sm">
            <h1 id="headline-title">Welcome to GEXT</h1>
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

                <Form.Group className="mb-3">
                    <Form.Label>First name</Form.Label>
                    <Form.Control placeholder="Enter first name" onChange={(event) => { 
                        setFirstName(event.target.value);
                    }}/>
                </Form.Group>
                
                <Form.Group className="mb-3">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control placeholder="Enter last name" onChange={(event) => { 
                        setLastName(event.target.value);
                    }}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword" onChange={(event) => { 
                    setPassword(event.target.value);
                }}>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                
                <div className="login-buttons">
                    <Button onClick={async () => { 
                        await createUser()
                    }} variant="primary">
                        Create Account
                    </Button>
                    {/* <Button id="secondary-button" variant="secondary" type="submit">
                        Go to login page
                    </Button> */}
                </div>
            </Form>
        </div>
  );
}

export default CreateAccountScreen;