<template>
  <div class="display-tables-wrapper">
    <div class="live-table">
      <div class="header">
        <!-- TABLE HEADER -->
        <div class="column sticky-left-0 split">
          <label title="View seed & other details" class="interact" :class="{ 'bold': seedDetails }" @click="seedDetails = !seedDetails">Seed</label>
          <label title="Sort for rank" class="interact" @click="setSortTopic('')">Rank</label>
        </div>


        <!-- Default columns -->
        <div class="column sticky-left-1 split">
          <label title="View result details" class="interact" :class="{ 'bold': resultDetails }" @click="resultDetails = !resultDetails">Result</label>
          <label title="View performance details" class="interact" :class="{ 'bold': perfDetails }" @click="perfDetails = !perfDetails">Perf</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'matchesPlayed' }" @click="setSortTopic('matchesPlayed')">
          <label title="Matches played">M</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'goals' }" @click="setSortTopic('goals')">
          <label title="Goals">G</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'goalsAgainst' }" @click="setSortTopic('goalsAgainst')">
          <label title="Goals against">GA</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'goalsDiff' }" @click="setSortTopic('goalsDiff')">
          <label title="Goals difference">Dif</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === '' || sortTopic === 'points' }" @click="setSortTopic('points')">
          <label title="Points">P</label>
        </div>


        <!-- Result details -->
        <div class="column interact" :class="{ 'bold': sortTopic === 'goalsPerMatch' }" @click="setSortTopic('goalsPerMatch')" v-if="resultDetails">
          <label title="Goals per match">G/M</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'goalsAgainstPerMatch' }" @click="setSortTopic('goalsAgainstPerMatch')" v-if="resultDetails">
          <label title="Goals against per match">GA/M</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'goalsDiffPerMatch' }" @click="setSortTopic('goalsDiffPerMatch')" v-if="resultDetails">
          <label title="Goals difference per match">Dif/M</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'pointsPerMatch' }" @click="setSortTopic('pointsPerMatch')" v-if="resultDetails">
          <label title="Points per match">P/M</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'wins' }" @click="setSortTopic('wins')" v-if="resultDetails">
          <label title="Wins">W</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'winsOvertime' }" @click="setSortTopic('winsOvertime')" v-if="resultDetails">
          <label title="Overtime wins">OTW</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'lossesOvertime' }" @click="setSortTopic('lossesOvertime')" v-if="resultDetails">
          <label title="Overtime losses">OTL</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'losses' }" @click="setSortTopic('losses')" v-if="resultDetails">
          <label title="Losses">L</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'priceMoney' }" @click="setSortTopic('priceMoney')" v-if="resultDetails">
          <label title="Price money (in thousand)">Pr$</label>
        </div>


        <!-- Performance details -->
        <div class="column interact" :class="{ 'bold': sortTopic === 'resultsL5Avg' }" @click="setSortTopic('resultsL5Avg')" v-if="perfDetails">
          <label title="Results (points) last 5 games avg">R5ø</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'momentumAvg' }" @click="setSortTopic('momentumAvg')" v-if="perfDetails">
          <label title="Momentum avg">Mmø</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'form' }" @click="setSortTopic('form')" v-if="perfDetails">
          <label title="Form">Fo</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'formAvg' }" @click="setSortTopic('formAvg')" v-if="perfDetails">
          <label title="Form avg">Foø</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'morale' }" @click="setSortTopic('morale')" v-if="perfDetails">
          <label title="Morale">Mr</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'moraleAvg' }" @click="setSortTopic('moraleAvg')" v-if="perfDetails">
          <label title="Morale avg">Mrø</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'shotsEff' }" @click="setSortTopic('shotsEff')" v-if="perfDetails">
          <label title="Shots efficiency">Sh%</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'savesEff' }" @click="setSortTopic('savesEff')" v-if="perfDetails">
          <label title="Saves efficiency">Sa%</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'shotsSavesEff' }" @click="setSortTopic('shotsSavesEff')" v-if="perfDetails">
          <label title="Sum of Shots & Saves efficiency">∑%</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'initiativesDiff' }" @click="setSortTopic('initiativesDiff')" v-if="perfDetails">
          <label title="Initiatives difference">In#</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'transitionsDiff' }" @click="setSortTopic('transitionsDiff')" v-if="perfDetails">
          <label title="Transitions difference">Tr#</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'initiativeStrAvg' }" @click="setSortTopic('initiativeStrAvg')" v-if="perfDetails">
          <label title="Initiative strength avg">Inø</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'initiativeStrDiceAvg' }" @click="setSortTopic('initiativeStrDiceAvg')" v-if="perfDetails">
          <label title="Initiative strength dice avg">InDø</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'transitionStrAvg' }" @click="setSortTopic('transitionStrAvg')" v-if="perfDetails">
          <label title="Transition strength avg">Trø</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'transitionStrDiceAvg' }" @click="setSortTopic('transitionStrDiceAvg')" v-if="perfDetails">
          <label title="Transition strength dice avg">TrDø</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'attackStrAvg' }" @click="setSortTopic('attackStrAvg')" v-if="perfDetails">
          <label title="Attack strength avg">Atø</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'attackStrDiceAvg' }" @click="setSortTopic('attackStrDiceAvg')" v-if="perfDetails">
          <label title="Attack strength dice avg">AtDø</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'shotStrAvg' }" @click="setSortTopic('shotStrAvg')" v-if="perfDetails">
          <label title="Shot strength avg">Shø</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'shotStrDiceAvg' }" @click="setSortTopic('shotStrDiceAvg')" v-if="perfDetails">
          <label title="Shot strength dice avg">ShDø</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'defendStrAvg' }" @click="setSortTopic('defendStrAvg')" v-if="perfDetails">
          <label title="Defend strength avg">Deø</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'defendStrDiceAvg' }" @click="setSortTopic('defendStrDiceAvg')" v-if="perfDetails">
          <label title="Defend strength dice avg">DeDø</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'saveStrAvg' }" @click="setSortTopic('saveStrAvg')" v-if="perfDetails">
          <label title="Save strength avg">Saø</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'saveStrDiceAvg' }" @click="setSortTopic('saveStrDiceAvg')" v-if="perfDetails">
          <label title="Save strength dice avg">SaDø</label>
        </div>
        

        <!-- Seed & other details -->
        <div class="column interact" :class="{ 'bold': sortTopic === 'seed' }" @click="setSortTopic('seed')" v-if="seedDetails">
          <label title="Seed">Seed</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'rankSeed' }" @click="setSortTopic('rankSeed')" v-if="seedDetails">
          <label title="Seed rank">SRa</label>
        </div>
        <!-- <div class="column interact" :class="{ 'bold': sortTopic === 'rankMatchday' }" @click="setSortTopic('rankMatchday')" v-if="seedDetails">
          <label title="Day rank">DRa</label>
        </div> -->
        <div class="column" v-if="seedDetails">
          <label title="Role">Role</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'roleDiff' }" @click="setSortTopic('roleDiff')" v-if="seedDetails">
          <label title="Role difference">RDiff</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'initiative' }" @click="setSortTopic('initiative')" v-if="seedDetails">
          <label title="Initiative">In</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'transition' }" @click="setSortTopic('transition')" v-if="seedDetails">
          <label title="Transition">Tr</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'attack' }" @click="setSortTopic('attack')" v-if="seedDetails">
          <label title="Transition">At</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'shoot' }" @click="setSortTopic('shoot')" v-if="seedDetails">
          <label title="Transition">Sh</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'defend' }" @click="setSortTopic('defend')" v-if="seedDetails">
          <label title="Transition">De</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'save' }" @click="setSortTopic('save')" v-if="seedDetails">
          <label title="Transition">Sa</label>
        </div>
      </div>


      <!-- TABLE CONTENT -->
      <div class="body">
        <!-- Default columns -->
        <li v-for="(club, index) in liveTable" :key="index" class="entry">
          <div class="column sticky-left-0" :class="{ 'bold': focusClub === club.initials}">
            <label>{{ club.rankLive }}</label>
          </div>
          <div class="column sticky-left-1 interact" :class="{ 'bold': focusClub === club.initials}" @click="setFocusClub(club)">
            <label>{{ club.initials }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'matchesPlayed' || focusClub === club.initials}">
            <label>{{ club.matchesPlayed }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'goals' || focusClub === club.initials}">
            <label>{{ club.goals }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'goalsAgainst' || focusClub === club.initials}">
            <label>{{ club.goalsAgainst }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'goalsDiff' || focusClub === club.initials}">
            <label>{{ club.goalsDiff() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === '' || sortTopic === 'points' || focusClub === club.initials}">
            <label>{{ club.points }}</label>
          </div>


          <!-- Result details -->
          <div class="column" :class="{ 'bold': sortTopic === 'goalsPerMatch' || focusClub === club.initials}" v-if="resultDetails">
            <label>{{ club.goalsPerMatch() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'goalsAgainstPerMatch' || focusClub === club.initials}" v-if="resultDetails">
            <label>{{ club.goalsAgainstPerMatch() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'goalsDiffPerMatch' || focusClub === club.initials}" v-if="resultDetails">
            <label>{{ club.goalsDiffPerMatch() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'pointsPerMatch' || focusClub === club.initials}" v-if="resultDetails">
            <label>{{ club.pointsPerMatch() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'wins' || focusClub === club.initials}" v-if="resultDetails">
            <label>{{ club.wins() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'winsOvertime' || focusClub === club.initials}" v-if="resultDetails">
            <label>{{ club.winsOvertime() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'lossesOvertime' || focusClub === club.initials}" v-if="resultDetails">
            <label>{{ club.lossesOvertime() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'losses' || focusClub === club.initials}" v-if="resultDetails">
            <label>{{ club.losses() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'priceMoney' || focusClub === club.initials}" v-if="resultDetails">
            <label>{{ (club.priceMoney / 1000).toFixed(2) }}</label>
          </div>


          <!-- Performance details -->
          <div class="column" :class="{ 'bold': sortTopic === 'resultsL5Avg' || focusClub === club.initials}" v-if="perfDetails">
            <label>{{ club.resultsL5Avg() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'momentumAvg' || focusClub === club.initials}" v-if="perfDetails">
            <label>{{ (club.momentumAvg()) }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'form' || focusClub === club.initials}" v-if="perfDetails">
            <label>{{ parseFloat((club.form).toFixed(2)) }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'formAvg' || focusClub === club.initials}" v-if="perfDetails">
            <label>{{ (club.formAvg()) }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'morale' || focusClub === club.initials}" v-if="perfDetails">
            <label>{{ parseFloat((club.morale).toFixed(2)) }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'moraleAvg' || focusClub === club.initials}" v-if="perfDetails">
            <label>{{ (club.moraleAvg()) }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'shotsEff' || focusClub === club.initials}" v-if="perfDetails">
            <label>{{ club.shotsEff() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'savesEff' || focusClub === club.initials}" v-if="perfDetails">
            <label>{{ club.savesEff() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'shotsSavesEff' || focusClub === club.initials}" v-if="perfDetails">
            <label>{{ club.shotsSavesEff() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'initiativesDiff' || focusClub === club.initials}" v-if="perfDetails">
            <label>{{ club.initiativesDiff() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'transitionsDiff' || focusClub === club.initials}" v-if="perfDetails">
            <label>{{ club.transitionsDiff() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'initiativeStrAvg' || focusClub === club.initials}" v-if="perfDetails">
            <label>{{ club.initiativeStrAvg() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'initiativeStrDiceAvg' || focusClub === club.initials}" v-if="perfDetails">
            <label>{{ club.initiativeStrDiceAvg() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'transitionStrAvg' || focusClub === club.initials}" v-if="perfDetails">
            <label>{{ club.transitionStrAvg() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'transitionStrDiceAvg' || focusClub === club.initials}" v-if="perfDetails">
            <label>{{ club.transitionStrDiceAvg() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'attackStrAvg' || focusClub === club.initials}" v-if="perfDetails">
            <label>{{ club.attackStrAvg() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'attackStrDiceAvg' || focusClub === club.initials}" v-if="perfDetails">
            <label>{{ club.attackStrDiceAvg() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'shotStrAvg' || focusClub === club.initials}" v-if="perfDetails">
            <label>{{ club.shotStrAvg() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'shotStrDiceAvg' || focusClub === club.initials}" v-if="perfDetails">
            <label>{{ club.shotStrDiceAvg() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'defendStrAvg' || focusClub === club.initials}" v-if="perfDetails">
            <label>{{ club.defendStrAvg() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'defendStrDiceAvg' || focusClub === club.initials}" v-if="perfDetails">
            <label>{{ club.defendStrDiceAvg() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'saveStrAvg' || focusClub === club.initials}" v-if="perfDetails">
            <label>{{ club.saveStrAvg() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'saveStrDiceAvg' || focusClub === club.initials}" v-if="perfDetails">
            <label>{{ club.saveStrDiceAvg() }}</label>
          </div>
          

          <!-- Seed & other details -->
          <div class="column" :class="{ 'bold': sortTopic === 'seed' || focusClub === club.initials}" v-if="seedDetails">
            <label>{{ club.seed() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'rankSeed' || focusClub === club.initials}" v-if="seedDetails">
            <label>{{ club.rankSeed }}</label>
          </div>
          <!-- <div class="column" :class="{ 'bold': sortTopic === 'rankMatchday' || focusClub === club.initials}" v-if="seedDetails">
            <label>{{ club.rankMatchday }}</label>
          </div> -->
          <div class="column" :class="{ 'bold': focusClub === club.initials} "v-if="seedDetails">
            <label>{{ club.role.slice(0, 5) }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'roleDiff' || focusClub === club.initials}" v-if="seedDetails">
            <label>{{ club.roleDiff }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'initiative' || focusClub === club.initials}" v-if="seedDetails">
            <label>{{ club.initiative }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'transition' || focusClub === club.initials}" v-if="seedDetails">
            <label>{{ club.transition }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'attack' || focusClub === club.initials}" v-if="seedDetails">
            <label>{{ club.attack }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'shoot' || focusClub === club.initials}" v-if="seedDetails">
            <label>{{ club.shoot }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'defend' || focusClub === club.initials}" v-if="seedDetails">
            <label>{{ club.defend }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'save' || focusClub === club.initials}" v-if="seedDetails">
            <label>{{ club.save }}</label>
          </div>
        </li>
      </div>
    </div>
  </div>
</template>

<script>
import { updateRank } from '../lib/util.js'

export default {
  name: 'DisplayTables',
  props: {
    clubs : {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      resultDetails: false,
      perfDetails: false,
      seedDetails: false,
      liveTable: [],
      sortTopic: '',
      focusClub: 'FRB'
    }
  },
  methods: {
    createLiveTable(clubs, sortTopic, entryName) {
      this.liveTable = updateRank(clubs, sortTopic, entryName).sort((a, b) => {
        return typeof a[this.sortTopic] === 'function'
          ? b[this.sortTopic]() - a[this.sortTopic]()
          : b[this.sortTopic] - a[this.sortTopic]
      })
    },
    setSortTopic(topic) {
      this.sortTopic = topic
      this.createLiveTable([...this.clubs])
    },
    setFocusClub(club) {
      this.focusClub != club.initials ? this.focusClub = club.initials : this.focusClub = ''
    }
  },
  watch: {
    clubs: {
      handler(newClubs, oldClubs) {
        this.createLiveTable([...newClubs], null, 'rankLive')
      },
      deep: true
    }
  }
}
</script>

<style lang="scss" scoped>
.display-tables-wrapper {
  overflow-x: scroll;
  
  .live-table {
    min-width: fit-content;
    max-width: fit-content;
    list-style: none;
    border: 1px solid #f0275e;
    border-radius: 4px;
    background-color: #3b434c;

    .header {
      display: flex;
      justify-content: flex-end;
      column-gap: 4px;
      font-weight: 700;
      padding: 4px 8px;
      border-bottom: 2px dashed #f0275e;
    }

    .body {
      display: flex;
      flex-direction: column;
    }
    
    .column {
      width: 2.5rem;
      text-align: center;
    }

    .entry {
      display: flex;
      justify-content: flex-end;
      column-gap: 4px;
      padding: 4px 8px;

      &:not(:first-of-type) {
        border-top: 1px dashed #f0275e;
      }
    }

    .bold {
      font-weight: 900;
      color: #f0275e;
    }

    .sticky-left-0 {
      position: sticky;
      left: 0;
      background-color: #3b434c;
      // backdrop-filter: blur(20px)
    }

    .sticky-left-1 {
      position: sticky;
      left: 2.5rem;
      background-color: #3b434c;
    }

    .split {
      font-size: 0.5rem;
      display: flex;
      flex-direction: column;
    }
  }
}
</style>