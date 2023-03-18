import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useLocation, useNavigate } from 'react-router-dom';
import Popup from 'reactjs-popup';
import GroomerApi from '../apis/GroomerApi';
import EditCustomerForm from '../components/EditCustomerForm';
import PetForm from '../components/PetForm';
import Customer from '../models/customer';
import Pet from '../models/pet';

function CustomerDetailScreen() {

    const [customer, setCustomer] = useState(null);
    const [pets, setPets] = useState([]);
    const { state } = useLocation();
    const navigate = useNavigate();

    const groomerApi = new GroomerApi();

    const getCustomerDetail = async () => {
        const details = await groomerApi.getCustomerDetail(state.customerId);
        const customer = new Customer(details.customer)
        setCustomer(customer);
        setPets(details.pets);
    };

    const removePet = async (petId) => { 
        const message = await groomerApi.removePet(petId);
        console.log(message);
        await getCustomerDetail();
    }

    const removeCustomer = async () => { 
        const message = await groomerApi.removeCustomer(customer.customerId);
        console.log(message);
        navigate(-1);
    }

    useEffect(() => { 
        getCustomerDetail()
    }, [])

    return (
        <div className='container'>
            <h1 id="headline-title">Customer Detail</h1>
            <h6>Name: { customer?.firstName + " " + customer?.lastName }</h6>
            <h6>Email: { customer?.emailAddress }</h6>
            <h6>Phone number: {customer?.phoneNumber}</h6>
           
            <Popup trigger={<div className='bottom-top-pad-btn'> <Button variant="primary">Edit customer</Button> </div>} position="center center">
                {close => (
                    <EditCustomerForm customer={ customer } onUpdate={ 
                        (customer) => { 
                            setCustomer(customer);
                        }
                    } onClose={ close }></EditCustomerForm>
                )}
            </Popup>
            <div className='bottom-top-pad-btn'>
                <Button onClick={async () => await removeCustomer()} variant="outline-danger">Remove customer</Button>
            </div>
            
            <h3 id="headline-title">Pets:</h3>
            <div className="card-list">
                {pets.map((petData) => { 
                    var pet = new Pet(petData)
                    return (
                        <Card key={ pet.petId } style={{ width: '16rem' }}>
                            <Card.Body>
                                <Card.Title>{ pet.name }</Card.Title>
                                <div>Breed: { pet.breed }</div> 
                                <div>Gender: {pet.gender}</div>
                                <Popup trigger={<div className='bottom-top-pad-btn'> <Button variant="outline-primary">Edit pet</Button> </div>} position="center center">
                                    {close => (
                                        <PetForm pet={ pet } onUpdate={ 
                                            async (updatedPet) => {
                                                console.log(updatedPet);
                                              await getCustomerDetail();
                                            }
                                        } onClose={ close }></PetForm>
                                    )}
                                </Popup>
                                <div className = "pet-list-buttons">
                                    {/* <Button variant="primary">Edit pet</Button>       */}
                                    <Button onClick={async () => await removePet(pet.petId)} id="secondary-button" variant="outline-danger">Remove pet</Button>      
                                </div>  
                            </Card.Body>
                        </Card>
                    )
                })}
            </div>
            <Popup trigger={<div className='bottom-top-pad-btn'><Button variant="primary">Add a Pet</Button></div>} position="bottom">
                {close => (
                    <PetForm customerId={ state.customerId } mode="add" onUpdate={ 
                        async (pet) => { 
                            console.log(pet)
                            await getCustomerDetail();
                        }
                    } onClose={ close }></PetForm>
                )}
            </Popup>
        </div>
    );
}

export default CustomerDetailScreen;