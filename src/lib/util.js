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
  ).toFixed(1)

  // könnte result auch an team{} zurück dranhängen -> kann darauf zugreifen in anderen ()

  return returnVal
}

const calcAttPlayStr = (team, teamBuffValue, dice) => {
  const returnVal = +(
    (team.attack * teamBuffValue)
    + diceMaxInt(dice)
  ).toFixed(1)

  return returnVal
}

const calcDefPlayStr = (team, teamBuffValue, dice) => {
  const returnVal = +(
    (team.defend * teamBuffValue)
    + diceMaxInt(dice)
  ).toFixed(1)

  return returnVal
}

const calcShotStr = (team, teamBuffValue, dice) => {
  const returnVal = +(
    (team.shoot * teamBuffValue)
    + diceMaxInt(dice)
  ).toFixed(1)

  return returnVal
}

const calcSaveStr = (team, teamBuffValue, dice) => {
  const returnVal = +(
    (team.save * teamBuffValue)
    + diceMaxInt(dice)
  ).toFixed(1)

  return returnVal
}

const updateTeam = (team, ...updateCallbacks) => {
  updateCallbacks.forEach(callback => callback(team))
}

const createSchedule2 = (clubsArr) => {
  const numClubs = clubsArr.length;
  const numMatchdays = (numClubs - 1) * 2; // Two halves

  const shuffledClubs = shuffleClubs(clubsArr)

  // Initialize schedule object
  // const schedule = Array.from({ length: numMatchdays }, () => []);   // as Array
  const schedule = {};

  // Generate first half of the schedule using modified round-robin algorithm
  for (let day = 0; day < numClubs - 1; day++) {
    schedule[day] = []
    for (let i = 0; i < numClubs / 2; i++) {
      const homeClub = shuffledClubs[i];
      const awayClub = shuffledClubs[numClubs - 1 - i];
      if (day % 2 === 1) {
        schedule[day].push({ "day": day + 1, "match": i + 1, "home": awayClub, "away": homeClub });
      } else {
        schedule[day].push({ "day": day + 1, "match": i + 1, "home": homeClub, "away": awayClub });
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
    for (let match of schedule[day]) {
      schedule[(day + numClubs - 1)] = schedule[(day + numClubs - 1)] || [];  // {} only special ?!
      schedule[(day + numClubs - 1)].push({ "day": day + numClubs, "match": match.match, "home": match.away, "away": match.home });
    }
  }
  return schedule;
}

const shuffleClubs = (clubsArr) => {
  // Create shallow copy
  const shuffledClubs = [...clubsArr]

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

const createSchedule = (clubsArr) => {
  const numClubs = clubsArr.length;
  const numMatchdays = (numClubs - 1) * 2; // Two halves

  const shuffledClubs = shuffleClubs(clubsArr)

  // Initialize schedule object
  // const schedule = Array.from({ length: numMatchdays }, () => []);   // as Array
  const schedule = {
    season: 2023,
    league: 'DEL2',
    matchdayList: Array.from({ length: numMatchdays }, () => [])
  };

  // Generate first half of the schedule using modified round-robin algorithm
  for (let day = 0; day < numClubs - 1; day++) {
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

// sort for points -> goals_diff -> goals
const updateLiveTable = (clubsArr) => {
  // return [...clubsArr].map((club) => {
  //   club.goals_diff = club.goals_diff()
  //   club.points_per_match = club.points_per_match()
  //   club.goals_per_match = club.goals_per_match()
  //   club.goals_against_per_match = club.goals_against_per_match()
  //   return club
  // }).sort((a, b) => {
  //   return (
  //     b.points - a.points ||
  //     b.goals_diff() - a.goals_diff() ||
  //     b.goals - a.goals
  //   )
  // })

  const sortedArray = clubsArr.sort((a, b) => {
    if (a.matchesPlayed === 0 && b.matchesPlayed === 0) {
      return b.seedStrength() - a.seedStrength()
    }
    return (
      b.points - a.points ||
      b.goalsDiff() - a.goalsDiff() ||
      b.goals - a.goals
    )
  })

  sortedArray.forEach((entry, index) => {
    entry.tablePosition = index + 1
  })

  return sortedArray
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

export {
  calcMomentum,
  calcTeamBuff,
  calcAttPlayStr,
  calcDefPlayStr,
  calcShotStr,
  calcSaveStr,
  updateTeam,
  shuffleClubs,
  createSchedule,
  updateLiveTable,
  updatePoints,
}