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
        <div class="column" :class="{ 'bold': sortTopic === 'resultsL5Average' }" @click="setSortTopic('resultsL5Average')" v-if="showTable">
          <label>R5ø</label>
        </div>
        <div class="column" :class="{ 'bold': sortTopic === 'form' }" @click="setSortTopic('form')" v-if="showTable">
          <label>Fo</label>
        </div>
        <div class="column" :class="{ 'bold': sortTopic === 'formAverage' }" @click="setSortTopic('formAverage')" v-if="showTable">
          <label>Foø</label>
        </div>
        <div class="column" :class="{ 'bold': sortTopic === 'morale' }" @click="setSortTopic('morale')" v-if="showTable">
          <label>Mr</label>
        </div>
        <div class="column" :class="{ 'bold': sortTopic === 'buffAverage' }" @click="setSortTopic('buffAverage')" v-if="showTable">
          <label>Buø</label>
        </div>
        <div class="column" :class="{ 'bold': sortTopic === 'shotsPercentage' }" @click="setSortTopic('shotsPercentage')" v-if="showTable">
          <label>Sh%</label>
        </div>
        <div class="column" :class="{ 'bold': sortTopic === 'savesPercentage' }" @click="setSortTopic('savesPercentage')" v-if="showTable">
          <label>Sa%</label>
        </div>
        <div class="column" :class="{ 'bold': sortTopic === 'shotsSavesPercentage' }" @click="setSortTopic('shotsSavesPercentage')" v-if="showTable">
          <label>∑%</label>
        </div>
        <div class="column" :class="{ 'bold': sortTopic === 'playsDiff' }" @click="setSortTopic('playsDiff')" v-if="showDetails">
          <label>Pl</label>
        </div>
        <div class="column" :class="{ 'bold': sortTopic === 'initiativeStrAverage' }" @click="setSortTopic('initiativeStrAverage')" v-if="showDetails">
          <label>Inø</label>
        </div>
        <div class="column" :class="{ 'bold': sortTopic === 'initiativeStrDiceAverage' }" @click="setSortTopic('initiativeStrDiceAverage')" v-if="showDetails">
          <label>InDø</label>
        </div>
        <div class="column" :class="{ 'bold': sortTopic === 'attackStrAverage' }" @click="setSortTopic('attackStrAverage')" v-if="showDetails">
          <label>Atø</label>
        </div>
        <div class="column" :class="{ 'bold': sortTopic === 'attackStrDiceAverage' }" @click="setSortTopic('attackStrDiceAverage')" v-if="showDetails">
          <label>AtDø</label>
        </div>
        <div class="column" :class="{ 'bold': sortTopic === 'shotStrAverage' }" @click="setSortTopic('shotStrAverage')" v-if="showDetails">
          <label>Shø</label>
        </div>
        <div class="column" :class="{ 'bold': sortTopic === 'shotStrDiceAverage' }" @click="setSortTopic('shotStrDiceAverage')" v-if="showDetails">
          <label>ShDø</label>
        </div>
        <div class="column" :class="{ 'bold': sortTopic === 'defendStrAverage' }" @click="setSortTopic('defendStrAverage')" v-if="showDetails">
          <label>Deø</label>
        </div>
        <div class="column" :class="{ 'bold': sortTopic === 'defendStrDiceAverage' }" @click="setSortTopic('defendStrDiceAverage')" v-if="showDetails">
          <label>DeDø</label>
        </div>
        <div class="column" :class="{ 'bold': sortTopic === 'saveStrAverage' }" @click="setSortTopic('saveStrAverage')" v-if="showDetails">
          <label>Saø</label>
        </div>
        <div class="column" :class="{ 'bold': sortTopic === 'saveStrDiceAverage' }" @click="setSortTopic('saveStrDiceAverage')" v-if="showDetails">
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
        </div>
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
          <div class="column" :class="{ 'bold': sortTopic === 'resultsL5Average' || focusClub === club.initials}" v-if="showTable">
            <label>{{ club.resultsL5Average() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'form' || focusClub === club.initials}" v-if="showTable">
            <label>{{ parseFloat((club.form).toFixed(2)) }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'formAverage' || focusClub === club.initials}" v-if="showTable">
            <label>{{ (club.formAverage()) }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'morale' || focusClub === club.initials}" v-if="showTable">
            <label>{{ parseFloat((club.morale).toFixed(2)) }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'buffAverage' || focusClub === club.initials}" v-if="showTable">
            <label>{{ (club.buffAverage()) }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'shotsPercentage' || focusClub === club.initials}" v-if="showTable">
            <label>{{ club.shotsPercentage() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'savesPercentage' || focusClub === club.initials}" v-if="showTable">
            <label>{{ club.savesPercentage() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'shotsSavesPercentage' || focusClub === club.initials}" v-if="showTable">
            <label>{{ club.shotsSavesPercentage() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'playsDiff' || focusClub === club.initials}" v-if="showDetails">
            <label>{{ club.playsDiff() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'initiativeStrAverage' || focusClub === club.initials}" v-if="showDetails">
            <label>{{ club.initiativeStrAverage() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'initiativeStrDiceAverage' || focusClub === club.initials}" v-if="showDetails">
            <label>{{ club.initiativeStrDiceAverage() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'attackStrAverage' || focusClub === club.initials}" v-if="showDetails">
            <label>{{ club.attackStrAverage() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'attackStrDiceAverage' || focusClub === club.initials}" v-if="showDetails">
            <label>{{ club.attackStrDiceAverage() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'shotStrAverage' || focusClub === club.initials}" v-if="showDetails">
            <label>{{ club.shotStrAverage() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'shotStrDiceAverage' || focusClub === club.initials}" v-if="showDetails">
            <label>{{ club.shotStrDiceAverage() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'defendStrAverage' || focusClub === club.initials}" v-if="showDetails">
            <label>{{ club.defendStrAverage() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'defendStrDiceAverage' || focusClub === club.initials}" v-if="showDetails">
            <label>{{ club.defendStrDiceAverage() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'saveStrAverage' || focusClub === club.initials}" v-if="showDetails">
            <label>{{ club.saveStrAverage() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'saveStrDiceAverage' || focusClub === club.initials}" v-if="showDetails">
            <label>{{ club.saveStrDiceAverage() }}</label>
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
          </div>
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