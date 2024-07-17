export class Player {
  constructor(seedData) {
    // Assign seed data properties
    /** @type {string} */
    this.uuid = seedData.uuid
    /** @type {string} */
    this.firstName = seedData.firstName
    /** @type {string} */
    this.lastName = seedData.lastName
    /** @type {number} */
    this.initiative = seedData.initiative
    /** @type {number} */
    this.transition = seedData.transition
    /** @type {number} */
    this.attack = seedData.attack
    /** @type {number} */
    this.shoot = seedData.shoot
    /** @type {number} */
    this.defend = seedData.defend
    /** @type {number} */
    this.save = seedData.save
  }
}