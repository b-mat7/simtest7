<template>
  <div class="simulate-matchday-wrapper">
    <div class="controls">
      <label>Day: {{ matchday.dayNr }}</label>
      <button v-if="!matchdayOngoing" class="btn-size btn-interact" @click="toggleMatchdayOngoing">Anpfiff</button>
      <button v-else class="btn-size btn-interact" @click="toggleMatchdayOngoing">Auszeit</button>
      <button class="btn-size btn-interact" @click="showMatchdayDetails = !showMatchdayDetails">Details</button>
    </div>
    <div class="matches">
      <div v-for="match in matchday.matches">
        <SimulateMatch :match :matchdayOngoing :showMatchdayDetails @matchFinished="handleFinishedMatches"/>
      </div>
    </div>
  </div>
</template>

<script>
import SimulateMatch from './SimulateMatch.vue'

export default {
  emits: ['matchdayFinished'],
  name: 'SimulateMatchday',
  props: {
    matchday: {
      type: Object,
      required: true
    },
    simulatePara: { //xday
      type: Boolean
    },
    simulateSequDayNr: { //xday
      type: Number
    }
  },
  data() {
    return {
      matchdayOngoing: false,
      finishedMatches: [],
      showMatchdayDetails: false
    }
  },
  methods: {
    toggleMatchdayOngoing() {
      this.matchdayOngoing = !this.matchdayOngoing
    },
    handleFinishedMatches(matchNr) {  // für resetMatch() müsste überabeitet werden
      this.finishedMatches.push(matchNr)
      if (this.matchday.matches.length === this.finishedMatches.length) {
        this.$emit('matchdayFinished', this.matchday.dayNr)
      }
    }
  },
  watch: {  //xday

    // fix: with THird-Breaks, completed matches are not counted because ending() code not reached..?
    // bräuchte noch Third-Breaks handling auf matchday Ebene (stop the match after every third and each overtime)

    simulatePara() {
      this.simulatePara ? this.matchdayOngoing = true : this.matchdayOngoing = false
    },
    simulateSequDayNr() {
      this.simulateSequDayNr === this.matchday.dayNr ? this.matchdayOngoing = true : this.matchdayOngoing = false
    }
  },
  components: {
    SimulateMatch
  }
}
</script>

<style lang="scss" scoped>
.simulate-matchday-wrapper {
  min-width: 180px;
  display: flex;
  flex-direction: column;
  row-gap: 4px;
  padding: 4px 8px;
  border: 1px solid #f0275e;
  border-radius: 4px;
  background-color: #3b434c;

  .controls {
    max-width: 180px;
    display: flex;
    justify-content: space-between;
    font-weight: 700;
    padding-bottom: 4px;
    border-bottom: 1px dashed #f0275e;
    margin-bottom: 4px;

    .btn-size {
      min-width: 60px;
    }
  }

  .matches {
    display: flex;
    flex-direction: column;
    row-gap: 8px;
  }
}
</style>