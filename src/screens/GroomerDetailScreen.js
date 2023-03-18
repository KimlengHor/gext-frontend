import React, { useContext, useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import Popup from 'reactjs-popup';
import GroomerApi from '../apis/GroomerApi';
import { UserContext } from '../App';
import EditUserForm from '../components/EditUserForm';
import Badge from '../models/badge';

function GroomerDetailScreen() {

    const navigate = useNavigate();
    const [badges, setBadges] = useState([]);
    const { user, setUser } = useContext(UserContext);

    const groomerApi = new GroomerApi();

    const getBadges = async () => {
        const data = await groomerApi.getBadges(user.groomerId);
        setBadges(data);
    };

    useEffect(() => { 
        console.log("Okay");
        getBadges()
    }, [])

    return (
        <div className='container'>
            <h1 id="headline-title">Groomer Detail</h1>
            <h6>First name: { user.firstName }</h6>
            <h6>Last name: { user.lastName }</h6>
            <h6>Email: { user.emailAddress }</h6>
            
            <Popup trigger={<div className='bottom-top-pad-btn'> <Button variant="outline-primary">Edit</Button> </div>} position="center center">
                {close => (
                    <EditUserForm user={ user } onUpdate={ 
                        (groomer) => { 
                            setUser(groomer);
                        }
                    } onClose={ close }></EditUserForm>
                )}
            </Popup>
           
            <h3 id="headline-title">Achievements:</h3>
            <div className="card-list">
                {badges.map((data) => { 
                    const badge = new Badge(data)
                    return (
                        <Card key={ badge.id } style={{ width: '16rem' }}>
                            <Card.Body>
                                <Card.Title>{ badge.name }</Card.Title>
                                <div>Appointments reached: { badge.numOfApps }</div> 
                            </Card.Body>
                        </Card>
                    )
                })}
            </div> 
            <div className='bottom-top-pad-btn'>
                <Button onClick={() => { 
                    navigate("/customers");
                }} variant="dark">View customers</Button> 
                <Button id="secondary-button" onClick={() => { 
                    navigate("/services");
                }} variant="success">View services & addons</Button> 
            </div>
        </div>
    );
}

export default GroomerDetailScreen;