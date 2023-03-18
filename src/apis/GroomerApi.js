import axios from 'axios';
import Groomer from '../models/groomer';

export default class GroomerApi {

    constructor() { 
        this.baseUrl = 'http://localhost:3000';
    }

    async getGroomer(authId) {
        const response = await
            axios.get('http://localhost:3000/groomers/' + authId)
                .catch(function (error) {
                    console.log(error);
                });
        const groomer = new Groomer(response.data.groomer);
        console.log(groomer);
        return groomer;
    };

    async createGroomer(groomer) {
        const response = await
            axios.post('http://localhost:3000/groomer', groomer).catch(function (error) {
                    console.log(error);
                });
        const message = response.data.message;
        return message;
    };

    async updateGroomer(authId, groomer) {
        const response = await
            axios.put('http://localhost:3000/groomer/' + authId, {
                groomer: groomer
            }).catch(function (error) {
                    console.log(error);
                });
        const message = response.data.message;
        return message;
    };

    async getCustomers(groomerId) {
        const response = await
            axios.get('http://localhost:3000/customers/' + groomerId)
                .catch(function (error) {
                    console.log(error);
                });
        console.log(response.data.customers)
        return response.data.customers;
    };

    async createCustomer(groomerId, customer) {
        const response = await
            axios.post('http://localhost:3000/customer/' + groomerId, {
                customer: customer
            }).catch(function (error) {
                    console.log(error);
                });
        const message = response.data.message;
        return message;
    };

    async removeCustomer(customerId) {
        const response = await
            axios.delete('http://localhost:3000/customer/' + customerId)
                .catch(function (error) {
                    console.log(error);
                });
        console.log(response.data.message)
        return response.data.message;
    };

    async updateCustomer(customerId, customer) {
        const response = await
            axios.put('http://localhost:3000/customer/' + customerId, {
                customer: customer
            }).catch(function (error) {
                    console.log(error);
                });
        const message = response.data.message;
        return message;
    };

    async getCustomerDetail(customerId) {
        const response = await
            axios.get('http://localhost:3000/customers/details/' + customerId)
                .catch(function (error) {
                    console.log(error);
                });
        console.log(response.data.detail)
        return response.data.detail;
    };

    async getAppointments(groomerId, dateString) {
        const response = await
            axios.get('http://localhost:3000/appointments/' + groomerId + '/' + dateString)
                .catch(function (error) {
                    console.log(error);
                });
        console.log(response.data.appointments)
        return response.data.appointments;
    };

    async createAppointment(groomerId, petId, appointment) {
        const response = await
            axios.post('http://localhost:3000/appointment/' + groomerId + '/' + petId, appointment).catch(function (error) {
                console.log(error);
            });
        console.log(response.data.message)
        return response.data.message;
    };

    async getAppointmentDetail(appointmentId) {
        const response = await
            axios.get('http://localhost:3000/appointments/details/' + appointmentId)
                .catch(function (error) {
                    console.log(error);
                });
        console.log(response.data.details)
        return response.data.details;
    };

    async getServices(groomerId) {
        const response = await
            axios.get('http://localhost:3000/services/' + groomerId)
                .catch(function (error) {
                    console.log(error);
                });
        console.log(response.data.services)
        return response.data.services;
    };

    async createService(groomerId, service) {
        const response = await
            axios.post('http://localhost:3000/service/' + groomerId, {
                service: service
            }).catch(function (error) {
                    console.log(error);
                });
        const message = response.data.message;
        return message;
    };

    async removeService(serviceId) {
        const response = await
            axios.delete('http://localhost:3000/service/' + serviceId)
                .catch(function (error) {
                    console.log(error);
                });
        console.log(response.data.message)
        return response.data.message;
    };

    async updateService(serviceId, service) {
        const response = await
            axios.put('http://localhost:3000/service/' + serviceId, {
                service: service
            }).catch(function (error) {
                    console.log(error);
                });
        const message = response.data.message;
        return message;
    };

    async getAddons(groomerId) {
        const response = await
            axios.get('http://localhost:3000/addons/' + groomerId)
                .catch(function (error) {
                    console.log(error);
                });
        console.log(response.data.addons)
        return response.data.addons;
    };

    async createAddon(groomerId, addon) {
        const response = await
            axios.post('http://localhost:3000/addon/' + groomerId, {
                addon: addon
            }).catch(function (error) {
                    console.log(error);
                });
        const message = response.data.message;
        return message;
    };

    async removeAddon(addonId) {
        const response = await
            axios.delete('http://localhost:3000/addon/' + addonId)
                .catch(function (error) {
                    console.log(error);
                });
        console.log(response.data.message)
        return response.data.message;
    };

    async updateAddon(addonId, addon) {
        const response = await
            axios.put('http://localhost:3000/addon/' + addonId, {
                addon: addon
            }).catch(function (error) {
                    console.log(error);
                });
        const message = response.data.message;
        return message;
    };

    async getBadges(groomerId) {
        const response = await
            axios.get('http://localhost:3000/badges/' + groomerId)
                .catch(function (error) {
                    console.log(error);
                });
        console.log(response.data.badges)
        return response.data.badges;
    };

    async getPets(customerId) {
        const response = await
            axios.get('http://localhost:3000/pets/' + customerId)
                .catch(function (error) {
                    console.log(error);
                });
        const pets = response.data.pets;
        return pets;
    };

    async removePet(petId) {
        const response = await
            axios.delete('http://localhost:3000/pet/' + petId)
                .catch(function (error) {
                    console.log(error);
                });
        console.log(response.data.message)
        return response.data.message;
    };

    async createPet(customerId, pet) {
        const response = await
            axios.post('http://localhost:3000/pet/' + customerId, {
                pet: pet
            }).catch(function (error) {
                    console.log(error);
                });
        const message = response.data.message;
        return message;
    };

    async updatePet(petId, pet) {
        const response = await
            axios.put('http://localhost:3000/pet/' + petId, {
                pet: pet
            }).catch(function (error) {
                    console.log(error);
                });
        const message = response.data.message;
        return message;
    };
}