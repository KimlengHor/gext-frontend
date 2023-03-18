import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import GroomerApi from '../apis/GroomerApi';

function PetForm(props) {

    const [pet] = useState(Object.assign({}, props.pet));
    const groomerApi = new GroomerApi();

    const updatePet = async () => {        
        console.log(pet);
        if (props.mode == 'add') {
            const message = await groomerApi.createPet(props.customerId, pet);
            console.log("The thing is", message);
            props.onClose();
            props.onUpdate(pet);
        } else {
            const message = await groomerApi.updatePet(pet.petId, pet);
            console.log("The thing is", message);
            props.onClose();
            props.onUpdate(pet);
        }
    };

    return (
        <div className="form-wrapper">
            <div className="edit-form-container">
                <h1 id="headline-title">{ props.mode == 'add' ? 'Add Pet' : 'Edit Pet' }</h1>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control placeholder="Enter name" defaultValue={pet.name} onChange={(event) => { 
                            pet.name = event.target.value
                        }} />
                    </Form.Group>
                
                    <Form.Group className="mb-3">
                        <Form.Label>Breed</Form.Label>
                        <Form.Control placeholder="Enter breed" defaultValue={pet.breed} onChange={(event) => { 
                            pet.breed = event.target.value;
                        }} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Gender</Form.Label>
                        <Form.Control placeholder="Enter gender" defaultValue={pet.gender} onChange={(event) => { 
                            pet.gender = event.target.value;
                        }} />
                    </Form.Group>
                </Form>
                <div className='bottom-top-pad-btn'>
                    <Button onClick={async() => await updatePet() } variant="primary">Save</Button> 
                    <Button id="secondary-button" onClick={props.onClose} variant="danger">Cancel</Button> 
                </div>
            </div>
        </div>
    );
}

export default PetForm;