<template>
  <div class="display-clubs-wrapper">
    <div v-for="(club, index) in sortedClubs" :key=index class="club">
      <!-- BASE & ROLE -->
      <div class="role">
        <label title="Inititals">{{ club.initials }}</label>
        <label title="Seed strength (rank)">{{ club.seed() }} ({{ club.rankSeed }}.)</label>
        <label title="Role (rank matchday, role difference)">{{ club.role }} ({{ club.rankMatchday }}. {{ club.roleDiff }})</label>
      </div>


      <!-- PERF AVG & RESULT-->
      <div class="result">
        <label title="Points last 5 games (avg)">P5(ø) {{ club.resultPoints.slice(-5) }} ({{ club.pointsL5Avg() }})</label>
        <label title="W - OTW - OTL - L">{{ club.wins() }}-{{ club.winsOvertime() }}-{{ club.lossesOvertime() }}-{{ club.losses() }}</label>
      </div>


      <!-- ABILITY & TWEAK -->
      <div class="ability-stats">
        <div class="ability-entry" title="Initiative">
          <label>In</label>
          <label>{{ club.initiative }}</label>
        </div>
        <div class="ability-entry" title="Transition">
          <label>Tr</label>
          <label>{{ club.transition }}</label>
        </div>
        <div class="ability-entry" title="Attack">
          <label>At</label>
          <label>{{ club.attack }}</label>
        </div>
        <div class="ability-entry" title="Shoot">
          <label>Sh</label>
          <label>{{ club.shoot }}</label>
        </div>
        <div class="ability-entry" title="Defend">
          <label>De</label>
          <label>{{ club.defend }}</label>
        </div>
        <div class="ability-entry" title="Save">
          <label>Sa</label>
          <label>{{ club.save }}</label>
        </div>
        <div class="ability-entry" title="Momentum">
          <label>Mm</label>
          <label>{{ formatD2(club.momentum) }}</label>
        </div>
        <div class="ability-entry" title="Form">
          <label>Fo</label>
          <label>{{ formatD2(club.form) }}</label>
        </div>
        <div class="ability-entry" title="Morale">
          <label>Mr</label>
          <label>{{ formatD2(club.morale) }}</label>
        </div>
      </div>


      <!-- PERF AVG -->
      <div class="tweak-stats" v-if="showPerfAvgDetails">
        <div class="tweak-entry" title="Momentum avg">
          <label>Mmø</label><label>{{ club.momentumStrAvg() }}</label>
        </div>
        <div class="tweak-entry" title="Form avg">
          <label>Foø</label><label>{{ club.formStrAvg() }}</label>
        </div>
        <div class="tweak-entry" title="Morale avg">
          <label>Mrø</label><label>{{ club.moraleStrAvg() }}</label>
        </div>
      </div>


      <!-- PERF AVG & EFF & RESULT -->
      <div class="perf-stats">
        <div class="column">
          <!-- PERF AVG -->
          <div v-if="showPerfAvgDetails">
            <div class="perf-entry" title="Initiative strength avg">
              <label>Inø</label><label>{{ club.initiativeStrAvg() }}</label>
            </div>
            <div class="perf-entry" title="Transition strength avg">
              <label>Trø</label><label>{{ club.transitionStrAvg() }}</label>
            </div>
            <div class="perf-entry" title="Attack strength avg">
              <label>Atø</label><label>{{ club.attackStrAvg() }}</label>
            </div>
            <div class="perf-entry" title="Shot strength avg">
              <label>Shø</label><label>{{ club.shotStrAvg() }}</label>
            </div>
            <div class="perf-entry" title="Defend strength avg">
              <label>Deø</label><label>{{ club.defendStrAvg() }}</label>
            </div>
            <div class="perf-entry" title="Save strength avg">
              <label>Saø</label><label>{{ club.saveStrAvg() }}</label>
            </div>
          </div>

          <!-- PERF EFF -->
          <div v-if="showPerfEffDetails">
            <div class="perf-entry" title="Initiatives difference">
              <label>InDif</label><label>{{ club.initiativesDiff() }}</label>
            </div>
            <div class="perf-entry" title="Initiatives efficiency">
              <label>In%</label><label>{{ club.initiativesEff() }}</label>
            </div>
            <div class="perf-entry" title="Attacks">
              <label>At</label><label>{{ club.attacks }}</label>
            </div>
            <div class="perf-entry" title="Attacks efficiency">
              <label>At%</label><label>{{ club.attacksEff() }}</label>
            </div>
            <div class="perf-entry" title="Fallbacks">
              <label>Fb</label><label>{{ club.fallbacks }}</label>
            </div>
            <div class="perf-entry" title="Fallbacks efficiency">
              <label>Fb%</label><label>{{ club.fallbacksEff() }}</label>
            </div>
            <div class="perf-entry" title="Attack shots : Attack shots against (percentage from all)">
              <label>AtSh%</label><label>{{ formatD1(club.attackShots / (club.attackShots + club.counterShots) * 100) }} : {{ formatD1(club.attackShotsAgainst / (club.attackShotsAgainst + club.counterShotsAgainst) * 100)}}</label>
            </div>
          </div>

          <!-- RESULT -->
          <div>
            <div class="perf-entry" title="Shots : Shots against">
              <label>Sh</label><label>{{ club.attackShots + club.counterShots }} : {{ club.attackShotsAgainst + club.counterShotsAgainst }}</label>
            </div>
            <div class="perf-entry" title="Saves">
              <label>Sa</label><label>{{ club.saves }}</label>
            </div>
            <div class="perf-entry" title="Goals : Goals against">
              <label>G</label><label>{{ club.goals }} : {{ club.goalsAgainst }}</label>
            </div>
            <div class="perf-entry" title="Goals difference">
              <label>Dif</label><label>{{ club.goalsDiff() }}</label>
            </div>
            <div class="perf-entry" title="Points">
              <label>P</label><label>{{ club.points }}</label>
            </div>
          </div>
        </div>


        <div class="column">
          <!-- PERF AVG -->
          <div v-if="showPerfAvgDetails">
            <div class="perf-entry" title="Initative strength dice avg">
              <label>InDø</label><label>{{ club.initiativeStrDiceAvg() }}</label>
            </div>
            <div class="perf-entry" title="Transition strength dice avg">
              <label>TrDø</label><label>{{ club.transitionStrDiceAvg() }}</label>
            </div>
            <div class="perf-entry" title="Attack strength dice avg">
              <label>AtDø</label><label>{{ club.attackStrDiceAvg() }}</label>
            </div>
            <div class="perf-entry" title="Shot strength dice avg">
              <label>ShDø</label><label>{{ club.shotStrDiceAvg() }}</label>
            </div>
            <div class="perf-entry" title="Defend strength dice avg">
              <label>DeDø</label><label>{{ club.defendStrDiceAvg() }}</label>
            </div>
            <div class="perf-entry" title="Save strength dice avg">
              <label>SaDø</label><label>{{ club.saveStrDiceAvg() }}</label>
            </div>
          </div>

          <!-- PERF EFF -->
          <div v-if="showPerfEffDetails">
            <div class="perf-entry" title="Transitions difference">
              <label>TrDif</label><label>{{ club.transitionsDiff() }}</label>
            </div>
            <div class="perf-entry" title="Transitions efficiency">
              <label>Tr%</label><label>{{ club.transitionsEff() }}</label>
            </div>
            <div class="perf-entry" title="Defends">
              <label>De</label><label>{{ club.defends }}</label>
            </div>
            <div class="perf-entry" title="Defends efficiency">
              <label>De%</label><label>{{ club.defendsEff() }}</label>
            </div>
            <div class="perf-entry" title="Counters">
              <label>Co</label><label>{{ club.counters }}</label>
            </div>
            <div class="perf-entry" title="Counters efficiency">
              <label>Co%</label><label>{{ club.countersEff() }}</label>
            </div>
            <div class="perf-entry" title="Counter shots : Counter shots against (percentage from all)">
              <label>CoSh%</label><label>{{ formatD1(club.counterShots / (club.attackShots + club.counterShots) * 100) }} : {{ formatD1(club.counterShotsAgainst / (club.attackShotsAgainst + club.counterShotsAgainst) * 100)}}</label>
            </div>
          </div>

          <!-- RESULT -->
          <div>
            <div class="perf-entry" title="Shots efficiency">
              <label>Sh%</label><label>{{ club.shotsEff() }}</label>
            </div>
            <div class="perf-entry" title="Saves efficiency">
              <label>Sa%</label><label>{{ club.savesEff() }}</label>
            </div>
            <div class="perf-entry" title="Goals : Goals against per match">
              <label>G/M</label><label>{{ club.goalsPerMatch() }} : {{ club.goalsAgainstPerMatch() }}</label>
            </div>
            <div class="perf-entry" title="Goals difference per match">
              <label>Dif/M</label><label>{{ club.goalsDiffPerMatch() }}</label>
            </div>
            <div class="perf-entry" title="Points per match">
              <label>P/M</label><label>{{ club.pointsPerMatch() }}</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatD1, formatD2 } from '../lib/util.js'

export default {
  name: 'DisplayClubs',
  props: {
    clubs: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      sortedClubs: [],
      showPerfAvgDetails: true,
      showPerfEffDetails: true,
    }
  },
  methods: {
    formatD1, // need to define it here again to be able to use it in template section
    formatD2
  },
  mounted() {
    this.sortedClubs = [...this.clubs].sort((a, b) => b.seed() - a.seed())
  }
}
</script>

<style lang="scss" scoped>
.display-clubs-wrapper {
  display: flex;
  column-gap: 8px;

  .club {
    min-width: 320px;
    padding: 4px 8px;
    display: flex;
    flex-direction: column;
    border: 1px solid #f0275e;
    border-radius: 4px;
    background-color: #35495e;

    .role {
      display: flex;
      justify-content: space-between;
      font-weight: 700;
    }
    
    .result {
      display: flex;
      justify-content: space-between;
      font-weight: 700;
      padding-bottom: 4px;
      border-bottom: 1px dashed #f0275e;
      margin-bottom: 4px;
    }
    
    .ability-stats {
      display: flex;
      column-gap: 0.25rem;
      text-align: center;
      padding-bottom: 4px;
      border-bottom: 1px dashed #f0275e;
      margin-bottom: 4px;
      
      .ability-entry {
        display: flex;
        flex-direction: column;
        width: 2rem;
      }
    }

    .tweak-stats {
      display: flex;
      justify-content: space-between;

      .tweak-entry {
        width: 4.75rem;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px dashed #f0275e;
      }
    }
    
    .perf-stats {
      display: flex;
      justify-content: space-between;

      .column {
        .perf-entry {
          width: 9rem;
          display: flex;
          justify-content: space-between;
        }
      }
    }
  }
}
</style>