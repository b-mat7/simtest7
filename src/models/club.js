import { formatNum } from "../lib/util.js"

export class Club {
  constructor(seedData) {
    // Assign seed data properties
    /** @type {string} */
    this.uuid = seedData.uuid
    /** @type {string} */
    this.name = seedData.name
    /** @type {string} */
    this.initials = seedData.initials
    /** @type {string} */
    this.colorPrim = seedData.colorPrim
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
    /** @type {number} */
    this.form = seedData.form
    /** @type {number} */
    this.morale = seedData.morale

    // Initialize other properties
    this.role = ''
    this.roleTarget = {}
    this.matchesPlayed = 0
    this.intervalsPlayed = 0
    this.momentumSum = 0
    this.initiativeStrSum = 0
    this.transitionStrSum = 0
    this.attackStrSum = 0
    this.defendStrSum = 0
    this.shotStrSum = 0
    this.saveStrSum = 0
    this.formData = []
    this.formSum = 0
    this.moraleSum = 0

    this.attacks = 0
    this.defends = 0
    this.counters = 0
    this.fallbacks = 0
    this.attackShots = 0
    this.attackShotsAgainst = 0
    this.counterShots = 0
    this.counterShotsAgainst = 0
    this.saves = 0
    this.goals = 0
    this.goalsAgainst = 0
    this.points = 0
    this.results = []
  }
  
  // Initialize methods
  // General and Diffs
  seed() {
    return parseFloat((this.initiative + this.transition + this.attack + this.shoot + this.defend + this.save).toFixed(2))
    // return formatNum(this.initiative + this.transition + this.attack + this.shoot + this.defend + this.save, 2)
  }

  initiativesDiff() {
    return this.attacks - this.defends
  }

  transitionsDiff() {
    return this.counters - this.fallbacks
  }

  goalsDiff() {
    return this.goals - this.goalsAgainst
  }

  wins() {
    return [...this.results].filter(x => x === 3).length
  }

  winsOvertime() {
    return [...this.results].filter(x => x === 2).length
  }

  lossesOvertime() {
    return [...this.results].filter(x => x === 1).length
  }

  losses() {
    return [...this.results].filter(x => x === 0).length
  }

  // Averages
  momentumAvg() {
    return this.matchesPlayed > 0 
    ? parseFloat((this.momentumSum / this.intervalsPlayed).toFixed(2)) 
    : 0
  }
  initiativeStrAvg() {
    return this.matchesPlayed > 0 
    ? parseFloat((this.initiativeStrSum / this.intervalsPlayed).toFixed(2)) 
    : 0 
  }
  transitionStrAvg() {
    return this.matchesPlayed > 0 
    ? parseFloat((this.transitionStrSum / (this.counters + this.fallbacks)).toFixed(2)) 
    : 0
  }
  attackStrAvg() {
    return this.matchesPlayed > 0 
    ? parseFloat((this.attackStrSum / this.attacks).toFixed(2)) 
    : 0
  }
  defendStrAvg() {
    return this.matchesPlayed > 0 
    ? parseFloat((this.defendStrSum / this.defends).toFixed(2)) 
    : 0
  }
  shotStrAvg() {
    return this.matchesPlayed > 0 
    ? parseFloat((this.shotStrSum / (this.attackShots + this.counterShots)).toFixed(2)) 
    : 0
  }
  saveStrAvg() {
    return this.matchesPlayed > 0 
    ? parseFloat((this.saveStrSum / (this.attackShotsAgainst + this.counterShotsAgainst)).toFixed(2)) 
    : 0 
  }
  formAvg() { // ab matchday5 (4 is for displaying)
    return this.matchesPlayed > 5 
    ? parseFloat((this.formSum / (this.matchesPlayed - 4)).toFixed(2)) 
    : 0
  }
  moraleAvg() {
    return this.matchesPlayed > 0 
    ? parseFloat((this.moraleSum / this.matchesPlayed).toFixed(2)) 
    : 0
  }
  resultsL5Avg() {
    return this.matchesPlayed > 0 
    ? parseFloat((this.results.slice(-5).reduce((a, b) => a + b, 0) / Math.min(this.results.length, 5)).toFixed(2)) 
    : 0
  }

  initiativeStrDiceAvg() {
    return this.matchesPlayed > 0 
    ? parseFloat((this.initiativeStrAvg() - ((this.initiative - this.transition) + this.initiative * this.momentumAvg() * 1.3)).toFixed(2)) 
    : 0
  }
  transitionStrDiceAvg() {
    return this.matchesPlayed > 0 
    ? parseFloat((this.transitionStrAvg() - ((this.transition - this.initiative) + this.transition * this.momentumAvg() * 1.3)).toFixed(2)) 
    : 0 
  }
  attackStrDiceAvg() {
    return this.matchesPlayed > 0 
    ? parseFloat((this.attackStrAvg() - (this.attack * this.moraleAvg() + this.formAvg())).toFixed(2)) 
    : 0
  }
  defendStrDiceAvg() {
    return this.matchesPlayed > 0 
    ? parseFloat((this.defendStrAvg() - (this.defend * this.moraleAvg() + this.formAvg())).toFixed(2)) 
    : 0
  }
  shotStrDiceAvg() {
    return this.matchesPlayed > 0 
    ? parseFloat((this.shotStrAvg() - (this.shoot + this.formAvg() / 2)).toFixed(2)) 
    : 0
  }
  saveStrDiceAvg() {
    return this.matchesPlayed > 0 ? parseFloat((this.saveStrAvg() - (this.save + this.formAvg() / 2)).toFixed(2)) 
    : 0
  }
  
  // Efficiencies ( % )
  initiativesEff() {
    return this.matchesPlayed > 0 
    ? parseFloat((this.attacks / this.intervalsPlayed * 100).toFixed(1)) 
    : 0
  }
  transitionsEff() {
    return this.matchesPlayed > 0 
    ? parseFloat(((this.counterShots + (this.fallbacks - this.counterShotsAgainst)) / (this.counters + this.fallbacks) * 100).toFixed(1)) 
    : 0 
  }
  attacksEff() {
    return this.matchesPlayed > 0 
    ? parseFloat((this.attackShots / this.attacks * 100).toFixed(1)) 
    : 0 
  }
  defendsEff() {
    return this.matchesPlayed > 0 
    ? parseFloat(((this.defends - this.attackShotsAgainst) / this.defends * 100).toFixed(1)) 
    : 0
  }
  countersEff() {
    return this.matchesPlayed > 0 
    ? parseFloat((this.counterShots / this.counters * 100).toFixed(1)) 
    : 0 
  }
  fallbacksEff() {
    return this.matchesPlayed > 0 
    ? parseFloat(((this.fallbacks - this.counterShotsAgainst) / this.fallbacks * 100).toFixed(1)) 
    : 0
  }
  shotsEff() {
    return this.matchesPlayed > 0 
    ? parseFloat((this.goals / (this.attackShots + this.counterShots) * 100).toFixed(1)) 
    : 0
  }
  savesEff() {
    return this.matchesPlayed > 0 
    ? parseFloat((this.saves / (this.attackShotsAgainst + this.counterShotsAgainst) * 100).toFixed(1)) 
    : 0
  }
  shotsSavesEff() {
    return this.matchesPlayed > 0 
    ? parseFloat(((this.goals / (this.attackShots + this.counterShots) * 100) + (this.saves / (this.attackShotsAgainst + this.counterShotsAgainst) * 100)).toFixed(1)) 
    : 0
  }

  // Per Match
  goalsPerMatch() {
    return this.matchesPlayed > 0 
    ? parseFloat((this.goals / this.matchesPlayed).toFixed(1)) 
    : 0
  }
  goalsAgainstPerMatch() {
    return this.matchesPlayed > 0 
    ? parseFloat((this.goalsAgainst / this.matchesPlayed).toFixed(1)) 
    : 0
  }
  goalsDiffPerMatch() {
    return this.matchesPlayed > 0 
    ? parseFloat((this.goalsDiff() / this.matchesPlayed).toFixed(1)) 
    : 0
  }
  pointsPerMatch() {
    return this.matchesPlayed > 0 
    ? parseFloat((this.points / this.matchesPlayed).toFixed(2)) 
    : 0
  }
}