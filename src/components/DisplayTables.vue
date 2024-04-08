<template>
  <div class="display-tables-wrapper">
    <div class="live-table">
      <div class="header">
        <div class="column sticky-pos0" @click="setSortTopic('')">
          <label>Pos</label>
        </div>
        <div class="column sticky-pos1" @click="showDetails = !showDetails">
          <label>+++</label>
        </div>
        <div class="column" :class="{ 'bold': sortTopic === 'matchesPlayed' }" @click="setSortTopic('matchesPlayed')">
          <label>M</label>
        </div>
        <div class="column" :class="{ 'bold': sortTopic === 'goals' }" @click="setSortTopic('goals')">
          <label>G</label>
        </div>
        <div class="column" :class="{ 'bold': sortTopic === 'goalsAgainst' }" @click="setSortTopic('goalsAgainst')">
          <label>GA</label>
        </div>
        <div class="column" :class="{ 'bold': sortTopic === 'goalsDiff' }" @click="setSortTopic('goalsDiff')">
          <label>Dif</label>
        </div>
        <div class="column" :class="{ 'bold': sortTopic === '' || sortTopic === 'points' }" @click="setSortTopic('points')">
          <label>P</label>
        </div>
        <div class="column" :class="{ 'bold': sortTopic === 'pointsPerMatch' }" @click="setSortTopic('pointsPerMatch')">
          <label>P/M</label>
        </div>
        <div class="column" :class="{ 'bold': sortTopic === 'goalsPerMatch' }" @click="setSortTopic('goalsPerMatch')">
          <label>G/M</label>
        </div>
        <div class="column" :class="{ 'bold': sortTopic === 'goalsAgainstPerMatch' }" @click="setSortTopic('goalsAgainstPerMatch')">
          <label>GA/M</label>
        </div>
        <div class="column" :class="{ 'bold': sortTopic === 'goalsDiffPerMatch' }" @click="setSortTopic('goalsDiffPerMatch')">
          <label>Dif/M</label>
        </div>
        <div class="column" :class="{ 'bold': sortTopic === 'shotsPercentage' }" @click="setSortTopic('shotsPercentage')">
          <label>Sh%</label>
        </div>
        <div class="column" :class="{ 'bold': sortTopic === 'savesPercentage' }" @click="setSortTopic('savesPercentage')">
          <label>Sa%</label>
        </div>
        <div class="column" :class="{ 'bold': sortTopic === 'shotsSavesPercentage' }" @click="setSortTopic('shotsSavesPercentage')">
          <label>∑%</label>
        </div>
        <div class="column" :class="{ 'bold': sortTopic === 'playsDiff' }" @click="setSortTopic('playsDiff')" v-if="showDetails">
          <label>Pl</label>
        </div>
        <div class="column" :class="{ 'bold': sortTopic === 'attPlayStrSum' }" @click="setSortTopic('attPlayStrSum')"v-if="showDetails">
          <label>APStr</label>
        </div>
        <div class="column" :class="{ 'bold': sortTopic === 'attPlayStrAverage' }" @click="setSortTopic('attPlayStrAverage')"v-if="showDetails">
          <label>ø</label>
        </div>
        <div class="column" :class="{ 'bold': sortTopic === 'defPlayStrSum' }" @click="setSortTopic('defPlayStrSum')"v-if="showDetails">
          <label>DPStr</label>
        </div>
        <div class="column" :class="{ 'bold': sortTopic === 'defPlayStrAverage' }" @click="setSortTopic('defPlayStrAverage')"v-if="showDetails">
          <label>ø</label>
        </div>
        <div class="column" :class="{ 'bold': sortTopic === 'shotStrSum' }" @click="setSortTopic('shotStrSum')"v-if="showDetails">
          <label>ShStr</label>
        </div>
        <div class="column" :class="{ 'bold': sortTopic === 'shotStrAverage' }" @click="setSortTopic('shotStrAverage')"v-if="showDetails">
          <label>ø</label>
        </div>
        <div class="column" :class="{ 'bold': sortTopic === 'saveStrSum' }" @click="setSortTopic('saveStrSum')"v-if="showDetails">
          <label>SaStr</label>
        </div>
        <div class="column" :class="{ 'bold': sortTopic === 'saveStrAverage' }" @click="setSortTopic('saveStrAverage')" v-if="showDetails">
          <label>ø</label>
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
        <div class="column" :class="{ 'bold': sortTopic === 'seedStrength' }" @click="setSortTopic('seedStrength')">
          <label>Seed</label>
        </div>
      </div>
      <div class="body">
        <li v-for="(club, index) in liveTable" :key="index" class="entry">
          <div class="column sticky-pos0">
            <label>{{ club.tablePosition }}</label>
          </div>
          <div class="column sticky-pos1">
            <label>{{ club.initials }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'matchesPlayed' }">
            <label>{{ club.matchesPlayed }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'goals' }">
            <label>{{ club.goals }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'goalsAgainst' }">
            <label>{{ club.goalsAgainst }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'goalsDiff' }">
            <label>{{ club.goalsDiff() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === '' || sortTopic === 'points' }">
            <label>{{ club.points }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'pointsPerMatch' }">
            <label>{{ club.pointsPerMatch() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'goalsPerMatch' }">
            <label>{{ club.goalsPerMatch() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'goalsAgainstPerMatch' }">
            <label>{{ club.goalsAgainstPerMatch() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'goalsDiffPerMatch' }">
            <label>{{ club.goalsDiffPerMatch() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'shotsPercentage' }">
            <label>{{ club.shotsPercentage() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'savesPercentage' }">
            <label>{{ club.savesPercentage() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'shotsSavesPercentage' }">
            <label>{{ club.shotsSavesPercentage() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'playsDiff' }" v-if="showDetails">
            <label>{{ club.playsDiff() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'attPlayStrSum' }" v-if="showDetails">
            <label>{{ (club.attPlayStrSum).toFixed() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'attPlayStrAverage' }" v-if="showDetails">
            <label>{{ club.attPlayStrAverage() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'defPlayStrSum' }" v-if="showDetails">
            <label>{{ (club.defPlayStrSum).toFixed() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'defPlayStrAverage' }" v-if="showDetails">
            <label>{{ club.defPlayStrAverage() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'shotStrSum' }" v-if="showDetails">
            <label>{{ (club.shotStrSum).toFixed() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'shotStrAverage' }" v-if="showDetails">
            <label>{{ club.shotStrAverage() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'saveStrSum' }" v-if="showDetails">
            <label>{{ (club.saveStrSum).toFixed() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'saveStrAverage' }" v-if="showDetails">
            <label>{{ club.saveStrAverage() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'wins' }" v-if="showDetails">
            <label>{{ club.wins }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'winsOvertime' }" v-if="showDetails">
            <label>{{ club.winsOvertime }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'lossesOvertime' }" v-if="showDetails">
            <label>{{ club.lossesOvertime }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'losses' }" v-if="showDetails">
            <label>{{ club.losses }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'seedStrength' }">
            <label>{{ club.seedStrength() }}</label>
          </div>
        </li>
      </div>
    </div>
  </div>
</template>

<script>
import { updateLiveTable } from '../lib/util.js'

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
      showDetails: false,
      liveTable: [],
      sortTopic: ''
    }
  },
  methods: {
    createLiveTable(clubs) {
      this.liveTable = updateLiveTable(clubs).sort((a, b) => {
        return typeof a[this.sortTopic] === 'function'
          ? b[this.sortTopic]() - a[this.sortTopic]()
          : b[this.sortTopic] - a[this.sortTopic]
      })
    },
    setSortTopic(topic) {
      this.sortTopic = topic
      this.createLiveTable([...this.clubs])
    }
  },
  watch: {
    clubs: {
      handler(newClubs, oldClubs) {
        this.createLiveTable([...newClubs])
      },
      deep: true
    }
  },
  mounted() {
    this.createLiveTable([...this.clubs])
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
      padding: 8px;
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

    .sticky-pos0 {
      position: sticky;
      left: 0;
      backdrop-filter: blur(20px)
    }

    .sticky-pos1 {
      position: sticky;
      left: 2.5rem;
      backdrop-filter: blur(20px)
    }
  }
}
</style>