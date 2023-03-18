import { format, parseISO } from 'date-fns';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Calendar } from 'react-calendar';
import TimePicker from 'react-time-picker';
import GroomerApi from '../apis/GroomerApi';
import { UserContext } from '../App';
import Addon from '../models/addon';
import Customer from '../models/customer';
import Pet from '../models/pet';
import Service from '../models/service';

function AppointmentForm(props) {

    const { user } = useContext(UserContext);
    const groomerApi = new GroomerApi();

    const [customers, setCustomers] = useState([]);
    const [pets, setPets] = useState([]);
    const [services, setServices] = useState([]);
    const [addons, setAddons] = useState([]);
    const [shown, setShown] = useState(false);
    const [timeShown, setTimeShown] = useState(false);
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState('');

    const [selectedPetId, setSelectedPetId] = useState(null);
    const [selectedServices, setSelectedServices] = useState([]);
    const [selectedAddons, setSelectedAddons] = useState([]);

    const getCustomers = async () => {
        const customers = await groomerApi.getCustomers(user.groomerId);
        setCustomers(customers);
    };

    const getPets = async (customerId) => {
        const pets = await groomerApi.getPets(customerId);
        setPets(pets);
    };

    const getServices = async () => {
        const data = await groomerApi.getServices(user.groomerId);
        setServices(data);
    };

    const getAddons = async () => {
        const data = await groomerApi.getAddons(user.groomerId);
        setAddons(data);
    };

    const createAppointment = async () => {   
        console.log(selectedPetId);
        const message = await groomerApi.createAppointment(user.groomerId, selectedPetId, {
            date: format(parseISO(date.toISOString()), 'yyyy-MM-dd ' + time),
                // "2023-03-17 11:30:00",
            services: selectedServices,
            addons: selectedAddons,
        });
        console.log("The thing is", message);
        props.onClose();
        props.onUpdate(message);
    };

    useEffect(() => { 
        getCustomers();
        getServices();
        getAddons();
    }, [])

    return (
        <div className="form-wrapper">
            <div className="edit-form-container">
                <h1 id="headline-title">Create an appointment</h1>

                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Date: { format(parseISO(date.toISOString()), 'MMM dd, yyyy') }</Form.Label>
                        {shown == true ? <div className="calendar-view">
                            <Calendar onChange={async (date) => {
                                setShown(false);
                                setDate(date);
                            }} />
                        </div> : null}
                        <Button onClick={() => { 
                            setShown(!shown);
                        }} id="secondary-button" variant="outline-success">
                            Change date
                        </Button>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Time: { time }</Form.Label>
                        {timeShown == true ? <div>
                            <TimePicker disableClock={true} onChange={async (time) => {
                                setTimeShown(false);
                                setTime(time);
                            }} />
                        </div> : null}
                        <Button onClick={() => { 
                            setTimeShown(!timeShown);
                        }} id="secondary-button" variant="outline-success">
                            Change time
                        </Button>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Customers:</Form.Label>
                        <Form.Select aria-label="Default select example" onChange={async (event) => { 
                            const customerId = event.currentTarget.value;
                            await getPets(customerId);
                        }}>
                        <option>Select a customer</option>
                        {customers.map((customerData) => { 
                            const customer = new Customer(customerData);
                            const customerName = customer.firstName + ' ' + customer.lastName;
                            return (
                                <option key={customer.customerId} value={customer.customerId}> {customerName}</option>
                            );
                        })}
                        </Form.Select>
                    </Form.Group >
                        
                    {pets.length > 0 ? <Form.Group className="mb-3">
                        <Form.Label>Pets:</Form.Label>
                        <Form.Select aria-label="Default select example" onChange={ async (event) => { 
                            const petId = event.currentTarget.value;
                            setSelectedPetId(petId);
                        }}>
                            <option>Select a pet</option>
                            {pets.map((petData) => { 
                                const pet = new Pet(petData);
                                return (
                                    <option key={pet.petId} value={pet.petId}> {pet.name}</option>
                                );
                            })}
                        </Form.Select> 
                    </Form.Group> : null}

                    <Form.Group className="mb-3">
                        <Form.Label>Services:</Form.Label>
                        {selectedServices.map((serviceData) => {
                            const service = new Service(serviceData);
                            return (
                                <h6 key={ service.serviceId }>- { service.name }</h6>
                            )
                        }) }
                        <Form.Select aria-label="Default select example" onChange={(event) => { 
                            const serviceId = event.currentTarget.value;
                            const filteredServices = services.filter(service => service.service_id == serviceId);

                            setSelectedServices([...selectedServices, filteredServices[0]]);
                        }}>
                            <option>Select services</option>
                            {services.map((serviceData) => { 
                                const service = new Service(serviceData);
                                return (
                                    <option key={service.serviceId} value={service.serviceId}> {service.name}</option>
                                );
                            })}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Add-ons:</Form.Label>
                        {selectedAddons.map((addonData) => {
                            const addon = new Addon(addonData);
                            return (
                                <h6 key={ addon.addonId }>- { addon.name }</h6>
                            )
                        }) }
                        <Form.Select aria-label="Default select example" onChange={(event) => { 
                            const addonId = event.currentTarget.value;
                            const filteredAddons = addons.filter(addon => addon.addon_id == addonId);

                            setSelectedAddons([...selectedAddons, filteredAddons[0]]);
                        }}>
                            <option>Select addons</option>
                            {addons.map((addonData) => { 
                                const addon = new Addon(addonData);
                                return (
                                    <option key={addon.addonId} value={addon.addonId}> {addon.name}</option>
                                );
                            })}
                        </Form.Select>
                    </Form.Group>
                </Form>
                
                <div className='bottom-top-pad-btn'>
                    <Button onClick={async () => await createAppointment()} variant="primary">Create</Button> 
                    <Button id="secondary-button" onClick={props.onClose} variant="danger">Cancel</Button> 
                </div>
            </div>
        </div>
    );
}

export default AppointmentForm;