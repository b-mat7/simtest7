<template>
  <div class="display-tables-wrapper">
    <div class="live-table">
      <div class="header">
        <!-- TABLE HEADER -->
        <div class="column sticky-left-0 split">
          <label title="Live Table">Live</label>
          <label title="Sort for rank" class="interact" @click="setSortTopic('')">Rank</label>
        </div>


        <!-- Default columns -->
        <div class="column sticky-left-1">
          <label title="Club initials">+++</label>
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
        <div class="column interact" :class="{ 'bold': sortTopic === 'goalsPerMatch' }" @click="setSortTopic('goalsPerMatch')" v-if="globalState.tableShowResultDetails">
          <label title="Goals per match">G/M</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'goalsAgainstPerMatch' }" @click="setSortTopic('goalsAgainstPerMatch')" v-if="globalState.tableShowResultDetails">
          <label title="Goals against per match">GA/M</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'goalsDiffPerMatch' }" @click="setSortTopic('goalsDiffPerMatch')" v-if="globalState.tableShowResultDetails">
          <label title="Goals difference per match">Dif/M</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'pointsPerMatch' }" @click="setSortTopic('pointsPerMatch')" v-if="globalState.tableShowResultDetails">
          <label title="Points per match">P/M</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'wins' }" @click="setSortTopic('wins')" v-if="globalState.tableShowResultDetails">
          <label title="Wins">W</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'winsOvertime' }" @click="setSortTopic('winsOvertime')" v-if="globalState.tableShowResultDetails">
          <label title="Overtime wins">OTW</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'lossesOvertime' }" @click="setSortTopic('lossesOvertime')" v-if="globalState.tableShowResultDetails">
          <label title="Overtime losses">OTL</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'losses' }" @click="setSortTopic('losses')" v-if="globalState.tableShowResultDetails">
          <label title="Losses">L</label>
        </div>


        <!-- PERF EFF -->
        <div class="column" v-if="globalState.tableShowPerfEffDetails">
          <label title="Points last 5 games">P5</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'pointsL5Avg' }" @click="setSortTopic('pointsL5Avg')" v-if="globalState.tableShowPerfEffDetails">
          <label title="Points last 5 games avg">P5ø</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'shotsEff' }" @click="setSortTopic('shotsEff')" v-if="globalState.tableShowPerfEffDetails">
          <label title="Shots efficiency">Sh%</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'savesEff' }" @click="setSortTopic('savesEff')" v-if="globalState.tableShowPerfEffDetails">
          <label title="Saves efficiency">Sa%</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'shotsSavesEff' }" @click="setSortTopic('shotsSavesEff')" v-if="globalState.tableShowPerfEffDetails">
          <label title="Sum of Shots & Saves efficiency">∑%</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'initiativesDiff' }" @click="setSortTopic('initiativesDiff')" v-if="globalState.tableShowPerfEffDetails">
          <label title="Initiatives difference">InDif</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'transitionsDiff' }" @click="setSortTopic('transitionsDiff')" v-if="globalState.tableShowPerfEffDetails">
          <label title="Transitions difference">TrDif</label>
        </div>


        <!-- PERF AVG -->
        <div class="column interact" :class="{ 'bold': sortTopic === 'momentumStrAvg' }" @click="setSortTopic('momentumStrAvg')" v-if="globalState.tableShowPerfAvgDetails">
          <label title="Momentum avg">Mmø</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'formStrAvg' }" @click="setSortTopic('formStrAvg')" v-if="globalState.tableShowPerfAvgDetails">
          <label title="Form avg">Foø</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'moraleStrAvg' }" @click="setSortTopic('moraleStrAvg')" v-if="globalState.tableShowPerfAvgDetails">
          <label title="Morale avg">Mrø</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'initiativeStrAvg' }" @click="setSortTopic('initiativeStrAvg')" v-if="globalState.tableShowPerfAvgDetails">
          <label title="Initiative strength avg">Inø</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'initiativeStrDiceAvg' }" @click="setSortTopic('initiativeStrDiceAvg')" v-if="globalState.tableShowPerfAvgDetails">
          <label title="Initiative strength dice avg">InDø</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'transitionStrAvg' }" @click="setSortTopic('transitionStrAvg')" v-if="globalState.tableShowPerfAvgDetails">
          <label title="Transition strength avg">Trø</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'transitionStrDiceAvg' }" @click="setSortTopic('transitionStrDiceAvg')" v-if="globalState.tableShowPerfAvgDetails">
          <label title="Transition strength dice avg">TrDø</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'attackStrAvg' }" @click="setSortTopic('attackStrAvg')" v-if="globalState.tableShowPerfAvgDetails">
          <label title="Attack strength avg">Atø</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'attackStrDiceAvg' }" @click="setSortTopic('attackStrDiceAvg')" v-if="globalState.tableShowPerfAvgDetails">
          <label title="Attack strength dice avg">AtDø</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'shotStrAvg' }" @click="setSortTopic('shotStrAvg')" v-if="globalState.tableShowPerfAvgDetails">
          <label title="Shot strength avg">Shø</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'shotStrDiceAvg' }" @click="setSortTopic('shotStrDiceAvg')" v-if="globalState.tableShowPerfAvgDetails">
          <label title="Shot strength dice avg">ShDø</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'defendStrAvg' }" @click="setSortTopic('defendStrAvg')" v-if="globalState.tableShowPerfAvgDetails">
          <label title="Defend strength avg">Deø</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'defendStrDiceAvg' }" @click="setSortTopic('defendStrDiceAvg')" v-if="globalState.tableShowPerfAvgDetails">
          <label title="Defend strength dice avg">DeDø</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'saveStrAvg' }" @click="setSortTopic('saveStrAvg')" v-if="globalState.tableShowPerfAvgDetails">
          <label title="Save strength avg">Saø</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'saveStrDiceAvg' }" @click="setSortTopic('saveStrDiceAvg')" v-if="globalState.tableShowPerfAvgDetails">
          <label title="Save strength dice avg">SaDø</label>
        </div>


        <!-- ROLE -->
        <div class="column interact" :class="{ 'bold': sortTopic === 'seed' }" @click="setSortTopic('seed')" v-if="globalState.tableShowRoleDetails">
          <label title="Seed">Seed</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'rankSeed' }" @click="setSortTopic('rankSeed')" v-if="globalState.tableShowRoleDetails">
          <label title="Seed rank">SRa</label>
        </div>
        <!-- <div class="column interact" :class="{ 'bold': sortTopic === 'rankMatchday' }" @click="setSortTopic('rankMatchday')" v-if="globalState.tableShowRoleDetails">
          <label title="Day rank">DRa</label>
        </div> -->
        <div class="column" v-if="globalState.tableShowRoleDetails">
          <label title="Role">Role</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'roleDiff' }" @click="setSortTopic('roleDiff')" v-if="globalState.tableShowRoleDetails">
          <label title="Role difference">RDiff</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'priceMoney' }" @click="setSortTopic('priceMoney')" v-if="globalState.tableShowRoleDetails">
          <label title="Price money (in thousand)">Pr$</label>
        </div>


        <!-- ABILITY -->
        <div class="column interact" :class="{ 'bold': sortTopic === 'initiative' }" @click="setSortTopic('initiative')" v-if="globalState.tableShowRoleDetails">
          <label title="Initiative">In</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'transition' }" @click="setSortTopic('transition')" v-if="globalState.tableShowRoleDetails">
          <label title="Transition">Tr</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'attack' }" @click="setSortTopic('attack')" v-if="globalState.tableShowRoleDetails">
          <label title="Transition">At</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'shoot' }" @click="setSortTopic('shoot')" v-if="globalState.tableShowRoleDetails">
          <label title="Transition">Sh</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'defend' }" @click="setSortTopic('defend')" v-if="globalState.tableShowRoleDetails">
          <label title="Transition">De</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'save' }" @click="setSortTopic('save')" v-if="globalState.tableShowRoleDetails">
          <label title="Transition">Sa</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'momentum' }" @click="setSortTopic('momentum')" v-if="globalState.tableShowRoleDetails">
          <label title="Momentum">Mm</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'form' }" @click="setSortTopic('form')" v-if="globalState.tableShowRoleDetails">
          <label title="Form">Fo</label>
        </div>
        <div class="column interact" :class="{ 'bold': sortTopic === 'morale' }" @click="setSortTopic('morale')" v-if="globalState.tableShowRoleDetails">
          <label title="Morale">Mr</label>
        </div>
      </div>


      <!-- TABLE CONTENT -->
      <div class="body">
        <!-- Default columns -->
        <li v-for="(club, index) in liveTable" :key="index" class="entry">
          <div class="column sticky-left-0" :class="{ 'bold': focusClubs.includes(club.initials) }">
            <label>{{ club.rankLive }}</label>
          </div>
          <div class="column sticky-left-1 interact" :class="{ 'bold': focusClubs.includes(club.initials) }" @click="addFocusClub(club)">
            <label>{{ club.initials }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'matchesPlayed' || focusClubs.includes(club.initials) }">
            <label>{{ club.matchesPlayed }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'goals' || focusClubs.includes(club.initials) }">
            <label>{{ club.goals }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'goalsAgainst' || focusClubs.includes(club.initials) }">
            <label>{{ club.goalsAgainst }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'goalsDiff' || focusClubs.includes(club.initials) }">
            <label>{{ club.goalsDiff() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === '' || sortTopic === 'points' || focusClubs.includes(club.initials) }">
            <label>{{ club.points }}</label>
          </div>


          <!-- RESULT -->
          <div class="column" :class="{ 'bold': sortTopic === 'goalsPerMatch' || focusClubs.includes(club.initials) }" v-if="globalState.tableShowResultDetails">
            <label>{{ club.goalsPerMatch() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'goalsAgainstPerMatch' || focusClubs.includes(club.initials) }" v-if="globalState.tableShowResultDetails">
            <label>{{ club.goalsAgainstPerMatch() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'goalsDiffPerMatch' || focusClubs.includes(club.initials) }" v-if="globalState.tableShowResultDetails">
            <label>{{ club.goalsDiffPerMatch() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'pointsPerMatch' || focusClubs.includes(club.initials) }" v-if="globalState.tableShowResultDetails">
            <label>{{ club.pointsPerMatch() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'wins' || focusClubs.includes(club.initials) }" v-if="globalState.tableShowResultDetails">
            <label>{{ club.wins() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'winsOvertime' || focusClubs.includes(club.initials) }" v-if="globalState.tableShowResultDetails">
            <label>{{ club.winsOvertime() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'lossesOvertime' || focusClubs.includes(club.initials) }" v-if="globalState.tableShowResultDetails">
            <label>{{ club.lossesOvertime() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'losses' || focusClubs.includes(club.initials) }" v-if="globalState.tableShowResultDetails">
            <label>{{ club.losses() }}</label>
          </div>


          <!-- PERF EFF -->
          <div class="column pointsL5" :class="{ 'bold': focusClubs.includes(club.initials) }" v-if="globalState.tableShowPerfEffDetails">
            <label>{{ club.resultPoints.slice(-5).join('')  }}</label>
          </div>         
          <div class="column" :class="{ 'bold': sortTopic === 'pointsL5Avg' || focusClubs.includes(club.initials) }" v-if="globalState.tableShowPerfEffDetails">
            <label>{{ club.pointsL5Avg() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'shotsEff' || focusClubs.includes(club.initials) }" v-if="globalState.tableShowPerfEffDetails">
            <label>{{ club.shotsEff() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'savesEff' || focusClubs.includes(club.initials) }" v-if="globalState.tableShowPerfEffDetails">
            <label>{{ club.savesEff() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'shotsSavesEff' || focusClubs.includes(club.initials) }" v-if="globalState.tableShowPerfEffDetails">
            <label>{{ club.shotsSavesEff() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'initiativesDiff' || focusClubs.includes(club.initials) }" v-if="globalState.tableShowPerfEffDetails">
            <label>{{ club.initiativesDiff() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'transitionsDiff' || focusClubs.includes(club.initials) }" v-if="globalState.tableShowPerfEffDetails">
            <label>{{ club.transitionsDiff() }}</label>
          </div>


          <!-- PERF AVG -->
          <div class="column" :class="{ 'bold': sortTopic === 'momentumStrAvg' || focusClubs.includes(club.initials) }" v-if="globalState.tableShowPerfAvgDetails">
            <label>{{ (club.momentumStrAvg()) }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'formStrAvg' || focusClubs.includes(club.initials) }" v-if="globalState.tableShowPerfAvgDetails">
            <label>{{ (club.formStrAvg()) }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'moraleStrAvg' || focusClubs.includes(club.initials) }" v-if="globalState.tableShowPerfAvgDetails">
            <label>{{ (club.moraleStrAvg()) }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'initiativeStrAvg' || focusClubs.includes(club.initials) }" v-if="globalState.tableShowPerfAvgDetails">
            <label>{{ club.initiativeStrAvg() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'initiativeStrDiceAvg' || focusClubs.includes(club.initials) }" v-if="globalState.tableShowPerfAvgDetails">
            <label>{{ club.initiativeStrDiceAvg() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'transitionStrAvg' || focusClubs.includes(club.initials) }" v-if="globalState.tableShowPerfAvgDetails">
            <label>{{ club.transitionStrAvg() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'transitionStrDiceAvg' || focusClubs.includes(club.initials) }" v-if="globalState.tableShowPerfAvgDetails">
            <label>{{ club.transitionStrDiceAvg() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'attackStrAvg' || focusClubs.includes(club.initials) }" v-if="globalState.tableShowPerfAvgDetails">
            <label>{{ club.attackStrAvg() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'attackStrDiceAvg' || focusClubs.includes(club.initials) }" v-if="globalState.tableShowPerfAvgDetails">
            <label>{{ club.attackStrDiceAvg() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'shotStrAvg' || focusClubs.includes(club.initials) }" v-if="globalState.tableShowPerfAvgDetails">
            <label>{{ club.shotStrAvg() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'shotStrDiceAvg' || focusClubs.includes(club.initials) }" v-if="globalState.tableShowPerfAvgDetails">
            <label>{{ club.shotStrDiceAvg() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'defendStrAvg' || focusClubs.includes(club.initials) }" v-if="globalState.tableShowPerfAvgDetails">
            <label>{{ club.defendStrAvg() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'defendStrDiceAvg' || focusClubs.includes(club.initials) }" v-if="globalState.tableShowPerfAvgDetails">
            <label>{{ club.defendStrDiceAvg() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'saveStrAvg' || focusClubs.includes(club.initials) }" v-if="globalState.tableShowPerfAvgDetails">
            <label>{{ club.saveStrAvg() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'saveStrDiceAvg' || focusClubs.includes(club.initials) }" v-if="globalState.tableShowPerfAvgDetails">
            <label>{{ club.saveStrDiceAvg() }}</label>
          </div>


          <!-- ROLE -->
          <div class="column" :class="{ 'bold': sortTopic === 'seed' || focusClubs.includes(club.initials) }" v-if="globalState.tableShowRoleDetails">
            <label>{{ club.seed() }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'rankSeed' || focusClubs.includes(club.initials) }" v-if="globalState.tableShowRoleDetails">
            <label>{{ club.rankSeed }}</label>
          </div>
          <!-- <div class="column" :class="{ 'bold': sortTopic === 'rankMatchday' || focusClubs.includes(club.initials) }" v-if="globalState.tableShowRoleDetails">
            <label>{{ club.rankMatchday }}</label>
          </div> -->
          <div class="column" :class="{ 'bold': focusClubs.includes(club.initials) } "v-if="globalState.tableShowRoleDetails">
            <label>{{ club.role.slice(0, 5) }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'roleDiff' || focusClubs.includes(club.initials) }" v-if="globalState.tableShowRoleDetails">
            <label>{{ club.roleDiff }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'priceMoney' || focusClubs.includes(club.initials) }" v-if="globalState.tableShowRoleDetails">
            <label>{{ (club.priceMoney / 1000).toFixed(2) }}</label>
          </div>


          <!-- ABILITY -->
          <div class="column" :class="{ 'bold': sortTopic === 'initiative' || focusClubs.includes(club.initials) }" v-if="globalState.tableShowRoleDetails">
            <label>{{ club.initiative }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'transition' || focusClubs.includes(club.initials) }" v-if="globalState.tableShowRoleDetails">
            <label>{{ club.transition }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'attack' || focusClubs.includes(club.initials) }" v-if="globalState.tableShowRoleDetails">
            <label>{{ club.attack }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'shoot' || focusClubs.includes(club.initials) }" v-if="globalState.tableShowRoleDetails">
            <label>{{ club.shoot }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'defend' || focusClubs.includes(club.initials) }" v-if="globalState.tableShowRoleDetails">
            <label>{{ club.defend }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'save' || focusClubs.includes(club.initials) }" v-if="globalState.tableShowRoleDetails">
            <label>{{ club.save }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'momentum' || focusClubs.includes(club.initials) }" v-if="globalState.tableShowRoleDetails">
            <label>{{ formatD2(club.momentum) }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'form' || focusClubs.includes(club.initials) }" v-if="globalState.tableShowRoleDetails">
            <label>{{ formatD2(club.form) }}</label>
          </div>
          <div class="column" :class="{ 'bold': sortTopic === 'morale' || focusClubs.includes(club.initials) }" v-if="globalState.tableShowRoleDetails">
            <label>{{ formatD2(club.morale) }}</label>
          </div>
        </li>
      </div>
    </div>
  </div>
</template>

<script>
import { globalState } from '../lib/state.js'
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
      globalState,
      liveTable: [],
      sortTopic: '',
      focusClubs: ['FRB']
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
    addFocusClub(club) {
      this.focusClubs.includes(club.initials) ? this.focusClubs = this.focusClubs.filter(item => item !== club.initials) : this.focusClubs.push(club.initials)
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

    .pointsL5 {
      font-size: 0.85rem;
      display: flex;
      place-items: center;
    }
  }
}
</style>