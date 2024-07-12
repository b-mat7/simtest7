<template>
  <div class="display-tables-wrapper">
    <div class="live-table">
      <div class="header">
        <div class="column sticky-left-0 split">
          <label @click="showTable = !showTable">Live</label>
          <label @click="setSortTopic('')">Rank</label>
        </div>
        <div class="column sticky-left-1" @click="showDetails = !showDetails">
          <label>+++</label>
        </div>
        <div class="column" :class="{ 'bold': sortTopic === 'matchesPlayed' }" @click="setSortTopic('matchesPlayed')" v-if="showTable">
          <label>M</label>
        </div>
        <div class="column" :class="{ 'bold': sortTopic === 'goals' }" @click="setSortTopic('goals')" v-if="showTable">
          <label>G</label>
        </div>
        <div class="column" :class="{ 'bold': sortTopic === 'goalsAgainst' }" @click="setSortTopic('goalsAgainst')" v-if="showTable">
          <label>GA</label>
        </div>
        <div class="column" :class="{ 'bold': sortTopic === 'goalsDiff' }" @click="setSortTopic('goalsDiff')" v-if="showTable">
          <label>Dif</label>
        </div>
        <div class="column" :class="{ 'bold': sortTopic === '' || sortTopic === 'points' }" @click="setSortTopic('points')">
          <label>P</label>
        </div>
        <div class="column" :class="{ 'bold': sortTopic === 'goalsPerMatch' }" @click="setSortTopic('goalsPerMatch')" v-if="showDetails">
          <label>G/M</label>
        </div>
        <div class="column" :class="{ 'bold': sortTopic === 'goalsAgainstPerMatch' }" @click="setSortTopic('goalsAgainstPerMatch')" v-if="showDetails">
          <label>GA/M</label>
        </div>
        <div class="column" :class="{ 'bold': sortTopic === 'goalsDiffPerMatch' }" @click="setSortTopic('goalsDiffPerMatch')" v-if="showDetails">
          <label>Dif/M</label>
        </div>
        <div class="column" :class="{ 'bold': sortTopic === 'pointsPerMatch' }" @click="setSortTopic('pointsPerMatch')" v-if="showDetails">
          <label>P/M</label>
        </div>
        <div class="column" :class="{ 'bold': sortTopic === 'resultsL5Avg' }" @click="setSortTopic('resultsL5Avg')" v-if="showTable">
          <label>R5ø</label>
        </div>
        <div class="column" :class="{ 'bold': sortTopic === 'momentumAvg' }" @click="setSortTopic('momentumAvg')" v-if="showTable">
          <label>Mmø</label>
        </div>
        <div class="column" :class="{ 'bold': sortTopic === 'form' }" @click="setSortTopic('form')" v-if="showTable">
          <label>Fo</label>
        </div>
        <div class="column" :class="{ 'bold': sortTopic === 'formAvg' }" @click="setSortTopic('formAvg')" v-if="showTable">
          <label>Foø</label>
        </div>
        <div class="column" :class="{ 'bold': sortTopic === 'morale' }" @click="setSortTopic('morale')" v-if="showTable">
          <label>Mr</label>
        </div>
        <div class="column" :class="{ 'bold': sortTopic === 'buffAvg' }" @click="setSortTopic('buffAvg')" v-if="showTable">
          <label>Buø</label>
        </div>
        <div class="column" :class="{ 'bold': sortTopic === 'shotsEff' }" @click="setSortTopic('shotsEff')" v-if="showTable">
          <label>Sh%</label>
        </div>
        <div class="column" :class="{ 'bold': sortTopic === 'savesEff' }" @click="setSortTopic('savesEff')" v-if="showTable">
          <label>Sa%</label>
        </div>
        <div class="column" :class="{ 'bold': sortTopic === 'shotsSavesEff' }" @click="setSortTopic('shotsSavesEff')" v-if="showTable">
          <label>∑%</label>
        </div>
        <div class="column" :class="{ 'bold': sortTopic === 'initiativesDiff' }" @click="setSortTopic('initiativesDiff')" v-if="showDetails">
          <label>In#</label>
        </div>
        <div class="column" :class="{ 'bold': sortTopic === 'transitionsDiff' }" @click="setSortTopic('transitionsDiff')" v-if="showDetails">
          <label>Tr#</label>
        </div>
        <div class="column" :class="{ 'bold': sortTopic === 'initiativeStrAvg' }" @click="setSortTopic('initiativeStrAvg')" v-if="showDetails">
          <label>Inø</label>
        </div>
        <div class="column" :class="{ 'bold': sortTopic === 'initiativeStrDiceAvg' }" @click="setSortTopic('initiativeStrDiceAvg')" v-if="showDetails">
          <label>InDø</label>
        </div>
        <div class="column" :class="{ 'bold': sortTopic === 'transitionStrAvg' }" @click="setSortTopic('transitionStrAvg')" v-if="showDetails">
          <label>Trø</label>
        </div>
        <div class="column" :class="{ 'bold': sortTopic === 'transitionStrDiceAvg' }" @click="setSortTopic('transitionStrDiceAvg')" v-if="showDetails">
          <label>TrDø</label>
        </div>
        <!-- <div class="column" :class="{ 'bold': sortTopic === 'attackStrAvg' }" @click="setSortTopic('attackStrAvg')" v-if="showDetails">
          <label>Atø</label>
        </div>
        <div class="column" :class="{ 'bold': sortTopic === 'attackStrDiceAvg' }" @click="setSortTopic('attackStrDiceAvg')" v-if="showDetails">
          <label>AtDø</label>
        </div>
        <div class="column" :class="{ 'bold': sortTopic === 'shotStrAvg' }" @click="setSortTopic('shotStrAvg')" v-if="showDetails">
          <label>Shø</label>
        </div>
        <div class="column" :class="{ 'bold': sortTopic === 'shotStrDiceAvg' }" @click="setSortTopic('shotStrDiceAvg')" v-if="showDetails">
          <label>ShDø</label>
        </div>
        <div class="column" :class="{ 'bold': sortTopic === 'defendStrAvg' }" @click="setSortTopic('defendStrAvg')" v-if="showDetails">
          <label>Deø</label>
        </div>
        <div class="column" :class="{ 'bold': sortTopic === 'defendStrDiceAvg' }" @click="setSortTopic('defendStrDiceAvg')" v-if="showDetails">
          <label>DeDø</label>
        </div>
        <div class="column" :class="{ 'bold': sortTopic === 'saveStrAvg' }" @click="setSortTopic('saveStrAvg')" v-if="showDetails">
          <label>Saø</label>
        </div>
        <div class="column" :class="{ 'bold': sortTopic === 'saveStrDiceAvg' }" @click="setSortTopic('saveStrDiceAvg')" v-if="showDetails">
          <label>SaDø</label>
        </div>
        <div class="column" :class="{ 'bold': sortTopic === 'wins' }" @click="setSortTopic('wins')" v-if="showDetails">
          <label>W</label>
        </div>
        <div class="column" :class="{ 'bold': sortTopic === 'winsOvertime' }" @click="setSortTopic('winsOvertime')" v-if="showDetails">
          <label>OTW</label>
        </div>
        <div class="column" :class="{ 'bold': sortTopic === 'lossesOvertime' }" @click="setSortTopic('lossesOvertime')" v-if="showDetails">
          <label>OTL</label>
        </div>
        <div class="column" :class="{ 'bold': sortTopic === 'losses' }" @click="setSortTopic('losses')" v-if="showDetails">
          <label>L</label>
        </div> -->
        <div class="column" :class="{ 'bold': sortTopic === 'seed' }" @click="setSortTopic('seed')" v-if="showTable">
          <label>Seed</label>
        </div>
        <div class="column" :class="{ 'bold': sortTopic === 'rankSeed' }" @click="setSortTopic('rankSeed')" v-if="showTable">
          <label>SRa</label>
        </div>
        <div class="column" :class="{ 'bold': sortTopic === 'rankMatchday' }" @click="setSortTopic('rankMatchday')" v-if="showTable">
          <label>DRa</label>
        </div>
        <div class="column" :class="{ 'bold': sortTopic === 'roleDiff' }" @click="setSortTopic('roleDiff')"
          v-if="showTable">
          <label>RDiff</label>
        </div>
        <div class="column" v-if="showTable">
          <label>Role</label>
        </div>
        <div class="column" :class="{ 'bold': sortTopic === 'initiative' }" @click="setSortTopic('initiative')"
          v-if="showTable">
          <label>In</label>
        </div>
        <div class="column" :class="{ 'bold': sortTopic === 'transition' }" @click="setSortTopic('transition')"
          v-if="showTable">
          <label>Tr</label>
        </div>
      </div>
      <div class="body">
        <li v-for="(club, index) in liveTable" :key="index" class="entry">
          <div class="column sticky-left-0" :class="{ 'bold': focusClub === club.initials}">
            <label>{{ club.rankLive }}</label>
          </div>
          <div class="column sticky-left-1" :class="{ 'bold': focusClub === club.initials}" @click="setFocusClub(club)">
            <label>{{ club.initials }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'matchesPlayed' || focusClub === club.initials}" v-if="showTable">
            <label>{{ club.matchesPlayed }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'goals' || focusClub === club.initials}" v-if="showTable">
            <label>{{ club.goals }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'goalsAgainst' || focusClub === club.initials}" v-if="showTable">
            <label>{{ club.goalsAgainst }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'goalsDiff' || focusClub === club.initials}" v-if="showTable">
            <label>{{ club.goalsDiff() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === '' || sortTopic === 'points' || focusClub === club.initials}">
            <label>{{ club.points }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'goalsPerMatch' || focusClub === club.initials}" v-if="showDetails">
            <label>{{ club.goalsPerMatch() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'goalsAgainstPerMatch' || focusClub === club.initials}" v-if="showDetails">
            <label>{{ club.goalsAgainstPerMatch() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'goalsDiffPerMatch' || focusClub === club.initials}" v-if="showDetails">
            <label>{{ club.goalsDiffPerMatch() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'pointsPerMatch' || focusClub === club.initials}" v-if="showDetails">
            <label>{{ club.pointsPerMatch() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'resultsL5Avg' || focusClub === club.initials}" v-if="showTable">
            <label>{{ club.resultsL5Avg() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'momentumAvg' || focusClub === club.initials}" v-if="showTable">
            <label>{{ (club.momentumAvg()) }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'form' || focusClub === club.initials}" v-if="showTable">
            <label>{{ parseFloat((club.form).toFixed(2)) }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'formAvg' || focusClub === club.initials}" v-if="showTable">
            <label>{{ (club.formAvg()) }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'morale' || focusClub === club.initials}" v-if="showTable">
            <label>{{ parseFloat((club.morale).toFixed(2)) }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'buffAvg' || focusClub === club.initials}" v-if="showTable">
            <label>{{ (club.buffAvg()) }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'shotsEff' || focusClub === club.initials}" v-if="showTable">
            <label>{{ club.shotsEff() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'savesEff' || focusClub === club.initials}" v-if="showTable">
            <label>{{ club.savesEff() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'shotsSavesEff' || focusClub === club.initials}" v-if="showTable">
            <label>{{ club.shotsSavesEff() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'initiativesDiff' || focusClub === club.initials}" v-if="showDetails">
            <label>{{ club.initiativesDiff() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'transitionsDiff' || focusClub === club.initials}" v-if="showDetails">
            <label>{{ club.transitionsDiff() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'initiativeStrAvg' || focusClub === club.initials}" v-if="showDetails">
            <label>{{ club.initiativeStrAvg() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'initiativeStrDiceAvg' || focusClub === club.initials}" v-if="showDetails">
            <label>{{ club.initiativeStrDiceAvg() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'transitionStrAvg' || focusClub === club.initials}" v-if="showDetails">
            <label>{{ club.transitionStrAvg() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'transitionStrDiceAvg' || focusClub === club.initials}" v-if="showDetails">
            <label>{{ club.transitionStrDiceAvg() }}</label>
          </div>
          <!-- <div class="column" :class="{ 'bold': sortTopic === 'attackStrAvg' || focusClub === club.initials}" v-if="showDetails">
            <label>{{ club.attackStrAvg() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'attackStrDiceAvg' || focusClub === club.initials}" v-if="showDetails">
            <label>{{ club.attackStrDiceAvg() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'shotStrAvg' || focusClub === club.initials}" v-if="showDetails">
            <label>{{ club.shotStrAvg() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'shotStrDiceAvg' || focusClub === club.initials}" v-if="showDetails">
            <label>{{ club.shotStrDiceAvg() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'defendStrAvg' || focusClub === club.initials}" v-if="showDetails">
            <label>{{ club.defendStrAvg() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'defendStrDiceAvg' || focusClub === club.initials}" v-if="showDetails">
            <label>{{ club.defendStrDiceAvg() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'saveStrAvg' || focusClub === club.initials}" v-if="showDetails">
            <label>{{ club.saveStrAvg() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'saveStrDiceAvg' || focusClub === club.initials}" v-if="showDetails">
            <label>{{ club.saveStrDiceAvg() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'wins' || focusClub === club.initials}" v-if="showDetails">
            <label>{{ club.wins() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'winsOvertime' || focusClub === club.initials}" v-if="showDetails">
            <label>{{ club.winsOvertime() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'lossesOvertime' || focusClub === club.initials}" v-if="showDetails">
            <label>{{ club.lossesOvertime() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'losses' || focusClub === club.initials}" v-if="showDetails">
            <label>{{ club.losses() }}</label>
          </div> -->
          <div class="column" :class="{ 'bold': sortTopic === 'seed' || focusClub === club.initials}" v-if="showTable">
            <label>{{ club.seed() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'rankSeed' || focusClub === club.initials}" v-if="showTable">
            <label>{{ club.rankSeed }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'rankMatchday' || focusClub === club.initials}" v-if="showTable">
            <label>{{ club.rankMatchday }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'roleDiff' || focusClub === club.initials}" v-if="showTable">
            <label>{{ club.roleDiff }}</label>
          </div>
          <div class="column" :class="{ 'bold': focusClub === club.initials}"v-if="showTable">
            <label>{{ club.role.slice(0, 5) }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'initiative' || focusClub === club.initials}" v-if="showTable">
            <label>{{ club.initiative }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'transition' || focusClub === club.initials}" v-if="showTable">
            <label>{{ club.transition }}</label>
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
      showTable: true,
      showDetails: false,
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
    border: 1px solid #fff;
    border-radius: 8px;

    .header {
      display: flex;
      justify-content: flex-end;
      column-gap: 4px;
      padding: 4px 8px;
      border-bottom: 1px solid #fff;
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
      border-top: 1px solid #fff;
    }

    .bold {
      font-weight: bold;
    }

    .sticky-left-0 {
      position: sticky;
      left: 0;
      background-color: #242424;
      // backdrop-filter: blur(20px)
    }

    .sticky-left-1 {
      position: sticky;
      left: 2.5rem;
      background-color: #242424;
    }

    .split {
      font-size: 0.5rem;
      display: flex;
      flex-direction: column;
    }
  }
}
</style>