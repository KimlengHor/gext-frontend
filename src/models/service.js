export default class Service {
    constructor(serviceData) {
        this.serviceId = serviceData.service_id;
        this.name = serviceData.name;
        this.pricing = serviceData.pricing;
        this.description = serviceData.description;
    }
}
