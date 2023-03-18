export default class Addon {
    constructor(addonData) {
        this.addonId = addonData.addon_id;
        this.name = addonData.name;
        this.pricing = addonData.pricing;
        this.description = addonData.description;
    }
}
