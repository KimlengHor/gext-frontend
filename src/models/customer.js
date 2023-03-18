export default class Customer {
    constructor(customerData) {
      this.customerId = customerData.customer_id;
      this.emailAddress = customerData.email_address;
      this.firstName = customerData.first_name;
      this.lastName = customerData.last_name;
      this.phoneNumber = customerData.phone_number;
    }
}
