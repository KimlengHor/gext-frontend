import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import GroomerApi from '../apis/GroomerApi';
import { useContext, useEffect, useState } from 'react';
import Customer from '../models/customer';
import { UserContext } from '../App';
import { useNavigate } from 'react-router-dom';
import EditCustomerForm from '../components/EditCustomerForm';
import Popup from 'reactjs-popup';

function CustomerListScreen() {

    const [customers, setCustomers] = useState([]);
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const groomerApi = new GroomerApi();

    const getCustomers = async () => {
        const customers = await groomerApi.getCustomers(user.groomerId);
        setCustomers(customers);
    };

    useEffect(() => { 
        getCustomers()
    }, [])

    return (
        <div className='container'>
            <div className="headline-with-buttons">
                <h1 id="headline-title">Customers</h1> 
                <Popup trigger={<Button variant="warning">Add Customer</Button>} position="bottom">
                    {close => (
                        <EditCustomerForm mode="add" onUpdate={ 
                            async (customer) => { 
                                console.log(customer)
                                await getCustomers();
                            }
                        } onClose={ close }></EditCustomerForm>
                    )}
                </Popup>
            </div>
            
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email address</th>
                        <th>Phone number</th>
                        <th>More information</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customerData) => { 
                        const customer = new Customer(customerData)
                        return (
                            <tr key={ customer.customerId }>
                                <td>{ customer.firstName + ' ' + customer.lastName }</td>
                                <td>{ customer.emailAddress }</td>
                                <td>{ customer.phoneNumber }</td>
                                <td>
                                    <Button onClick={() => { 
                                        navigate('/customers/details', { state: { customerId: customer.customerId } })
                                    }} variant="primary">
                                        View pets
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

export default CustomerListScreen;