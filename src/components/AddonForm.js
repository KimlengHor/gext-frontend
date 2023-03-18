import React, { useContext, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import GroomerApi from '../apis/GroomerApi';
import { UserContext } from '../App';

function AddonForm(props) {

    const [addon] = useState(Object.assign({}, props.addon));
    const { user } = useContext(UserContext);
    const groomerApi = new GroomerApi();

    const updateAddon = async () => {        
        console.log(addon);
        if (props.mode == 'add') {
            const message = await groomerApi.createAddon(user.groomerId, addon);
            console.log("The thing is", message);
            props.onClose();
            props.onUpdate(addon);
        } else {
            const message = await groomerApi.updateAddon(addon.addonId, addon);
            console.log("The thing is", message);
            props.onClose();
            props.onUpdate(addon);
        }
    };

    return (
        <div className="form-wrapper">
            <div className="edit-form-container">
                <h1 id="headline-title">{ props.mode == 'add' ? 'Add Addon' : 'Edit Addon' }</h1>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control placeholder="Enter service name" defaultValue={addon.name} onChange={(event) => { 
                            addon.name = event.target.value
                        }} />
                    </Form.Group>
                
                    <Form.Group className="mb-3">
                        <Form.Label>Pricing</Form.Label>
                        <Form.Control placeholder="Enter pricing" defaultValue={addon.pricing} onChange={(event) => { 
                            addon.pricing = event.target.value;
                        }} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control placeholder="Enter description" defaultValue={addon.description} onChange={(event) => { 
                            addon.description = event.target.value;
                        }} />
                    </Form.Group>
                </Form>
                <div className='bottom-top-pad-btn'>
                    <Button onClick={async() => await updateAddon() } variant="primary">Save</Button> 
                    <Button id="secondary-button" onClick={props.onClose} variant="danger">Cancel</Button> 
                </div>
            </div>
        </div>
    );
}

export default AddonForm;