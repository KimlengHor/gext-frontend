import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import GroomerApi from '../apis/GroomerApi';

function EditUserForm(props) {

    const [groomer] = useState(Object.assign({}, props.user));
    const groomerApi = new GroomerApi();

    const updateGroomer = async () => {        
        console.log(groomer);
        const message = await groomerApi.updateGroomer(groomer.authId, groomer);
        console.log("The thing is", message);
        props.onClose();
        props.onUpdate(groomer);
    };

    return (
        <div className="form-wrapper">
            <div className="edit-form-container">
                <h1 id="headline-title">Edit profile</h1>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>First name</Form.Label>
                        <Form.Control placeholder="Enter first name" defaultValue={groomer.firstName} onChange={(event) => { 
                            groomer.firstName = event.target.value
                        }} />
                    </Form.Group>
                
                    <Form.Group className="mb-3">
                        <Form.Label>Last name</Form.Label>
                        <Form.Control placeholder="Enter last name" defaultValue={groomer.lastName} onChange={(event) => { 
                            groomer.lastName = event.target.value;
                        }} />
                    </Form.Group>
                </Form>
                <div className='bottom-top-pad-btn'>
                    <Button onClick={async() => await updateGroomer() } variant="primary">Save</Button> 
                    <Button id="secondary-button" onClick={props.onClose} variant="danger">Cancel</Button> 
                </div>
            </div>
        </div>
    );
}

export default EditUserForm;