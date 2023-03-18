export default class Badge {
    constructor(badgeData) {
        this.id = badgeData.badge_id
        this.numOfApps = badgeData.number_of_appointments;
        this.name = badgeData.name;
    }
}
