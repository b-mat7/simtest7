<template>
  <div class="display-clubs-wrapper">
    <div v-for="(club, index) in sortedClubs" :key=index class="club">
      <!-- OVERVIEW SECTION -->
      <div class="overview">
        <label title="Inititals">{{ club.initials }}</label>
        <label title="Seed strength (rank)">{{ club.seed() }} ({{ club.rankSeed }}.)</label>
        <label title="Role (rank matchday, role difference)">{{ club.role }} ({{ club.rankMatchday }}. {{ club.roleDiff }})</label>
      </div>

      <div class="results">
        <label title="Results (points) last 5 games (avg)">Re {{ club.results.slice(-5) }} ({{ club.resultsL5Avg() }})</label>
        <label title="W - OTW - OTL - L">{{ club.wins() }}-{{ club.winsOvertime() }}-{{ club.lossesOvertime() }}-{{ club.losses() }}</label>
      </div>


      <!-- SEED SECTION -->
      <div class="seed-stats">
        <div class="seed-entry" title="Initiative">
          <label>In</label>
          <label>{{ club.initiative }}</label>
        </div>
        <div class="seed-entry" title="Transition">
          <label>Tr</label>
          <label>{{ club.transition }}</label>
        </div>
        <div class="seed-entry" title="Attack">
          <label>At</label>
          <label>{{ club.attack }}</label>
        </div>
        <div class="seed-entry" title="Shoot">
          <label>Sh</label>
          <label>{{ club.shoot }}</label>
        </div>
        <div class="seed-entry" title="Defend">
          <label>De</label>
          <label>{{ club.defend }}</label>
        </div>
        <div class="seed-entry" title="Save">
          <label>Sa</label>
          <label>{{ club.save }}</label>
        </div>
        <div class="seed-entry" title="Form">
          <label>Fo</label>
          <label>{{ parseFloat((club.form).toFixed(2)) }}</label>
        </div>
        <div class="seed-entry" title="Morale">
          <label>Mr</label>
          <label>{{ parseFloat((club.morale).toFixed(2)) }}</label>
        </div>
      </div>

      <div class="tweak-stats">
        <div class="tweak-entry" title="Momentum avg">
          <label>Mmø</label><label>{{ club.momentumAvg() }}</label>
        </div>
        <div class="tweak-entry" title="Form avg">
          <label>Foø</label><label>{{ club.formAvg() }}</label>
        </div>
        <div class="tweak-entry" title="Morale avg">
          <label>Mrø</label><label>{{ club.moraleAvg() }}</label>
        </div>
      </div>


      <!-- PERFORMANCE SECTION -->
      <div class="perf-stats">
        <div class="column">
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
          <div class="perf-entry" title="Initiatives difference, efficiency">
            <label>In,%</label><label>{{ club.initiativesDiff() }}</label><label>{{ club.initiativesEff() }}</label>
          </div>
          <div class="perf-entry" title="Attacks, efficiency">
            <label>At,%</label><label>{{ club.attacks }}</label><label>{{ club.attacksEff() }}</label>
          </div>
          <div class="perf-entry" title="Fallbacks, efficiency">
            <label>Fb,%</label><label>{{ club.fallbacks }}</label><label>{{ club.fallbacksEff() }}</label>
          </div>
          <div class="perf-entry" title="Attack shots : Attack shots against (percentage from all)">
            <label>AtSh%</label><label>{{ parseFloat((club.attackShots / (club.attackShots + club.counterShots) * 100).toFixed(1)) }} : {{ parseFloat((club.attackShotsAgainst / (club.attackShotsAgainst + club.counterShotsAgainst) * 100).toFixed(1))}}</label>
          </div>
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

        <div class="column">
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
          <div class="perf-entry" title="Transitions difference, efficiency">
            <label>Tr,%</label><label>{{ club.transitionsDiff() }}</label><label>{{ club.transitionsEff() }}</label>
          </div>
          <div class="perf-entry" title="Defends, efficiency">
            <label>De,%</label><label>{{ club.defends }}</label><label>{{ club.defendsEff() }}</label>
          </div>
          <div class="perf-entry" title="Counters, efficiency">
            <label>Co,%</label><label>{{ club.counters }}</label><label>{{ club.countersEff() }}</label>
          </div>
          <div class="perf-entry" title="Counter shots : Counter shots against (percentage from all)">
            <label>CoSh%</label><label>{{ parseFloat((club.counterShots / (club.attackShots + club.counterShots) * 100).toFixed(1)) }} : {{ parseFloat((club.counterShotsAgainst / (club.attackShotsAgainst + club.counterShotsAgainst) * 100).toFixed(1))}}</label>
          </div>
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
</template>

<script>
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
      sortedClubs: []
    }
  },
  mounted() {
    this.sortedClubs = [...this.clubs].sort((a, b) => b.seed() - a.seed())
  }
}
</script>

<style lang="scss" scoped>
.display-clubs-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;

  .club {
    width: 264px;
    padding: 8px;
    display: flex;
    flex-direction: column;
    border: 1px solid #f0275e;
    border-radius: 8px;
    background-color: #3b434c;

    .overview {
      display: flex;
      justify-content: space-between;
      font-weight: 700;
    }
    
    .results {
      display: flex;
      justify-content: space-between;
      font-weight: 700;
      padding-bottom: 4px;
      border-bottom: 1px dashed #f0275e;
      margin-bottom: 4px;
    }
    
    .seed-stats {
      display: flex;
      column-gap: 0.25rem;
      text-align: center;
      
      .seed-entry {
        display: flex;
        flex-direction: column;
        width: 2rem;
      }
    }
    
    .tweak-stats {
      display: flex;
      justify-content: space-between;
      padding-bottom: 4px;
      border-bottom: 1px dashed #f0275e;
      margin-bottom: 4px;

      .tweak-entry {
        width: 4.5rem;
        display: flex;
        justify-content: space-around;
      }
    }
    
    .perf-stats {
      display: flex;
      justify-content: space-between;
      
      .perf-entry {
        width: 7.5rem;
        display: flex;
        justify-content: space-between;
      }
    }
  }
}
</style>