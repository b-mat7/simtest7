"use strict"

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

const calcMomentum = (team) => {
  // Decrease momentum for both, attacker keeps some from last play/goal
  // ZAHLEN ÜBERARBEITEN, dice zu viel bzw momentum zu schwach
  // home steigt schneller + fällt langsamer
  if (team.momentum > 1) {
    if (team.momentum > 1.45){
      if (team.momentum > 1.55) {
        team.momentum -= 0.2
      }
      team.momentum -= 0.15
    }
    team.momentum -= 0.1;
    if (team.momentum < 1) {
      team.momentum = 1;
    }
  }

  const returnVal = parseFloat((diceMaxInt(6) * team.momentum).toFixed(3))

  return returnVal
}

const calcTeamBuff = (team) => {
  const returnVal = +(
    (1 * team.morale)
  ).toFixed(2)

  // könnte result auch an team{} zurück dranhängen -> kann darauf zugreifen in anderen ()

  return returnVal
}

const calcAttackStr = (team, teamBuffValue, dice) => {
  const returnVal = +(
    (team.attack * teamBuffValue)
    + diceMaxInt(dice)
    + team.form
  ).toFixed(3)

  return returnVal
}

const calcDefendStr = (team, teamBuffValue, dice) => {
  const returnVal = +(
    (team.defend * teamBuffValue)
    + diceMaxInt(dice)
    + team.form
  ).toFixed(3)

  return returnVal
}

const calcShotStr = (team, dice) => {
  const returnVal = +(
    team.shoot
    + diceMaxInt(dice)
  ).toFixed(3)

  return returnVal
}

const calcSaveStr = (team, dice) => {
  const returnVal = +(
    team.save
    + diceMaxInt(dice)
  ).toFixed(3)

  return returnVal
}

// Handle greater diff in attack vs defend str: greater diff -> more trys -> here: increase required value to keep all within 3-4 goals/match
// if negative (defend > attack): required value will also be lower
// could also use team.morale instead of ...Buff, but buff will be enhanced with more items which also change within interval
const checkShot = (attacker, attackerBuff, defender, defenderBuff) => {
  const diff = Math.round(attacker.attack * attackerBuff + attacker.form) - (defender.defend * defenderBuff + defender.form)
  const minRequired = 5
  const adjustedRequired = minRequired + (Math.round(diff / 2))

  return diceMaxInt(10) > Math.min(7, adjustedRequired)
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

// Update formData (based on opp' matchday position) for form calc
const updateFormData = (comp, home, away) => {
  // determine winner & loser
  const [winner, loser] = comp.homeGoals >= comp.awayGoals
  ? [home, away]
  : [away, home]

  winner.formData.push({
    'points': comp.matchTime === 60 ? 3 : 2,
    'position': winner === home ? away.positionMatchday : home.positionMatchday
  })

  loser.formData.push({
    'points': comp.matchTime === 60 ? 0 : 1, 
    'position': loser === home ? away.positionMatchday : home.positionMatchday
  })
}

// Calc form (based on formData)
const updateForm = (team) => {
  const last5Games = team.formData.slice(-5).reverse()

  let sum = 0
  let form = 0

  for (let i = 0, m = 1; i < last5Games.length; i++, m -= 0.1) {
    let result = m * last5Games[i]['points'] * (1 - (2 * last5Games[i]['position'] / 100))
    sum = sum + result
    form = sum / (i + 1)
  }
  // ensure limit: total form min
  form = form < 0.3 ? 0.3 : form

  team.form = form
  team.formSum += form
}

// Update Morale based on results/opponents and other factors
const updateMorale = (comp, home, away) => {
  // determine winner & loser
  const [winner, loser] = comp.homeGoals >= comp.awayGoals
  ? [home, away]
  : [away, home]

  let roleExpectWinEffect = 1
  let roleExpectLoseEffect = 1
  let posExpectWinEffect = 1
  let posExpectLoseEffect = 1
  let sixPointsWinEffect = 1
  let sixPointsLoseEffect = 1
  let winnerBonus = 0
  let loserPenalty = 0

  // console.log("winner:", winner.initials, winner.role, winner.positionMatchday);
  // console.log("loser:", loser.initials, loser.role, loser.positionMatchday)

  // Role Expectaion Effect (always):
  // Title- & RelCandidates win/loss against bottom/top teams
  if (winner.role === 'RelCandidate' && loser.role === 'Contender') {
    roleExpectWinEffect = 1.3
    // console.log("ROLE-expect-WIN:", roleExpectWinEffect);
  }
  if (winner.role === 'RelCandidate' && loser.role === 'TitleCandidate') {
    roleExpectWinEffect = 1.618
    // console.log("ROLE-expect-WIN:", roleExpectWinEffect);
  }
  if (loser.role === 'TitleCandidate' && winner.role === 'Survivalist') {
    roleExpectLoseEffect = 1.3
    // console.log("ROLE-expect-LOSE:", roleExpectLoseEffect);
  }
  if (loser.role === 'TitleCandidate' && winner.role === 'RelCandidate') {
    roleExpectLoseEffect = 1.618
    // console.log("ROLE-expect-LOSE:", roleExpectLoseEffect);
  }

  // Position Expectation Effect (> matchday 10):
  // Pos 1-3: bei loss gg pos > 9, 11
  // Pos 12-14: bei win gg pos < 6, 4
  if (winner.matchesPlayed > 10) {
    if (winner.positionMatchday > 11 && loser.positionMatchday < 6) {
      posExpectWinEffect = loser.positionMatchday < 4 ? 1.618 : 1.3
      // console.log("POSITION-expect-WIN:", posExpectWinEffect);
    }
    if (loser.positionMatchday < 4 && winner.positionMatchday > 9) {
      posExpectLoseEffect = winner.positionMatchday > 11 ? 1.618 : 1.3
      // console.log("POSITION-expect-LOSE:", posExpectLoseEffect);
    }
  }
  
  // SixPoints-Match Effect (last 30%, 15% of season):
  // win/loss against liveTable neighbour
  if (winner.matchesPlayed >= 36) {
    if (loser.positionMatchday === winner.positionMatchday + 1 || loser.positionMatchday === winner.positionMatchday - 1) {
      sixPointsWinEffect = winner.matchesPlayed > 44 ? 1.618 : 1.3
      sixPointsLoseEffect = winner.matchesPlayed > 44 ? 1.618 : 1.3
      // console.log("SIXPOINTS-match:", sixPointsWinEffect, sixPointsLoseEffect);
    }
  }

  // update morale: matchday 1-4: use standard values, afterwards use opponent form within limits
  // /old: winner --> 0.025 * form      min/max: 0.01  (= <0.4 form) <- bis -> 0.045 (= >1.8)
  // /old: loser  --> 0.03 * (2.2-form) min/max: 0.015 (= >1.7 form) <- bis -> 0.05  (= <0.53)
  const bonus = {
    'TitleCandidate':  {'pre5': 0.015,  'post5': 0.02},
    'Contender':       {'pre5': 0.0175, 'post5': 0.0225},
    'UpperMidfielder': {'pre5': 0.02,   'post5': 0.025},
    'LowerMidfielder': {'pre5': 0.02,   'post5': 0.025},
    'Survivalist':     {'pre5': 0.0225, 'post5': 0.0275},
    'RelCandidate':    {'pre5': 0.025,  'post5': 0.03}
  }
  const penalty = {
    'TitleCandidate':  {'pre5': 0.025,  'post5': 0.03},
    'Contender':       {'pre5': 0.0225, 'post5': 0.0275},
    'UpperMidfielder': {'pre5': 0.02,   'post5': 0.025},
    'LowerMidfielder': {'pre5': 0.02,   'post5': 0.025},
    'Survivalist':     {'pre5': 0.0175, 'post5': 0.0225},
    'RelCandidate':    {'pre5': 0.015,  'post5': 0.02}
  }
  if (winner.matchesPlayed < 5) {
    winnerBonus = bonus[winner.role].pre5 * roleExpectWinEffect * posExpectWinEffect
    // console.log("CALC WIN:", bonus[winner.role].pre5, roleExpectWinEffect, posExpectWinEffect, " -> ", winnerBonus);
    loserPenalty = penalty[loser.role].pre5 * roleExpectLoseEffect * posExpectLoseEffect
    // console.log("CALC LOSE:", penalty[loser.role].pre5, roleExpectLoseEffect, posExpectLoseEffect, " -> ", loserPenalty);
  } else {
    winnerBonus = bonus[winner.role].post5 * loser.form * roleExpectWinEffect * posExpectWinEffect * sixPointsWinEffect
    // console.log("CALC WIN:", bonus[winner.role].post5, roleExpectWinEffect, posExpectWinEffect, sixPointsWinEffect, " -> ", winnerBonus);
    loserPenalty = penalty[loser.role].post5 * (2.2 - winner.form) * roleExpectLoseEffect * posExpectLoseEffect * sixPointsLoseEffect
    // console.log("CALC LOSE:", penalty[loser.role].post5, roleExpectLoseEffect, posExpectLoseEffect, sixPointsLoseEffect, " -> ", loserPenalty);
  }

  // ensure limits: morale change per intervall
  const intervallChangeLimits = {
    'TitleCandidate':  {'min': 0.01, 'max': 0.05},
    'Contender':       {'min': 0.01, 'max': 0.05},
    'UpperMidfielder': {'min': 0.01, 'max': 0.05},
    'LowerMidfielder': {'min': 0.01, 'max': 0.05},
    'Survivalist':     {'min': 0.01, 'max': 0.05},
    'RelCandidate':    {'min': 0.01, 'max': 0.05}
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
  // console.log("winnerbonus", winnerBonus, winner.initials);
  // console.log("loserpenalty", loserPenalty, loser.initials);

  // ensure limits: morale total
  const totalLimits = {
    'TitleCandidate':  {'min': 0.825, 'max': 1.075},
    'Contender':       {'min': 0.85,  'max': 1.1},
    'UpperMidfielder': {'min': 0.875, 'max': 1.125},
    'LowerMidfielder': {'min': 0.9,   'max': 1.15},
    'Survivalist':     {'min': 0.925, 'max': 1.175},
    'RelCandidate':    {'min': 0.95,  'max': 1.2}
  }
  if (winner.morale > totalLimits[winner.role].max) {
    winner.morale = totalLimits[winner.role].max
    // console.log("winnerMorale-TOTAL LIMIT MAX:", winner.morale, " -> ", totalLimits[winner.role].max);
  }
  
  if (loser.morale < totalLimits[loser.role].min) {
    loser.morale = totalLimits[loser.role].min
    // console.log("moserMorale-TOTAL LIMIT MIN:", loser.morale, " -> ", totalLimits[loser.role].min);
  }
}

// Table generator (sorting: seed, then topic/default + add club.entryName)
const updatePosition = (clubs, sortTopic, entryName) => {
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

// Calc deviation from roleTarget position
const updateRoleDiff = (clubs) => {
  clubs.forEach(club => {
    const minPosition = Math.min(...club.roleTarget.position);
    const maxPosition = Math.max(...club.roleTarget.position);
    const matchdayPosition = club.positionMatchday;

    club.roleDiff = matchdayPosition < minPosition
      ? minPosition - matchdayPosition
      : matchdayPosition > maxPosition
        ? maxPosition - matchdayPosition
        : 0
  })
}

const shuffleClubs = (clubs) => {
  // Create shallow copy
  const shuffledClubs = [...clubs]

  // Apply Fisher-Yates shuffle algorithm
  for (let i = shuffledClubs.length - 1; i > 0; i--) {
    // Generate random index between 0 and i (inclusive)
    const j = Math.floor(Math.random() * (i + 1));
    // Swap elements at indices i and j
    const temp = shuffledClubs[i];
    shuffledClubs[i] = shuffledClubs[j];
    shuffledClubs[j] = temp;
  }
  return shuffledClubs;
}

const createSchedule = (clubs) => {
  const numClubs = clubs.length;
  const numMatchdays = (numClubs - 1) * 2; // Two halves

  const shuffledClubs = shuffleClubs(clubs)

  // Initialize schedule object
  // const schedule = Array.from({ length: numMatchdays }, () => []);   // as Array
  const schedule = {
    season: 2023,
    league: 'DEL2',
    matchdayList: Array.from({ length: numMatchdays }, () => [])
  };

  // Generate first half of the schedule using modified round-robin algorithm
  for (let day = 0; day < 4 * (numClubs - 1); day++) {
  // for (let day = 0; day < numClubs - 1; day++) {
    schedule.matchdayList[day] = {
      dayNr: day + 1,
      date: 'Date{}',
      matches: [],
    }
    for (let i = 0; i < numClubs / 2; i++) {
      const homeClub = shuffledClubs[i];
      const awayClub = shuffledClubs[numClubs - 1 - i];
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
    const temp = shuffledClubs[1];
    for (let i = 1; i < numClubs - 1; i++) {
      shuffledClubs[i] = shuffledClubs[i + 1];
    }
    shuffledClubs[numClubs - 1] = temp;
  }

  // Generate second half of the schedule by switching home/away
  for (let day = 0; day < numClubs - 1; day++) {
    const secondHalfDay = day + numClubs - 1;
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
  return schedule;
}

// Assign each teams' role & target for the saison (based on seed strength)
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
    'TitleCandidate':  {'name': 'Title',    'position': [1, 2]},
    'Contender':       {'name': 'Playoffs', 'position': [3, 4, 5, 6]},
    'UpperMidfielder': {'name': 'Playoffs', 'position': [5, 6, 7, 8]},
    'LowerMidfielder': {'name': 'Comfort',  'position': [7, 8, 9, 10]},
    'Survivalist':     {'name': 'Comfort',  'position': [8, 10, 11, 12]},
    'RelCandidate':    {'name': 'Survival', 'position': [11, 12, 13, 14]},
  }

  const sortedClubs = updatePosition(clubs, 'positionSeed')

  sortedClubs.forEach((entry, index) => {
    entry.role = roles[index + 1]
    entry.roleTarget = roleTargets[entry.role]
  })

  return sortedClubs
}

export {
  calcMomentum,
  calcTeamBuff,
  calcAttackStr,
  calcDefendStr,
  calcShotStr,
  calcSaveStr,
  checkShot,
  updateTeam,
  updatePoints,
  updateFormData,
  updateForm,
  updateMorale,
  updatePosition,
  updateRoleDiff,
  shuffleClubs,
  createSchedule,
  prepareRole,
}