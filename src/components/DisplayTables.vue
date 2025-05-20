<template>
  <div class="display-tables-wrapper">
    <div class="live-table">
      <div class="header">
        <!-- TABLE HEADER -->
        <div class="column sticky-left-0 split">
          <label title="View role & other details" class="interact" :class="{ 'bold': showRoleDetails }" @click="showRoleDetails = !showRoleDetails">Role</label>
          <label title="Sort for rank" class="interact" @click="setSortTopic('')">Rank</label>
        </div>


        <!-- Default columns -->
        <div class="column sticky-left-1 split">
          <label title="View result details" class="interact" :class="{ 'bold': showResultDetails }" @click="showResultDetails = !showResultDetails">Result</label>
          <label title="View performance details" class="interact" :class="{ 'bold': showPerfDetails }" @click="showPerfDetails = !showPerfDetails">Perf</label>
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


        <!-- RESULT -->
        <div class="column interact" :class="{ 'bold': sortTopic === 'goalsPerMatch' }" @click="setSortTopic('goalsPerMatch')" v-if="showResultDetails">
          <label title="Goals per match">G/M</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'goalsAgainstPerMatch' }" @click="setSortTopic('goalsAgainstPerMatch')" v-if="showResultDetails">
          <label title="Goals against per match">GA/M</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'goalsDiffPerMatch' }" @click="setSortTopic('goalsDiffPerMatch')" v-if="showResultDetails">
          <label title="Goals difference per match">Dif/M</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'pointsPerMatch' }" @click="setSortTopic('pointsPerMatch')" v-if="showResultDetails">
          <label title="Points per match">P/M</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'wins' }" @click="setSortTopic('wins')" v-if="showResultDetails">
          <label title="Wins">W</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'winsOvertime' }" @click="setSortTopic('winsOvertime')" v-if="showResultDetails">
          <label title="Overtime wins">OTW</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'lossesOvertime' }" @click="setSortTopic('lossesOvertime')" v-if="showResultDetails">
          <label title="Overtime losses">OTL</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'losses' }" @click="setSortTopic('losses')" v-if="showResultDetails">
          <label title="Losses">L</label>
        </div>


        <!-- PERF AVG + EFF -->
        <div class="column interact" :class="{ 'bold': sortTopic === 'resultsL5Avg' }" @click="setSortTopic('resultsL5Avg')" v-if="showPerfDetails">
          <label title="Results (points) last 5 games avg">R5ø</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'momentumStrAvg' }" @click="setSortTopic('momentumStrAvg')" v-if="showPerfDetails">
          <label title="Momentum avg">Mmø</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'formStrAvg' }" @click="setSortTopic('formStrAvg')" v-if="showPerfDetails">
          <label title="Form avg">Foø</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'moraleStrAvg' }" @click="setSortTopic('moraleStrAvg')" v-if="showPerfDetails">
          <label title="Morale avg">Mrø</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'shotsEff' }" @click="setSortTopic('shotsEff')" v-if="showPerfDetails">
          <label title="Shots efficiency">Sh%</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'savesEff' }" @click="setSortTopic('savesEff')" v-if="showPerfDetails">
          <label title="Saves efficiency">Sa%</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'shotsSavesEff' }" @click="setSortTopic('shotsSavesEff')" v-if="showPerfDetails">
          <label title="Sum of Shots & Saves efficiency">∑%</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'initiativesDiff' }" @click="setSortTopic('initiativesDiff')" v-if="showPerfDetails">
          <label title="Initiatives difference">In#</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'transitionsDiff' }" @click="setSortTopic('transitionsDiff')" v-if="showPerfDetails">
          <label title="Transitions difference">Tr#</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'initiativeStrAvg' }" @click="setSortTopic('initiativeStrAvg')" v-if="showPerfDetails">
          <label title="Initiative strength avg">Inø</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'initiativeStrDiceAvg' }" @click="setSortTopic('initiativeStrDiceAvg')" v-if="showPerfDetails">
          <label title="Initiative strength dice avg">InDø</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'transitionStrAvg' }" @click="setSortTopic('transitionStrAvg')" v-if="showPerfDetails">
          <label title="Transition strength avg">Trø</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'transitionStrDiceAvg' }" @click="setSortTopic('transitionStrDiceAvg')" v-if="showPerfDetails">
          <label title="Transition strength dice avg">TrDø</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'attackStrAvg' }" @click="setSortTopic('attackStrAvg')" v-if="showPerfDetails">
          <label title="Attack strength avg">Atø</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'attackStrDiceAvg' }" @click="setSortTopic('attackStrDiceAvg')" v-if="showPerfDetails">
          <label title="Attack strength dice avg">AtDø</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'shotStrAvg' }" @click="setSortTopic('shotStrAvg')" v-if="showPerfDetails">
          <label title="Shot strength avg">Shø</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'shotStrDiceAvg' }" @click="setSortTopic('shotStrDiceAvg')" v-if="showPerfDetails">
          <label title="Shot strength dice avg">ShDø</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'defendStrAvg' }" @click="setSortTopic('defendStrAvg')" v-if="showPerfDetails">
          <label title="Defend strength avg">Deø</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'defendStrDiceAvg' }" @click="setSortTopic('defendStrDiceAvg')" v-if="showPerfDetails">
          <label title="Defend strength dice avg">DeDø</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'saveStrAvg' }" @click="setSortTopic('saveStrAvg')" v-if="showPerfDetails">
          <label title="Save strength avg">Saø</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'saveStrDiceAvg' }" @click="setSortTopic('saveStrDiceAvg')" v-if="showPerfDetails">
          <label title="Save strength dice avg">SaDø</label>
        </div>


        <!-- ROLE -->
        <div class="column interact" :class="{ 'bold': sortTopic === 'seed' }" @click="setSortTopic('seed')" v-if="showRoleDetails">
          <label title="Seed">Seed</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'rankSeed' }" @click="setSortTopic('rankSeed')" v-if="showRoleDetails">
          <label title="Seed rank">SRa</label>
        </div>
        <!-- <div class="column interact" :class="{ 'bold': sortTopic === 'rankMatchday' }" @click="setSortTopic('rankMatchday')" v-if="showRoleDetails">
          <label title="Day rank">DRa</label>
        </div> -->
        <div class="column" v-if="showRoleDetails">
          <label title="Role">Role</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'roleDiff' }" @click="setSortTopic('roleDiff')" v-if="showRoleDetails">
          <label title="Role difference">RDiff</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'priceMoney' }" @click="setSortTopic('priceMoney')" v-if="showRoleDetails">
          <label title="Price money (in thousand)">Pr$</label>
        </div>


        <!-- ABILITY -->
        <div class="column interact" :class="{ 'bold': sortTopic === 'initiative' }" @click="setSortTopic('initiative')" v-if="showRoleDetails">
          <label title="Initiative">In</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'transition' }" @click="setSortTopic('transition')" v-if="showRoleDetails">
          <label title="Transition">Tr</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'attack' }" @click="setSortTopic('attack')" v-if="showRoleDetails">
          <label title="Transition">At</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'shoot' }" @click="setSortTopic('shoot')" v-if="showRoleDetails">
          <label title="Transition">Sh</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'defend' }" @click="setSortTopic('defend')" v-if="showRoleDetails">
          <label title="Transition">De</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'save' }" @click="setSortTopic('save')" v-if="showRoleDetails">
          <label title="Transition">Sa</label>
        </div>
        <!-- MOMENTUM -->
        <div class="column interact" :class="{ 'bold': sortTopic === 'form' }" @click="setSortTopic('form')" v-if="showRoleDetails">
          <label title="Form">Fo</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'morale' }" @click="setSortTopic('morale')" v-if="showRoleDetails">
          <label title="Morale">Mr</label>
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


          <!-- RESULT -->
          <div class="column" :class="{ 'bold': sortTopic === 'goalsPerMatch' || focusClub === club.initials}" v-if="showResultDetails">
            <label>{{ club.goalsPerMatch() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'goalsAgainstPerMatch' || focusClub === club.initials}" v-if="showResultDetails">
            <label>{{ club.goalsAgainstPerMatch() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'goalsDiffPerMatch' || focusClub === club.initials}" v-if="showResultDetails">
            <label>{{ club.goalsDiffPerMatch() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'pointsPerMatch' || focusClub === club.initials}" v-if="showResultDetails">
            <label>{{ club.pointsPerMatch() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'wins' || focusClub === club.initials}" v-if="showResultDetails">
            <label>{{ club.wins() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'winsOvertime' || focusClub === club.initials}" v-if="showResultDetails">
            <label>{{ club.winsOvertime() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'lossesOvertime' || focusClub === club.initials}" v-if="showResultDetails">
            <label>{{ club.lossesOvertime() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'losses' || focusClub === club.initials}" v-if="showResultDetails">
            <label>{{ club.losses() }}</label>
          </div>


          <!-- PERF AVG + EFF -->
          <div class="column" :class="{ 'bold': sortTopic === 'resultsL5Avg' || focusClub === club.initials}" v-if="showPerfDetails">
            <label>{{ club.resultsL5Avg() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'momentumStrAvg' || focusClub === club.initials}" v-if="showPerfDetails">
            <label>{{ (club.momentumStrAvg()) }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'formStrAvg' || focusClub === club.initials}" v-if="showPerfDetails">
            <label>{{ (club.formStrAvg()) }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'moraleStrAvg' || focusClub === club.initials}" v-if="showPerfDetails">
            <label>{{ (club.moraleStrAvg()) }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'shotsEff' || focusClub === club.initials}" v-if="showPerfDetails">
            <label>{{ club.shotsEff() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'savesEff' || focusClub === club.initials}" v-if="showPerfDetails">
            <label>{{ club.savesEff() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'shotsSavesEff' || focusClub === club.initials}" v-if="showPerfDetails">
            <label>{{ club.shotsSavesEff() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'initiativesDiff' || focusClub === club.initials}" v-if="showPerfDetails">
            <label>{{ club.initiativesDiff() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'transitionsDiff' || focusClub === club.initials}" v-if="showPerfDetails">
            <label>{{ club.transitionsDiff() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'initiativeStrAvg' || focusClub === club.initials}" v-if="showPerfDetails">
            <label>{{ club.initiativeStrAvg() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'initiativeStrDiceAvg' || focusClub === club.initials}" v-if="showPerfDetails">
            <label>{{ club.initiativeStrDiceAvg() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'transitionStrAvg' || focusClub === club.initials}" v-if="showPerfDetails">
            <label>{{ club.transitionStrAvg() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'transitionStrDiceAvg' || focusClub === club.initials}" v-if="showPerfDetails">
            <label>{{ club.transitionStrDiceAvg() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'attackStrAvg' || focusClub === club.initials}" v-if="showPerfDetails">
            <label>{{ club.attackStrAvg() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'attackStrDiceAvg' || focusClub === club.initials}" v-if="showPerfDetails">
            <label>{{ club.attackStrDiceAvg() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'shotStrAvg' || focusClub === club.initials}" v-if="showPerfDetails">
            <label>{{ club.shotStrAvg() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'shotStrDiceAvg' || focusClub === club.initials}" v-if="showPerfDetails">
            <label>{{ club.shotStrDiceAvg() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'defendStrAvg' || focusClub === club.initials}" v-if="showPerfDetails">
            <label>{{ club.defendStrAvg() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'defendStrDiceAvg' || focusClub === club.initials}" v-if="showPerfDetails">
            <label>{{ club.defendStrDiceAvg() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'saveStrAvg' || focusClub === club.initials}" v-if="showPerfDetails">
            <label>{{ club.saveStrAvg() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'saveStrDiceAvg' || focusClub === club.initials}" v-if="showPerfDetails">
            <label>{{ club.saveStrDiceAvg() }}</label>
          </div>


          <!-- ROLE -->
          <div class="column" :class="{ 'bold': sortTopic === 'seed' || focusClub === club.initials}" v-if="showRoleDetails">
            <label>{{ club.seed() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'rankSeed' || focusClub === club.initials}" v-if="showRoleDetails">
            <label>{{ club.rankSeed }}</label>
          </div>
          <!-- <div class="column" :class="{ 'bold': sortTopic === 'rankMatchday' || focusClub === club.initials}" v-if="showRoleDetails">
            <label>{{ club.rankMatchday }}</label>
          </div> -->
          <div class="column" :class="{ 'bold': focusClub === club.initials} "v-if="showRoleDetails">
            <label>{{ club.role.slice(0, 5) }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'roleDiff' || focusClub === club.initials}" v-if="showRoleDetails">
            <label>{{ club.roleDiff }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'priceMoney' || focusClub === club.initials}" v-if="showRoleDetails">
            <label>{{ (club.priceMoney / 1000).toFixed(2) }}</label>
          </div>


          <!-- ABILITY -->
          <div class="column" :class="{ 'bold': sortTopic === 'initiative' || focusClub === club.initials}" v-if="showRoleDetails">
            <label>{{ club.initiative }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'transition' || focusClub === club.initials}" v-if="showRoleDetails">
            <label>{{ club.transition }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'attack' || focusClub === club.initials}" v-if="showRoleDetails">
            <label>{{ club.attack }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'shoot' || focusClub === club.initials}" v-if="showRoleDetails">
            <label>{{ club.shoot }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'defend' || focusClub === club.initials}" v-if="showRoleDetails">
            <label>{{ club.defend }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'save' || focusClub === club.initials}" v-if="showRoleDetails">
            <label>{{ club.save }}</label>
          </div>
          <!-- MOMENTUM -->
          <div class="column" :class="{ 'bold': sortTopic === 'form' || focusClub === club.initials}" v-if="showRoleDetails">
            <label>{{ formatD2(club.form) }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'morale' || focusClub === club.initials}" v-if="showRoleDetails">
            <label>{{ formatD2(club.morale) }}</label>
          </div>
        </li>
      </div>
    </div>
  </div>
</template>

<script>
import { updateRank, formatD1, formatD2 } from '../lib/util.js'

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
      showResultDetails: false,
      showPerfDetails: false,
      showRoleDetails: false,
      liveTable: [],
      sortTopic: '',
      focusClub: 'FRB'
    }
  },
  methods: {
    formatD1, // need to define it here again to be able to use it in template section
    formatD2,
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
    background-color: #35495e;

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
      background-color: #35495e;
      // backdrop-filter: blur(20px)
    }

    .sticky-left-1 {
      position: sticky;
      left: 2.5rem;
      background-color: #35495e;
    }

    .split {
      font-size: 0.5rem;
      display: flex;
      flex-direction: column;
    }
  }
}
</style>