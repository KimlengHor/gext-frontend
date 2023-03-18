export default class ServiceSnapshot {
    constructor(serviceData) {
        this.snapshotId = serviceData.snapshotId;
        this.name = serviceData.name;
        this.pricing = serviceData.pricing;
    }
}
