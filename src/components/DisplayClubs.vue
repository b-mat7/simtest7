<template>
  <div class="display-clubs-wrapper">
    <div v-for="(club, index) in sortedClubs" :key=index class="club">
      <div class="header">
        <label>{{ club.initials }}</label>
        <label>{{ club.seed() }} ({{ club.rankSeed }}.)</label>
        <label>{{ club.role }} ({{ club.roleDiff }})</label>
      </div>
      <div class="results">
        <label>Re {{ club.results.slice(-5).reverse() }} ({{ club.resultsL5Average() }})</label>
        <label>{{ club.wins() }}-{{ club.winsOvertime() }}-{{ club.lossesOvertime() }}-{{ club.losses() }}</label>
      </div>
      <div class="seed-stats">
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
          <label>Mm</label>
          <label>{{ parseFloat((club.momentum).toFixed(2)) }}</label>
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
          <label>Mmø</label><label>{{ club.momentumAverage() }}</label>
        </div>
        <div class="tweak-entry">
          <label>Foø</label><label>{{ club.formAverage() }}</label>
        </div>
        <div class="tweak-entry">
          <label>Buø</label><label>{{ club.buffAverage() }}</label>
        </div>
      </div>
      <div class="play-stats">
        <div class="column">
          <div class="play-entry">
            <label>Atø</label><label>{{ club.attackStrAverage() }}</label>
          </div>
          <div class="play-entry">
            <label>Deø</label><label>{{ club.defendStrAverage() }}</label>
          </div>
          <div class="play-entry">
            <label>Shø</label><label>{{ club.shotStrAverage() }}</label>
          </div>
          <div class="play-entry">
            <label>Saø</label><label>{{ club.saveStrAverage() }}</label>
          </div>
          <div class="play-entry">
            <label>Pl</label><label>{{ club.attacks }}:{{ club.defends }}</label>
          </div>
          <div class="play-entry">
            <label>Sh</label><label>{{ club.shots }}:{{ club.shotsAgainst }}</label>
          </div>
          <div class="play-entry">
            <label>Sa</label><label>{{ club.saves }}</label>
          </div>
          <div class="play-entry">
            <label>P</label><label>{{ club.points }}</label>
          </div>
          <div class="play-entry">
            <label>G</label><label>{{ club.goals }}:{{ club.goalsAgainst }}</label>
          </div>
          <div class="play-entry">
            <label>Dif</label><label>{{ club.goalsDiff() }}</label>
          </div>
        </div>

        <div class="column">
          <div class="play-entry">
            <label>AtDø</label><label>{{ club.attackStrDiceAverage() }}</label>
          </div>
          <div class="play-entry">
            <label>DeDø</label><label>{{ club.defendStrDiceAverage() }}</label>
          </div>
          <div class="play-entry">
            <label>ShDø</label><label>{{ club.shotStrDiceAverage() }}</label>
          </div>
          <div class="play-entry">
            <label>SaDø</label><label>{{ club.saveStrDiceAverage() }}</label>
          </div>
          <div class="play-entry">
            <label>Pl%</label><label>{{ club.playsDiff() }}</label><label>{{ club.attacksPercentage() }} : {{ club.defendsPercentage() }}</label>
          </div>
          <div class="play-entry">
            <label>Sh%</label><label>{{ club.shotsPercentage() }}</label>
          </div>
          <div class="play-entry">
            <label>Sa%</label><label>{{ club.shotsSavesPercentage() }}</label><label>{{ club.savesPercentage() }}</label>
          </div>
          <div class="play-entry">
            <label>P/M</label><label>{{ club.pointsPerMatch() }}</label>
          </div>
          <div class="play-entry">
            <label>G/M</label><label>{{ club.goalsPerMatch() }} : {{ club.goalsAgainstPerMatch() }}</label>
          </div>
          <div class="play-entry">
            <label>Dif/M</label><label>{{ club.goalsDiffPerMatch() }}</label>
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
    width: 248px;
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
        width: 7rem;
        display: flex;
        justify-content: space-between;
      }
    }
  }
}
</style>