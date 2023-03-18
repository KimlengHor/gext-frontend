import Appointment from "./appointment";
import Customer from "./customer";
import Pet from "./pet";

export default class AppointmentDetails {
    constructor(appointmentData) {
        this.appointment = new Appointment(appointmentData.appointment);
        this.pet = new Pet(appointmentData.pet);
        this.customer = new Customer(appointmentData.customer);
        this.services = appointmentData.services;
        this.addons = appointmentData.addons;
    }
}
