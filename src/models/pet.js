export default class Pet {
    constructor(petData) {
      this.petId = petData.pet_id;
      this.name = petData.name;
      this.breed = petData.breed;
      this.gender = petData.gender;
    }
}
