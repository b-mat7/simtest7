// Dice randomNbr integer between min/max (incl)
const diceMinMaxInt = (min, max) => {
    return Math.round(Math.random() * (max - min)) + min
}

// Dice randomNbr integer < max (incl)
const diceMaxInt = (max) => {
    return Math.round(Math.random() * max)
}

// Dice randomNbr float < max (incl)
const diceMaxFloat = (max) => {
  return Math.random() * max
}

// Pos/Neg, Permanent/fix, pro Zeiteinheit(s)...
const effectAmount = { 
    xs: 0.025,
    s: 0.05,
    m: 0.1,
    l: 0.15,
    xl: 0.3,
}

const simulateMatchSpeed = {
    realTime: 60000,    // 60s real = 1min match (real)
    default: 1000,      // 1s real  = 1min match (1:1)
    fast4x: 250,        // 1s real  = 4min match (1:4)
    fast10x: 100,       // 1s real  = 10min match (1:10)
}

const simulateGameSpeed = {
    //für das generelle Game zwischen den Matchdays
    // brauch das? oder macht einfach "simulate until Date.now()"?
}

// Shuffle Clubs for schedule generator
const shuffleClubs = (clubs) => {
  // Create shallow copy
  const shuffledClubs = [...clubs]

  // Apply Fisher-Yates shuffle algorithm
  for (let i = shuffledClubs.length - 1; i > 0; i--) {
    // Generate random index between 0 and i (inclusive)
    const j = Math.floor(Math.random() * (i + 1))
    // Swap elements at indices i and j
    const temp = shuffledClubs[i]
    shuffledClubs[i] = shuffledClubs[j]
    shuffledClubs[j] = temp
  }
  return shuffledClubs
}

// Schedule generator
const createSchedule = (clubs) => {
  const numClubs = clubs.length
  const numMatchdays = (numClubs - 1) * 2 // Two halves

  const shuffledClubs = shuffleClubs(clubs)

  // Initialize schedule object
  // const schedule = Array.from({ length: numMatchdays }, () => [])   // as Array
  const schedule = {
    season: 2023,
    league: 'DEL2',
    matchdayList: Array.from({ length: numMatchdays }, () => [])
  }

  // Generate first half of the schedule using modified round-robin algorithm
  for (let day = 0; day < 4 * (numClubs - 1); day++) {
  // for (let day = 0; day < numClubs - 1; day++) {
    schedule.matchdayList[day] = {
      dayNr: day + 1,
      date: 'Date{}',
      matches: [],
    }
    for (let i = 0; i < numClubs / 2; i++) {
      const homeClub = shuffledClubs[i]
      const awayClub = shuffledClubs[numClubs - 1 - i]
      if (day % 2 === 1) {
        schedule.matchdayList[day].matches.push({ 
          'dayNr': day + 1,
          'date': 'Date{}', 
          'matchNr': i + 1, 
          'home': awayClub, 
          'away': homeClub, 
          'matchReport': {} 
        })      
      } else {
        schedule.matchdayList[day].matches.push({ 
          'dayNr': day + 1,
          'date': 'Date{}', 
          'matchNr': i + 1, 
          'home': homeClub, 
          'away': awayClub, 
          'matchReport': {} 
        })
      }
    }

    // Rotate the clubs
    const temp = shuffledClubs[1]
    for (let i = 1; i < numClubs - 1; i++) {
      shuffledClubs[i] = shuffledClubs[i + 1]
    }
    shuffledClubs[numClubs - 1] = temp
  }

  // Generate second half of the schedule by switching home/away
  for (let day = 0; day < numClubs - 1; day++) {
    const secondHalfDay = day + numClubs - 1
    schedule.matchdayList[secondHalfDay] = {
      dayNr: secondHalfDay + 1,
      date: 'Date{}',
      matches: [],
    }
    for (let match of schedule.matchdayList[day].matches) {
      schedule.matchdayList[secondHalfDay].matches.push({ 
        'dayNr': secondHalfDay + 1,
        'date': 'Date{}', 
        'matchNr': match.match, 
        'home': match.away, 
        'away': match.home, 
        'matchReport': {} 
      })
    }
  }
  return schedule
}

// Assign each teams' role & roleTarget for the saison (based on seed strength)
const prepareRole = (clubs) => {
  const roles = {
    1: 'TitleCandidate',
    2: 'TitleCandidate',
    3: 'TitleCandidate',
    4: 'Contender',
    5: 'Contender',
    6: 'UpperMidfielder',
    7: 'UpperMidfielder',
    8: 'LowerMidfielder',
    9: 'LowerMidfielder',
    10: 'Survivalist',
    11: 'Survivalist',
    12: 'RelCandidate',
    13: 'RelCandidate',
    14: 'RelCandidate',

    // 1: 'TitleCandidate',
    // 2: 'TitleCandidate',
    // 3: 'TitleCandidate',
    // 4: 'TitleCandidate',
    // 5: 'TitleCandidate',
    // 6: 'TitleCandidate',
    // 7: 'Contender',
    // 8: 'Contender',
    // 9: 'Contender',
    // 10: 'Contender',
    // 11: 'UpperMidfielder',
    // 12: 'UpperMidfielder',
    // 13: 'UpperMidfielder',
    // 14: 'UpperMidfielder',
    // 15: 'LowerMidfielder',
    // 16: 'LowerMidfielder',
    // 17: 'LowerMidfielder',
    // 18: 'LowerMidfielder',
    // 19: 'Survivalist',
    // 20: 'Survivalist',
    // 21: 'Survivalist',
    // 22: 'Survivalist',
    // 23: 'RelCandidate',
    // 24: 'RelCandidate',
    // 25: 'RelCandidate',
    // 26: 'RelCandidate',
    // 27: 'RelCandidate',
    // 28: 'RelCandidate',
  }

  //  +++ ++ + 0 - -- --- / * 0.05, 0.1, 0.2, oder pro Pos Abweichung +- 0.01 bis maxLimit | nach Spieltag 8
  // rTarget: NACH 8, MODIFIER

  const roleTargets = {
    'TitleCandidate': {'name': 'Title',    'rank': [1, 2]},
    'Contender':      {'name': 'Playoffs', 'rank': [3, 4, 5, 6]},
    'UpperMidfielder': {'name': 'Playoffs', 'rank': [5, 6, 7, 8]},
    'LowerMidfielder': {'name': 'Comfort',  'rank': [7, 8, 9, 10]},
    'Survivalist':    {'name': 'Comfort',  'rank': [9, 10, 11, 12]},
    'RelCandidate':   {'name': 'Survival', 'rank': [11, 12, 13]},
  }

  const sortedClubs = updateRank(clubs, 'rankSeed')

  sortedClubs.forEach((entry, index) => {
    entry.role = roles[index + 1]
    entry.roleTarget = roleTargets[entry.role]
  })

  return sortedClubs
}

const calcMomentum = (comp, home, away) => {
  // calc home momentum: better curve (=^ home bonus) (increase faster, decrease slower)
  const x = comp.homeMomentum
  switch (true) {
    case (x > 1.8):
      comp.homeMomentum -= 0.15
      break
    case (x > 1.5):
      comp.homeMomentum -= 0.1
      break
    case (x > 1):
      comp.homeMomentum -= 0.05
      break
  }

  // calc away momentum: worse curve (increase slower, decrease faster)
  const y = comp.awayMomentum
  switch (true) {
    case (y > 1.8):
      comp.awayMomentum -= 0.225
      break
    case (y > 1.5):
      comp.awayMomentum -= 0.15
      break
    case (y > 1):
      comp.awayMomentum -= 0.075
      break
  }

  // ensure momentum min/max limits
  if(comp.homeMomentum < 1) {
    comp.homeMomentum = 1
  }
  if(comp.awayMomentum < 1) {
    comp.awayMomentum = 1
  }
  if(comp.homeMomentum > 2) {
    comp.homeMomentum = 2
  }
  if(comp.awayMomentum > 2) {
    comp.awayMomentum = 2
  }

  // write momentum to club
  home.momentumStrSum += comp.homeMomentum
  away.momentumStrSum += comp.awayMomentum

  home.momentum = comp.homeMomentum
  away.momentum = comp.awayMomentum
}

const calcInitiative = (comp, home, away, dice) => {
  const homeInitFactor = formatD2(home.initiative - home.transition)
  const awayInitFactor = formatD2(away.initiative - away.transition)

  const homeInitMom = formatD2(homeInitFactor + home.initiative * comp.homeMomentum * 1.3)
  const awayInitMom = formatD2(awayInitFactor + away.initiative * comp.awayMomentum * 1.3)

  const homeDice = diceMaxInt(dice)
  const awayDice = diceMaxInt(dice)

  const homeInitiativeStr = formatD2(homeInitMom + homeDice)
  const awayInitiativeStr = formatD2(awayInitMom + awayDice)

  // console.log("H:", home.initials, "| home-initStr: ", "initFactor ", homeInitFactor, " + home.init ", home.initiative, "* mom: ", comp.homeMomentum, "*1.3 = ", homeInitMom, "+dice ", homeDice, " = ", homeInitiativeStr)
  // console.log("A:", away.initials, "| away-initStr: ", "initFactor ", awayInitFactor, " + away.init ", away.initiative, "* mom: ", comp.awayMomentum, "*1.3 = ", awayInitMom, "+dice ", awayDice, " = ", awayInitiativeStr)

  // write to simMatch and club
  comp.homeInitiativeStr = homeInitiativeStr
  comp.awayInitiativeStr = awayInitiativeStr

  comp.homeInitiativeStrSum += homeInitiativeStr
  comp.awayInitiativeStrSum += awayInitiativeStr

  home.initiativeStrSum += homeInitiativeStr
  away.initiativeStrSum += awayInitiativeStr
}

const calcTransition = (comp, home, away, dice) => {
  const homeTransFactor = formatD2(home.transition - home.initiative)
  const awayTransFactor = formatD2(away.transition - away.initiative)

  const homeTransMom = formatD2(homeTransFactor + home.transition * comp.homeMomentum * 1.3)
  const awayTransMom = formatD2(awayTransFactor + away.transition * comp.awayMomentum * 1.3)

  const homeDice = diceMaxInt(dice)
  const awayDice = diceMaxInt(dice)

  const homeTransitionStr = formatD2(homeTransMom + homeDice)
  const awayTransitionStr = formatD2(awayTransMom + awayDice)

  // console.log("H:", home.initials, "| home-transStr: ", "transFactor ", homeTransFactor, " + home.trans ", home.transition, "* mom: ", comp.homeMomentum, "*1.3 = ", homeTransMom, "+dice ", homeDice, " = ", homeTransitionStr)
  // console.log("A:", away.initials, "| away-transStr: ", "transFactor ", awayTransFactor, " + away.trans ", away.transition, "* mom: ", comp.awayMomentum, "*1.3 = ", awayTransMom, "+dice ", awayDice, " = ", awayTransitionStr)

  // write to simMatch and club
  comp.homeTransitionStr = homeTransitionStr
  comp.awayTransitionStr = awayTransitionStr

  comp.homeTransitionStrSum += homeTransitionStr
  comp.awayTransitionStrSum += awayTransitionStr

  home.transitionStrSum += homeTransitionStr
  away.transitionStrSum += awayTransitionStr
}

const calcAttackStr = (team, dice) => {
  const returnVal = +(
    (team.attack * team.morale)
    + team.form
    + diceMaxInt(dice)
  ).toFixed(3)

  return returnVal
}

const calcDefendStr = (team, dice) => {
  const returnVal = +(
    (team.defend * team.morale)
    + team.form
    + diceMaxInt(dice)
  ).toFixed(3)

  return returnVal
}

const calcShotStr = (team, dice) => {
  const returnVal = +(
    team.shoot
    + team.form / 2
    + diceMaxInt(dice)
  ).toFixed(3)

  return returnVal
}

const calcSaveStr = (team, dice) => {
  const returnVal = +(
    team.save
    + team.form / 2
    + diceMaxInt(dice)
  ).toFixed(3)

  return returnVal
}

// Handle greater diff in attack vs defend str: greater diff -> more trys -> here: increase required value to keep all within 3-4 goals/match
// if negative (defend > attack): required value will also be lower
// could also use team.morale instead of ...Buff, but buff will be enhanced with more items which also change within interval
const calcShotCheck = (attacker, defender, type) => {
  const diff = (attacker.attack * attacker.morale + attacker.form) - (defender.defend * defender.morale + defender.form)
  const minRequired = 6
  const adjustedRequired = minRequired + (Math.round(diff / 2))

  return diceMaxInt(10) > Math.min(8, adjustedRequired)

  // B: =====

  // let diff = 0
  // if (type === 'attack') {
  //   diff = (attacker.attack * attacker.morale + attacker.form) - (defender.defend * defender.morale + defender.form)
  // } else if (type === 'counter') {
  //   diff = (attacker.defend * attacker.morale + attacker.form) - (defender.attack * defender.morale + defender.form)
  // }

  // const minRequired = 6
  // const adjustedRequired = minRequired + (Math.round(diff / 2))

  // console.log(`===== ${type} =====`);
  // console.log(`Att: ${attacker.initials} | ${attacker.attack}*${attacker.morale}+${attacker.form} = ${attacker.attack * attacker.morale + attacker.form}`)
  // console.log(`Def: ${defender.initials} | ${defender.defend}*${defender.morale}+${defender.form} = ${defender.defend * defender.morale + defender.form}`)
  // console.log(`diff: ${diff}`)
  // console.log(`-> adjReq: ${minRequired} + ${(Math.round(diff / 2))} -> ${adjustedRequired}`)

  // const dice = diceMaxInt(10)
  // console.log(`dice: ${dice} -> ${dice > Math.min(8, adjustedRequired)}`)
  // console.log("====================================")

  // return dice > Math.min(8, adjustedRequired)
  // return diceMaxInt(10) > Math.min(8, adjustedRequired)
}

const updateTeam = (team, ...updateCallbacks) => {
  updateCallbacks.forEach(callback => callback(team))
}

const updatePoints = (comp, home, away) => {
  // one-time: set revert-to value, add points for draw
  if(!comp.initPointsSet) {
    const homePointsInit = home.points
    const awayPointsInit = away.points
    comp.initPointsSet = true

    home.points += 1
    away.points += 1
  }

  // determine current leader if any
  const [leader, trailer] = comp.homeGoals === comp.awayGoals
    ? ['', '']
    : comp.homeGoals > comp.awayGoals
      ? [home, away]
      : [away, home]

  // update points if leader emerges or going back to draw
  if (leader !== comp.lastIntervalLeader) {

    // during regular matchTime 
    if (comp.matchTime <= 60) {
      if (leader !== '') {
        leader.points += 2
        trailer.points -= 1
      }
      if (leader === '') {
        comp.lastIntervalLeader.points -= 2
        comp.lastIntervalTrailer.points += 1
      }
    }

    // during overtime 
    if (comp.matchTime > 60) {
      if (leader !== '') {
        leader.points += 1
      }
      if (leader === '') {
        comp.lastIntervalLeader.points -= 1
      }
    }
  }

  // prep for next interval
  comp.lastIntervalLeader = leader
  comp.lastIntervalTrailer = trailer
}

// Update formStrData (based on opp' matchday rank) for form calc
const updateFormData = (comp, home, away) => {
  // determine winner & loser
  const [winner, loser] = comp.homeGoals >= comp.awayGoals
  ? [home, away]
  : [away, home]

  winner.formStrData.push({
    'points': comp.matchTime === 60 ? 3 : 2,
    'rank': winner === home ? away.rankMatchday : home.rankMatchday
  })

  loser.formStrData.push({
    'points': comp.matchTime === 60 ? 0 : 1, 
    'rank': loser === home ? away.rankMatchday : home.rankMatchday
  })
}

// Calc form (based on formStrData), done only after matchday 5
const updateForm = (team) => {
  if (team.matchesPlayed < 5) return

  const last5Games = team.formStrData.slice(-5).reverse()

  let sum = 0
  let form = 0

  for (let i = 0, m = 1; i < last5Games.length; i++, m -= 0.1) {
    let result = m * last5Games[i]['points'] * (1 - (2 * last5Games[i]['rank'] / 100))
    sum = sum + result
    form = sum / (i + 1)
  }
  // ensure limit: total form min
  form = form < 0.3 ? 0.3 : form

  team.form = form
  team.formStrSum += form
}

// Update Morale based on results/opponents and other factors
const updateMorale = (comp, home, away) => {
  // Update the moraleStrSum with the morale that was active at this (current) match (-> before match-end's morale re-calculation below)
  home.moraleStrSum += home.morale
  away.moraleStrSum += away.morale

  // determine winner & loser
  const [winner, loser] = comp.homeGoals >= comp.awayGoals
  ? [home, away]
  : [away, home]

  // create vars for morale re-calculation
  let roleExpectWinEffect = 1
  let roleExpectLoseEffect = 1
  let rankExpectWinEffect = 1
  let rankExpectLoseEffect = 1
  let sixPointsWinEffect = 1
  let sixPointsLoseEffect = 1
  let winnerBonus = 0
  let loserPenalty = 0

  // console.log("START: winner:", winner.morale, winner.moraleStrSum, winner.moraleStrAvg(), winner.initials,)
  // console.log("START: loser:", loser.morale, loser.moraleStrSum, loser.moraleStrAvg(), loser.initials,)

  // Role Expectaion Effect (always):
  // Title- & RelCandidates win/loss against bottom/top teams
  if (winner.role === 'RelCandidate' && loser.role === 'Contender') {
    roleExpectWinEffect = 1.3
    // console.log("ROLE-expect-WIN:", roleExpectWinEffect)
  }
  if (winner.role === 'RelCandidate' && loser.role === 'TitleCandidate') {
    roleExpectWinEffect = 1.618
    // console.log("ROLE-expect-WIN:", roleExpectWinEffect)
  }
  if (loser.role === 'TitleCandidate' && winner.role === 'Survivalist') {
    roleExpectLoseEffect = 1.3
    // console.log("ROLE-expect-LOSE:", roleExpectLoseEffect)
  }
  if (loser.role === 'TitleCandidate' && winner.role === 'RelCandidate') {
    roleExpectLoseEffect = 1.618
    // console.log("ROLE-expect-LOSE:", roleExpectLoseEffect)
  }

  // Rank Expectation Effect (> matchday 10):
  // Rank 1-3: bei loss gg rank > 9, 11
  // Rank 12-14: bei win gg rank < 6, 4
  if (winner.matchesPlayed > 10) {
    if (winner.rankMatchday > 11 && loser.rankMatchday < 6) {
      rankExpectWinEffect = loser.rankMatchday < 4 ? 1.618 : 1.3
      // console.log("RANK-expect-WIN:", rankExpectWinEffect)
    }
    if (loser.rankMatchday < 4 && winner.rankMatchday > 9) {
      rankExpectLoseEffect = winner.rankMatchday > 11 ? 1.618 : 1.3
      // console.log("RANK-expect-LOSE:", rankExpectLoseEffect)
    }
  }
  
  // SixPoints-Match Effect (last 30%, 15% of season):
  // win/loss against matchdayTable neighbour
  if (winner.matchesPlayed >= 36) {
    if (loser.rankMatchday === winner.rankMatchday + 1 || loser.rankMatchday === winner.rankMatchday - 1) {
      sixPointsWinEffect = winner.matchesPlayed > 44 ? 1.618 : 1.3
      sixPointsLoseEffect = winner.matchesPlayed > 44 ? 1.618 : 1.3
      // console.log("SIXPOINTS-match:", sixPointsWinEffect, sixPointsLoseEffect)
    }
  }

  // update morale: matchday 1-4: use standard values, afterwards use opponent form within limits
  // /old: winner --> 0.025 * form      min/max: 0.01  (= <0.4 form) <- bis -> 0.045 (= >1.8)
  // /old: loser  --> 0.03 * (2.2-form) min/max: 0.015 (= >1.7 form) <- bis -> 0.05  (= <0.53)
  const bonus = {
    'TitleCandidate': {'pre5': 0.015,  'post5': 0.02},
    'Contender':      {'pre5': 0.0175, 'post5': 0.0225},
    'UpperMidfielder': {'pre5': 0.02,   'post5': 0.025},
    'LowerMidfielder': {'pre5': 0.02,   'post5': 0.025},
    'Survivalist':    {'pre5': 0.0225, 'post5': 0.0275},
    'RelCandidate':   {'pre5': 0.025,  'post5': 0.03}
  }
  const penalty = {
    'TitleCandidate': {'pre5': 0.025,  'post5': 0.03},
    'Contender':      {'pre5': 0.0225, 'post5': 0.0275},
    'UpperMidfielder': {'pre5': 0.02,   'post5': 0.025},
    'LowerMidfielder': {'pre5': 0.02,   'post5': 0.025},
    'Survivalist':    {'pre5': 0.0175, 'post5': 0.0225},
    'RelCandidate':   {'pre5': 0.015,  'post5': 0.02}
  }
  if (winner.matchesPlayed < 5) {
    winnerBonus = bonus[winner.role].pre5 * roleExpectWinEffect * rankExpectWinEffect
    // console.log("CALC WIN:", bonus[winner.role].pre5, roleExpectWinEffect, rankExpectWinEffect, " -> ", winnerBonus)
    loserPenalty = penalty[loser.role].pre5 * roleExpectLoseEffect * rankExpectLoseEffect
    // console.log("CALC LOSE:", penalty[loser.role].pre5, roleExpectLoseEffect, rankExpectLoseEffect, " -> ", loserPenalty)
  } else {
    winnerBonus = bonus[winner.role].post5 * loser.form * roleExpectWinEffect * rankExpectWinEffect * sixPointsWinEffect
    // console.log("CALC WIN:", bonus[winner.role].post5, roleExpectWinEffect, rankExpectWinEffect, sixPointsWinEffect, " -> ", winnerBonus)
    loserPenalty = penalty[loser.role].post5 * (2.2 - winner.form) * roleExpectLoseEffect * rankExpectLoseEffect * sixPointsLoseEffect
    // console.log("CALC LOSE:", penalty[loser.role].post5, roleExpectLoseEffect, rankExpectLoseEffect, sixPointsLoseEffect, " -> ", loserPenalty)
  }

  // ensure limits: morale change per intervall
  const intervallChangeLimits = {
    'TitleCandidate': {'min': 0.01, 'max': 0.05},
    'Contender':      {'min': 0.01, 'max': 0.05},
    'UpperMidfielder': {'min': 0.01, 'max': 0.05},
    'LowerMidfielder': {'min': 0.01, 'max': 0.05},
    'Survivalist':    {'min': 0.01, 'max': 0.05},
    'RelCandidate':   {'min': 0.01, 'max': 0.05}
  }
  if (winnerBonus < intervallChangeLimits[winner.role].min) {
    winnerBonus = intervallChangeLimits[winner.role].min
    // console.log("winnerBonus-role-INTERVALL LIMIT MIN:", winnerBonus)
  } else if (winnerBonus > intervallChangeLimits[winner.role].max && (winner.role === 'TitleCandidate' || winner.role === 'Contender' || winner.role === 'UpperMidfielder' || winner.role === 'LowerMidfielder')) {
    winnerBonus = intervallChangeLimits[winner.role].max
    // console.log("winnerBonus-role-INTERVALL LIMIT MAX:", winnerBonus)
  }
  if (loserPenalty < intervallChangeLimits[loser.role].min) {
    loserPenalty = intervallChangeLimits[loser.role].min
    // console.log("loserPenalty-role-INTERVALL LIMIT MIN:", loserPenalty)
  } else if (loserPenalty > intervallChangeLimits[loser.role].max && (loser.role === 'RelCandidate' || loser.role === 'Survivalist' || loser.role === 'LowerMidfielder' || loser.role === 'UpperMidfielder')) {
    loserPenalty = intervallChangeLimits[loser.role].max
    // console.log("loserPenalty-role-INTERVALL LIMIT MAX:", loserPenalty)
  }

  winner.morale += winnerBonus
  loser.morale -= loserPenalty
  // console.log("winnerbonus", winnerBonus, winner.initials)
  // console.log("loserpenalty", loserPenalty, loser.initials)

  // ensure limits: morale total
  const totalLimits = {
    'TitleCandidate': {'min': 0.825, 'max': 1.075},
    'Contender':      {'min': 0.85,  'max': 1.1},
    'UpperMidfielder': {'min': 0.875, 'max': 1.125},
    'LowerMidfielder': {'min': 0.9,   'max': 1.15},
    'Survivalist':    {'min': 0.925, 'max': 1.175},
    'RelCandidate':   {'min': 0.95,  'max': 1.2}
  }
  if (winner.morale > totalLimits[winner.role].max) {
    winner.morale = totalLimits[winner.role].max
    // console.log("winnerMorale-TOTAL LIMIT MAX:", winner.morale, " -> ", totalLimits[winner.role].max)
  }
  
  if (loser.morale < totalLimits[loser.role].min) {
    loser.morale = totalLimits[loser.role].min
    // console.log("moserMorale-TOTAL LIMIT MIN:", loser.morale, " -> ", totalLimits[loser.role].min)
  }

  // console.log("END: new winner.morale", winner.morale, "moraleStrSum/moraleStrAvg", winner.moraleStrSum, winner.moraleStrAvg(), winner.initials,)
  // console.log("END: new loser.morale", loser.morale, "moraleStrSum/moraleStrAvg", loser.moraleStrSum, loser.moraleStrAvg(), loser.initials,)
}

// Table generator (sorting: seed, then topic/default + add club.entryName)
const updateRank = (clubs, sortTopic, entryName) => {
  const sortedClubs = clubs.sort((a,b) => {
    if (a.matchesPlayed === 0 && b.matchesPlayed === 0) {
      return b.seed() - a.seed()
    }

    if (sortTopic) {
      return typeof a[sortTopic] === 'function'
      ? b[sortTopic]() - a[sortTopic]()
      : b[sortTopic] - a[sortTopic]
    } else {
      return (
        b.points - a.points ||
        b.goalsDiff() - a.goalsDiff() ||
        b.goals - a.goals
      )
    }
  })

  if (entryName) {
    sortedClubs.forEach((entry, index) => {
      entry[entryName] = index + 1
    })
    return sortedClubs
  }
  return sortedClubs
}

// Calc deviation from roleTarget rank
const updateRoleDiff = (clubs) => {
  clubs.forEach(club => {
    const minRank = Math.min(...club.roleTarget.rank)
    const maxRank = Math.max(...club.roleTarget.rank)
    const rankMatchday = club.rankMatchday

    club.roleDiff = rankMatchday < minRank
      ? minRank - rankMatchday
      : rankMatchday > maxRank
        ? maxRank - rankMatchday
        : 0
  })
}

const formatD0 = (num, decimals = 0) => Number(num.toFixed(decimals))
const formatD1 = (num, decimals = 1) => Number(num.toFixed(decimals))
const formatD2 = (num, decimals = 2) => Number(num.toFixed(decimals))

export {
  shuffleClubs,
  createSchedule,
  prepareRole,

  calcMomentum,
  calcInitiative,
  calcTransition,
  calcAttackStr,
  calcDefendStr,
  calcShotStr,
  calcSaveStr,
  calcShotCheck,

  updateTeam,
  updatePoints,
  updateFormData,
  updateForm,
  updateMorale,
  updateRank,
  updateRoleDiff,


  formatD0,
  formatD1,
  formatD2,
}