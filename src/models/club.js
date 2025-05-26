import { formatD1, formatD2 } from "../lib/util.js"

export class Club {
  constructor(seedData) {
    // ----- BASE -----
    /** @type {string} */
    this.uuid = seedData.uuid
    /** @type {string} */
    this.name = seedData.name
    /** @type {string} */
    this.initials = seedData.initials
    /** @type {string} */
    this.colorPrim = seedData.colorPrim


    // ----- ABILITY -----
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


    // ----- TWEAK -----
    /** @type {number} */
    this.momentum = seedData.momentum
    /** @type {number} */
    this.form = seedData.form
    /** @type {number} */
    this.morale = seedData.morale


    // ----- ROLE -----
    this.role = ''
    this.roleTarget = {}
    this.roleDiff = 0
    this.rankSeed = 0
    this.rankMatchday = 0
    this.priceMoney = 0


    // ----- SUM -----
    this.intervalsPlayed = 0
    this.matchesPlayed = 0

    this.initiativeStrSum = 0
    this.transitionStrSum = 0
    this.attackStrSum = 0
    this.defendStrSum = 0
    this.shotStrSum = 0
    this.saveStrSum = 0
    this.momentumStrSum = 0
    this.formStrData = []
    this.formStrSum = 0
    this.moraleStrSum = 0

    this.attacks = 0
    this.defends = 0
    this.counters = 0
    this.fallbacks = 0
    this.attackShots = 0
    this.attackShotsAgainst = 0
    this.counterShots = 0
    this.counterShotsAgainst = 0
    this.goals = 0
    this.goalsAgainst = 0
    this.saves = 0
    this.points = 0
    this.resultPoints = []
  }


  // --- ROLE --- (methods die auch ROLE sind)
  seed() {
    return formatD2(this.initiative + this.transition + this.attack + this.shoot + this.defend + this.save)
  }


  // --- SUM --- (methods die auch SUM sind)
  initiativesDiff() {
    return this.attacks - this.defends
  }

  transitionsDiff() {
    return this.counters - this.fallbacks
  }

  goalsDiff() {
    return this.goals - this.goalsAgainst
  }


  // --- PERF AVG TOTAL ---
  pointsL5Avg() {
    return this.matchesPlayed > 0 
    ? formatD2((this.resultPoints.slice(-5).reduce((a, b) => a + b, 0) / Math.min(this.resultPoints.length, 5))) 
    : 0
  }
  initiativeStrAvg() {
    return this.matchesPlayed > 0 
    ? formatD2(this.initiativeStrSum / this.intervalsPlayed) 
    : 0 
  }
  transitionStrAvg() {
    return this.matchesPlayed > 0 
    ? formatD2(this.transitionStrSum / (this.counters + this.fallbacks)) 
    : 0
  }
  attackStrAvg() {
    return this.matchesPlayed > 0 
    ? formatD2(this.attackStrSum / this.attacks) 
    : 0
  }
  defendStrAvg() {
    return this.matchesPlayed > 0 
    ? formatD2(this.defendStrSum / this.defends) 
    : 0
  }
  shotStrAvg() {
    return this.matchesPlayed > 0 
    ? formatD2(this.shotStrSum / (this.attackShots + this.counterShots)) 
    : 0
  }
  saveStrAvg() {
    return this.matchesPlayed > 0 
    ? formatD2(this.saveStrSum / (this.attackShotsAgainst + this.counterShotsAgainst)) 
    : 0 
  }
  momentumStrAvg() {
    return this.matchesPlayed > 0 
    ? formatD2(this.momentumStrSum / this.intervalsPlayed) 
    : 0
  }
  formStrAvg() { // ab matchday5 (4 is for displaying)
    return this.matchesPlayed > 5 
    ? formatD2(this.formStrSum / (this.matchesPlayed - 4)) 
    : 0
  }
  moraleStrAvg() {
    return this.matchesPlayed > 0 
    ? formatD2(this.moraleStrSum / this.matchesPlayed) 
    : 0
  }


  // --- PERF AVG Last x ---


  // --- PERF EFF TOTAL ( % ) ---
  initiativesEff() {
    return this.matchesPlayed > 0 
    ? formatD1(this.attacks / this.intervalsPlayed * 100) 
    : 0
  }
  transitionsEff() {
    return this.matchesPlayed > 0 
    ? formatD1(((this.counterShots + (this.fallbacks - this.counterShotsAgainst)) / (this.counters + this.fallbacks) * 100)) 
    : 0 
  }
  attacksEff() {
    return this.matchesPlayed > 0 
    ? formatD1(this.attackShots / this.attacks * 100) 
    : 0 
  }
  defendsEff() {
    return this.matchesPlayed > 0 
    ? formatD1((this.defends - this.attackShotsAgainst) / this.defends * 100) 
    : 0
  }
  countersEff() {
    return this.matchesPlayed > 0 
    ? formatD1(this.counterShots / this.counters * 100) 
    : 0 
  }
  fallbacksEff() {
    return this.matchesPlayed > 0 
    ? formatD1((this.fallbacks - this.counterShotsAgainst) / this.fallbacks * 100) 
    : 0
  }
  shotsEff() {
    return this.matchesPlayed > 0 
    ? formatD1(this.goals / (this.attackShots + this.counterShots) * 100) 
    : 0
  }
  savesEff() {
    return this.matchesPlayed > 0 
    ? formatD1(this.saves / (this.attackShotsAgainst + this.counterShotsAgainst) * 100) 
    : 0
  }
  shotsSavesEff() {
    return this.matchesPlayed > 0 
    ? formatD1((this.goals / (this.attackShots + this.counterShots) * 100) + (this.saves / (this.attackShotsAgainst + this.counterShotsAgainst) * 100)) 
    : 0
  }


  // --- PERF EFF Last x ( % ) ---


  // --- RESULT / OTHER ---
  goalsPerMatch() {
    return this.matchesPlayed > 0 
    ? formatD1(this.goals / this.matchesPlayed) 
    : 0
  }
  goalsAgainstPerMatch() {
    return this.matchesPlayed > 0 
    ? formatD1(this.goalsAgainst / this.matchesPlayed) 
    : 0
  }
  goalsDiffPerMatch() {
    return this.matchesPlayed > 0 
    ? formatD1(this.goalsDiff() / this.matchesPlayed) 
    : 0
  }
  pointsPerMatch() {
    return this.matchesPlayed > 0 
    ? formatD1(this.points / this.matchesPlayed) 
    : 0
  }

  wins() {
    return [...this.resultPoints].filter(x => x === 3).length
  }

  winsOvertime() {
    return [...this.resultPoints].filter(x => x === 2).length
  }

  lossesOvertime() {
    return [...this.resultPoints].filter(x => x === 1).length
  }

  losses() {
    return [...this.resultPoints].filter(x => x === 0).length
  }
}