import { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Popup from 'reactjs-popup';
import GroomerApi from '../apis/GroomerApi';
import { UserContext } from '../App';
import AddonForm from '../components/AddonForm';
import ServiceForm from '../components/ServiceForm';
import Addon from '../models/addon';
import Service from '../models/service';

function ServiceListScreen() {

    const { user } = useContext(UserContext);
    const [services, setServices] = useState([]);
    const [addons, setAddons] = useState([]);

    const groomerApi = new GroomerApi();

    const getServices = async () => {
        const data = await groomerApi.getServices(user.groomerId);
        setServices(data)
    };

    const getAddons = async () => {
        const data = await groomerApi.getAddons(user.groomerId);
        setAddons(data)
    };

    const removeService = async (serviceId) => { 
        const message = await groomerApi.removeService(serviceId);
        console.log(message);
        await getServices();
    }

    const removeAddon = async (addonId) => { 
        const message = await groomerApi.removeAddon(addonId);
        console.log(message);
        await getAddons();
    }

    useEffect(() => {
        getServices();
        getAddons();
    }, [])

    return (
        <div className='container'>
            <h1 id="headline-title">Services</h1>

            <h3 id="headline-title">Main services:</h3>
            <div className="card-list">
                {services.map((serviceData) => { 
                    const service = new Service(serviceData)
                    return (
                        <Card key={ service.serviceId } style={{ width: '16rem' }}>
                            <Card.Body>
                                <Card.Title>{ service.name }</Card.Title>
                                <div>Pricing: { service.pricing }</div>
                                <div>Description: {service.description}</div>
                                <Popup trigger={<div className='bottom-top-pad-btn'> <Button variant="primary">Edit</Button> </div>} position="center center">
                                    {close => (
                                        <ServiceForm service={ service } onUpdate={ 
                                            async (service) => { 
                                                console.log(service);
                                                await getServices();
                                            }
                                        } onClose={ close }></ServiceForm>
                                    )}
                                </Popup>
                                <div className = "pet-list-buttons">
                                    {/* <Button variant="primary">Edit</Button>       */}
                                    <Button onClick={async () => await removeService(service.serviceId)} variant="outline-danger">Remove</Button>      
                                </div>  
                            </Card.Body>
                        </Card>
                    )
                })}
            </div>

            <Popup trigger={<div className='bottom-top-pad-btn'> <Button variant="warning">Add service</Button> </div>} position="center center">
                {close => (
                    <ServiceForm mode="add" onUpdate={ 
                        async (service) => { 
                            console.log(service);
                            await getServices();
                        }
                    } onClose={ close }></ServiceForm>
                )}
            </Popup>

            <div className='add-on-wrapper'>
                <h3 id="headline-title">Add-ons:</h3>
                <div className="card-list">
                    {addons.map((addonData) => { 
                        const addon = new Addon(addonData)
                        return (
                            <Card key={ addon.addonId } style={{ width: '16rem' }}>
                                <Card.Body>
                                    <Card.Title>{ addon.name }</Card.Title>
                                    <div>Pricing: { addon.pricing }</div>
                                    <div>Description: {addon.description}</div>
                                    <Popup trigger={<div className='bottom-top-pad-btn'> <Button variant="primary">Edit</Button> </div>} position="center center">
                                        {close => (
                                            <AddonForm addon={ addon } onUpdate={ 
                                                async (addon) => { 
                                                    console.log(addon);
                                                    await getAddons();
                                                }
                                            } onClose={ close }></AddonForm>
                                        )}
                                    </Popup>
                                    <div className = "pet-list-buttons">
                                        {/* <Button variant="primary">Edit</Button>       */}
                                        <Button onClick={async () => await removeAddon(addon.addonId)} variant="outline-danger">Remove</Button>      
                                    </div>  
                                </Card.Body>
                            </Card>
                        )
                    })}
                </div>
            </div>   
            <Popup trigger={<div className='bottom-top-pad-btn'> <Button variant="warning">Add Addon</Button> </div>} position="center center">
                {close => (
                    <AddonForm mode="add" onUpdate={ 
                        async (addon) => { 
                            console.log(addon);
                            await getAddons();
                        }
                    } onClose={ close }></AddonForm>
                )}
            </Popup>

        </div>
    );
}

export default ServiceListScreen;