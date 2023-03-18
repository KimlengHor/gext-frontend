import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useContext, useEffect, useState } from 'react';
import GroomerApi from '../apis/GroomerApi';
import Appointment from '../models/appointment';
import { format, parseISO } from 'date-fns';
import { UserContext } from '../App';
import { useNavigate } from "react-router-dom";
import { Calendar } from 'react-calendar';
import AppointmentForm from '../components/AppointmentForm';
import Popup from 'reactjs-popup';

function AppointmentScreen() {

    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const [appointments, setAppointments] = useState([]);
    const [date, setDate] = useState(new Date());
    const [dateString, setDateString] = useState(format(parseISO((new Date()).toISOString()), 'yyyy-MM-dd'));
    const [shown, setShown] = useState(false);

    const groomerApi = new GroomerApi();

    const getAppointments = async (dateString) => {
        const appointments = await groomerApi.getAppointments(user.groomerId, dateString);
        setAppointments(appointments);
    };

    useEffect(() => { 
        getAppointments(dateString)
    }, [])

    return (
        <div className='container'>
            <div className="headline-with-buttons">
                <h1 id="headline-title">Appointments</h1>
                <div>
                    <Button onClick={() => { 
                        setShown(!shown);
                    }} variant="outline-warning">
                        Calendar
                    </Button>
                    {shown == true ? <div className="calendar-view">
                        <Calendar onChange={async (date) => {
                            setShown(false);
                            setDate(date);
                            setDateString(format(parseISO(date.toISOString()), 'yyyy-MM-dd'));
                            await getAppointments(format(parseISO(date.toISOString()), 'yyyy-MM-dd'));
                        }} />
                    </div> : null}
                    <Popup trigger={<Button id="secondary-button" variant="outline-primary">Create an appointment</Button> } position="bottom">
                        {close => (
                            <AppointmentForm onUpdate={ 
                                async (message) => { 
                                    console.log(message)
                                    await getAppointments(dateString);
                                }
                            } onClose={ close }></AppointmentForm>
                        )}
                    </Popup>
                    <Button onClick={ () => { 
                            navigate('/groomer');
                        }} id="secondary-button" variant="outline-dark">
                        View profile
                    </Button>
                </div>  
            </div>
             <div className="date-container">
                <h4> {format(parseISO(date.toISOString()), 'MMMM dd, yyyy')} </h4>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Time</th>
                        <th>Pet's name</th>
                        <th>Customer's name</th>
                        <th>Phone number</th>
                        <th>More information</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map((appointmentData) => { 
                        const appointment = new Appointment(appointmentData)
                        return (
                            <tr key={ appointment.appointmentId }>
                                <td> { format(parseISO(appointment.date), 'hh:mm a') } </td>
                                <td> { appointment.petName }</td>
                                <td> { appointment.firstName + " " + appointment.lastName }</td>
                                <td> { appointment.phoneNumber }</td>
                                <td>
                                    <Button onClick={ () => { 
                                            navigate('/appointments/details', { state: { appointmentId: appointment.appointmentId } });
                                        }} variant="primary">
                                        View detail
                                    </Button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div>
    );
}

export default AppointmentScreen;