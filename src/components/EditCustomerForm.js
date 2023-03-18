import React, { useContext, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import GroomerApi from '../apis/GroomerApi';
import { UserContext } from '../App';

function EditCustomerForm(props) {

    const [customer] = useState(Object.assign({}, props.customer));
    const { user } = useContext(UserContext);
    const groomerApi = new GroomerApi();

    const updateCustomer = async () => {        
        console.log(customer);
        if (props.mode == 'add') {
            const message = await groomerApi.createCustomer(user.groomerId, customer);
            console.log("The thing is", message);
            props.onClose();
            props.onUpdate(customer);
        } else {
            const message = await groomerApi.updateCustomer(customer.customerId, customer);
            console.log("The thing is", message);
            props.onClose();
            props.onUpdate(customer);
        }
    };

    return (
        <div className="form-wrapper">
            <div className="edit-form-container">
                <h1 id="headline-title">{ props.mode == 'add' ? 'Add customer' : 'Edit customer'}</h1>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>First name</Form.Label>
                        <Form.Control placeholder="Enter first name" defaultValue={customer.firstName} onChange={(event) => { 
                            customer.firstName = event.target.value
                        }} />
                    </Form.Group>
                
                    <Form.Group className="mb-3">
                        <Form.Label>Last name</Form.Label>
                        <Form.Control placeholder="Enter last name" defaultValue={customer.lastName} onChange={(event) => { 
                            customer.lastName = event.target.value;
                        }} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" defaultValue={customer.emailAddress} onChange={(event) => { 
                            customer.emailAddress = event.target.value;
                        }} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Phone number</Form.Label>
                        <Form.Control placeholder="Enter phone number" defaultValue={customer.phoneNumber} onChange={(event) => { 
                            customer.phoneNumber = event.target.value;
                        }} />
                    </Form.Group>
                </Form>
                <div className='bottom-top-pad-btn'>
                    <Button onClick={async() => await updateCustomer() } variant="primary">Save</Button> 
                    <Button id="secondary-button" onClick={props.onClose} variant="danger">Cancel</Button> 
                </div>
            </div>
        </div>
    );
}

export default EditCustomerForm;