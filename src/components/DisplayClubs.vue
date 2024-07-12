<template>
  <div class="display-clubs-wrapper">
    <div v-for="(club, index) in sortedClubs" :key=index class="club">
      <div class="header">
        <label>{{ club.initials }}</label>
        <label>{{ club.seed() }} ({{ club.rankSeed }}.)</label>
        <label>{{ club.role }} ({{ club.rankMatchday }}. {{ club.roleDiff }})</label>
      </div>
      <div class="results">
        <label>Re {{ club.results.slice(-5) }} ({{ club.resultsL5Avg() }})</label>
        <label>{{ club.wins() }}-{{ club.winsOvertime() }}-{{ club.lossesOvertime() }}-{{ club.losses() }}</label>
      </div>
      <div class="seed-stats">
        <div class="seed-entry">
          <label>In</label>
          <label>{{ club.initiative }}</label>
        </div>
        <div class="seed-entry">
          <label>Tr</label>
          <label>{{ club.transition }}</label>
        </div>
        <div class="seed-entry">
          <label>At</label>
          <label>{{ club.attack }}</label>
        </div>
        <div class="seed-entry">
          <label>Sh</label>
          <label>{{ club.shoot }}</label>
        </div>
        <div class="seed-entry">
          <label>De</label>
          <label>{{ club.defend }}</label>
        </div>
        <div class="seed-entry">
          <label>Sa</label>
          <label>{{ club.save }}</label>
        </div>
        <div class="seed-entry">
          <label>Fo</label>
          <label>{{ parseFloat((club.form).toFixed(2)) }}</label>
        </div>
        <div class="seed-entry">
          <label>Mr</label>
          <label>{{ parseFloat((club.morale).toFixed(2)) }}</label>
        </div>
      </div>
      <div class="tweak-stats">
        <div class="tweak-entry">
          <label>Mmø</label><label>{{ club.momentumAvg() }}</label>
        </div>
        <div class="tweak-entry">
          <label>Foø</label><label>{{ club.formAvg() }}</label>
        </div>
        <div class="tweak-entry">
          <label>Buø</label><label>{{ club.buffAvg() }}</label>
        </div>
      </div>
      <div class="play-stats">
        <div class="column">
          <!-- <div class="play-entry">
            <label>Inø</label><label>{{ club.initiativeStrAvg() }}</label>
          </div>
          <div class="play-entry">
            <label>Trø</label><label>{{ club.transitionStrAvg() }}</label>
          </div>
          <div class="play-entry">
            <label>Atø</label><label>{{ club.attackStrAvg() }}</label>
          </div>
          <div class="play-entry">
            <label>Shø</label><label>{{ club.shotStrAvg() }}</label>
          </div>
          <div class="play-entry">
            <label>Deø</label><label>{{ club.defendStrAvg() }}</label>
          </div>
          <div class="play-entry">
            <label>Saø</label><label>{{ club.saveStrAvg() }}</label>
          </div> -->
          <div class="play-entry">
            <label>In,%</label><label>{{ club.initiativesDiff() }}</label><label>{{ club.initiativesEff() }}</label>
          </div>
          <div class="play-entry">
            <label>At,%</label><label>{{ club.attacks }}</label><label>{{ club.attacksEff() }}</label>
          </div>
          <div class="play-entry">
            <label>Fb,%</label><label>{{ club.fallbacks }}</label><label>{{ club.fallbacksEff() }}</label>
          </div>
          <div class="play-entry">
            <label>AtSh%</label><label>{{ parseFloat((club.attackShots / (club.attackShots + club.counterShots) * 100).toFixed(1)) }} : {{ parseFloat((club.attackShotsAgainst / (club.attackShotsAgainst + club.counterShotsAgainst) * 100).toFixed(1))}}</label>
          </div>
          <div class="play-entry">
            <label>Sh</label><label>{{ club.attackShots + club.counterShots }} : {{ club.attackShotsAgainst + club.counterShotsAgainst }}</label>
          </div>
          <div class="play-entry">
            <label>Sa</label><label>{{ club.saves }}</label>
          </div>
          <div class="play-entry">
            <label>G</label><label>{{ club.goals }} : {{ club.goalsAgainst }}</label>
          </div>
          <div class="play-entry">
            <label>Dif</label><label>{{ club.goalsDiff() }}</label>
          </div>
          <div class="play-entry">
            <label>P</label><label>{{ club.points }}</label>
          </div>
        </div>

        <div class="column">
          <!-- <div class="play-entry">
            <label>InDø</label><label>{{ club.initiativeStrDiceAvg() }}</label>
          </div>
          <div class="play-entry">
            <label>TrDø</label><label>{{ club.transitionStrDiceAvg() }}</label>
          </div>
          <div class="play-entry">
            <label>AtDø</label><label>{{ club.attackStrDiceAvg() }}</label>
          </div>
          <div class="play-entry">
            <label>ShDø</label><label>{{ club.shotStrDiceAvg() }}</label>
          </div>
          <div class="play-entry">
            <label>DeDø</label><label>{{ club.defendStrDiceAvg() }}</label>
          </div>
          <div class="play-entry">
            <label>SaDø</label><label>{{ club.saveStrDiceAvg() }}</label>
          </div> -->
          <div class="play-entry">
            <label>Tr,%</label><label>{{ club.transitionsDiff() }}</label><label>{{ club.transitionsEff() }}</label>
          </div>
          <div class="play-entry">
            <label>De,%</label><label>{{ club.defends }}</label><label>{{ club.defendsEff() }}</label>
          </div>
          <div class="play-entry">
            <label>Co,%</label><label>{{ club.counters }}</label><label>{{ club.countersEff() }}</label>
          </div>
          <div class="play-entry">
            <label>CoSh%</label><label>{{ parseFloat((club.counterShots / (club.attackShots + club.counterShots) * 100).toFixed(1)) }} : {{ parseFloat((club.counterShotsAgainst / (club.attackShotsAgainst + club.counterShotsAgainst) * 100).toFixed(1))}}</label>
          </div>
          <div class="play-entry">
            <label>Sh%</label><label>{{ club.shotsEff() }}</label>
          </div>
          <div class="play-entry">
            <label>Sa%</label><label>{{ club.savesEff() }}</label>
          </div>
          <div class="play-entry">
            <label>G/M</label><label>{{ club.goalsPerMatch() }} : {{ club.goalsAgainstPerMatch() }}</label>
          </div>
          <div class="play-entry">
            <label>Dif/M</label><label>{{ club.goalsDiffPerMatch() }}</label>
          </div>
          <div class="play-entry">
            <label>P/M</label><label>{{ club.pointsPerMatch() }}</label>
          </div>
        </div>
      </div>
      <div class="calc-stats"></div>
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
    border: 1px solid;
    border-radius: 8px;

    .header {
      display: flex;
      justify-content: space-between
    }
    
    .results {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px dashed white;
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
      border-bottom: 1px dashed white;

      .tweak-entry {
        width: 4.5rem;
        display: flex;
        justify-content: space-around;
      }
    }
    
    .play-stats {
      display: flex;
      justify-content: space-between;
      
      .play-entry {
        width: 7.5rem;
        display: flex;
        justify-content: space-between;
      }
    }
  }
}
</style>