export default class Groomer {
    constructor(groomerData) {
      this.groomerId = groomerData.groomer_id;
      this.emailAddress = groomerData.email_address;
      this.firstName = groomerData.first_name;
      this.lastName = groomerData.last_name;
      this.authId = groomerData.google_auth_id;
    }
}
