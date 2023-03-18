import React, { useContext, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import GroomerApi from '../apis/GroomerApi';
import { UserContext } from '../App';

function ServiceForm(props) {

    const [service] = useState(Object.assign({}, props.service));
    const { user } = useContext(UserContext);
    const groomerApi = new GroomerApi();

    const updateService = async () => {  
        console.log(service);
        if (props.mode == 'add') {
            const message = await groomerApi.createService(user.groomerId, service);
            console.log("The thing is", message);
            props.onClose();
            props.onUpdate(service);
        } else {
            const message = await groomerApi.updateService(service.serviceId, service);
            console.log("The thing is", message);
            props.onClose();
            props.onUpdate(service);
        }
    };

    return (
        <div className="form-wrapper">
            <div className="edit-form-container">
                <h1 id="headline-title">{ props.mode == 'add' ? 'Add Service' : 'Edit Service' }</h1>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control placeholder="Enter service name" defaultValue={service.name} onChange={(event) => { 
                            service.name = event.target.value
                        }} />
                    </Form.Group>
                
                    <Form.Group className="mb-3">
                        <Form.Label>Pricing</Form.Label>
                        <Form.Control placeholder="Enter pricing" defaultValue={service.pricing} onChange={(event) => { 
                            service.pricing = event.target.value;
                        }} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control placeholder="Enter description" defaultValue={service.description} onChange={(event) => { 
                            service.description = event.target.value;
                        }} />
                    </Form.Group>
                </Form>
                <div className='bottom-top-pad-btn'>
                    <Button onClick={async() => await updateService() } variant="primary">Save</Button> 
                    <Button id="secondary-button" onClick={props.onClose} variant="danger">Cancel</Button> 
                </div>
            </div>
        </div>
    );
}

export default ServiceForm;