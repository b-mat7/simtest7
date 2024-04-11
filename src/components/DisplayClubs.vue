<template>
  <div class="display-clubs-wrapper">
    <div v-for="(club, index) in sortedClubs" :key=index class="club">
      <div class="header">
        <label>{{ club.initials }}</label>
        <label>({{ club.seedStrength() }})</label>
        <label>{{ club.wins }}-{{ club.winsOvertime }}-{{ club.lossesOvertime }}-{{ club.losses }}</label>
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
          <label>Mr</label>
          <label>{{ parseFloat((club.morale).toFixed(2)) }}</label>
        </div>
      </div>
      <div class="play-stats">
        <div class="column">
          <div class="play-entry">
            <label>Mom ø</label><label>{{ club.momentumAverage() }}</label>
          </div>
          <div class="play-entry">
            <label>AtStr</label><label>{{ (club.attackStrSum).toFixed() }}</label>
          </div>
          <div class="play-entry">
            <label>DeStr</label><label>{{ (club.defendStrSum).toFixed() }}</label>
          </div>
          <div class="play-entry">
            <label>ShStr</label><label>{{ (club.shotStrSum).toFixed() }}</label>
          </div>
          <div class="play-entry">
            <label>SaStr</label><label>{{ (club.saveStrSum).toFixed() }}</label>
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
            <label>Buf ø</label><label>{{ club.buffAverage() }}</label>
          </div>
          <div class="play-entry">
            <label>AtStr ø</label><label>{{ club.attackStrAverage() }}</label>
          </div>
          <div class="play-entry">
            <label>DeStr ø</label><label>{{ club.defendStrAverage() }}</label>
          </div>
          <div class="play-entry">
            <label>ShStr ø</label><label>{{ club.shotStrAverage() }}</label>
          </div>
          <div class="play-entry">
            <label>SaStr ø</label><label>{{ club.saveStrAverage() }}</label>
          </div>
          <div class="play-entry">
            <label>Pl%</label><label>{{ club.playsDiff() }}</label><label>{{ club.attacksPercentage() }}:{{ club.defendsPercentage() }}</label>
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
    this.sortedClubs = [...this.clubs].sort((a, b) => b.seedStrength() - a.seedStrength())
  }
}
</script>

<style lang="scss" scoped>
.display-clubs-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;

  .club {
    width: 234px;
    padding: 8px;
    display: flex;
    flex-direction: column;
    border: 1px solid;
    border-radius: 8px;

    .header {
      display: flex;
      column-gap: 1rem;
    }
    
    .seed-stats {
      display: flex;
      justify-content: space-between;
      text-align: center;
      
      .seed-entry {
        display: flex;
        flex-direction: column;
        width: 2.25rem;
      }
    }
    
    .play-stats {
      display: flex;
      justify-content: space-between;
      
      .play-entry {
        width: 112px;
        display: flex;
        justify-content: space-between;
      }
    }
  }
}
</style>