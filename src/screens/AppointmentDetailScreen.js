import { format, parseISO } from 'date-fns';
import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { useLocation } from 'react-router-dom';
import GroomerApi from '../apis/GroomerApi';
import AppointmentDetails from '../models/appointmentDetails';
import ServiceSnapshot from '../models/serviceSnapshot';

function AppointmentDetailScreen() {

    const { state } = useLocation();
    const { appointmentId } = state;

    const [appointment, setAppointment] = useState(null);
    const [pet, setPet] = useState(null);
    const [customer, setCustomer] = useState(null);
    const [services, setServices] = useState([]);
    const [addons, setAddons] = useState([]);

    const groomerApi = new GroomerApi();

    const getAppointmentDetail = async () => {
        const data = await groomerApi.getAppointmentDetail(appointmentId);
        const appointmentDetails = new AppointmentDetails(data)
        setAppointment(appointmentDetails.appointment)
        setCustomer(appointmentDetails.customer);
        setPet(appointmentDetails.pet);
        setServices(appointmentDetails.services);
        setAddons(appointmentDetails.addons);
    };

    useEffect(() => {
        getAppointmentDetail()
    }, [])

    return (
        <div className='container'>
            <h1 id="headline-title">Appointment Detail</h1>
            
            {appointment != null ? <div>
                    <h3 id="headline-title">Appointment:</h3>
                    <h6>Date: { format(parseISO(appointment.date), 'MMM dd, yyyy') }</h6>
                    <h6>Time: { format(parseISO(appointment.date), 'hh:mm a') }</h6>
                </div> : null
            }
            
            <div className="section-wrapper">
                <h3 id="headline-title">Pet:</h3>
                <h6>Name: { pet?.name }</h6>
                <h6>Breed: { pet?.breed }</h6>
                <h6>Gender: {pet?.gender === 'm' ? 'Boy' : 'Girl'}</h6>
            </div>
            
            <div className="section-wrapper">
                <h3 id="headline-title">Customer:</h3>
                <h6>Name: { customer?.firstName + " " + customer?.lastName }</h6>
                <h6>Phone number: { customer?.phoneNumber }</h6>
                <h6>Email address: {customer?.emailAddress}</h6>
            </div>

            <div className="section-wrapper">
                <h3 id="headline-title">Services:</h3>
                <div className="card-list">
                    {services.map((serviceData) => { 
                        const service = new ServiceSnapshot(serviceData)
                        return (
                            <Card key={ service.snapshotId } style={{ width: '16rem' }}>
                                <Card.Body>
                                    <Card.Title>{ service.name }</Card.Title>
                                    <div>Price: ${ service.pricing }</div> 
                                </Card.Body>
                            </Card>
                        )
                    })}
                </div>
            </div>  

            <div className="section-wrapper">
                <h3 id="headline-title">Add-ons:</h3>
                <div className="card-list">
                    {addons.map((addonData) => { 
                        const addon = new ServiceSnapshot(addonData)
                        return (
                            <Card key={ addon.snapshotId } style={{ width: '16rem' }}>
                                <Card.Body>
                                    <Card.Title>{ addon.name }</Card.Title>
                                    <div>Price: ${ addon.pricing }</div> 
                                </Card.Body>
                            </Card>
                        )
                    })}
                </div>
            </div>  
        </div>
    );
}

export default AppointmentDetailScreen;