export default class Appointment {
    constructor(appointmentData) {
      this.appointmentId = appointmentData.appointment_id;
      this.date = appointmentData.date;
      this.petName = appointmentData.pet_name;
      this.firstName = appointmentData.first_name;
      this.lastName = appointmentData.last_name;
      this.phoneNumber = appointmentData.phone_number;
    }
}
