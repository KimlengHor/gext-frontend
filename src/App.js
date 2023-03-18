import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { createContext, useState } from "react";

import LoginScreen from "./screens/LoginScreen";
import AppointmentScreen from "./screens/AppointmentScreen";
import AppointmentDetailScreen from "./screens/AppointmentDetailScreen";
import GroomerDetailScreen from "./screens/GroomerDetailScreen";
import CustomerListScreen from "./screens/CustomerListScreen";
import ServiceListScreen from "./screens/ServiceListScreen";
import CustomerDetailScreen from './screens/CustomerDetailScreen';
import CreateAccountScreen from "./screens/CreateAccountScreen";

export const UserContext = createContext(null);

function App() {

  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div>
        <Router>
          <Routes>
            <Route exact path="/" element={<LoginScreen />} />
            <Route exact path="/create-account" element={<CreateAccountScreen />} />
            <Route exact path="/appointments" element={<AppointmentScreen />} />
            <Route exact path="/appointments/details" element={<AppointmentDetailScreen />}></Route>
            <Route exact path="/groomer" element={<GroomerDetailScreen />}></Route>
            <Route exact path="/customers" element={<CustomerListScreen />}></Route>
            <Route exact path="/customers/details" element={<CustomerDetailScreen />}></Route>
            <Route exact path="/services" element={<ServiceListScreen />}></Route>
          </Routes>
        </Router>
      </div>
    </UserContext.Provider>
  );
}

export default App;
