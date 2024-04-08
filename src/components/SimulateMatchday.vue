<template>
  <div class="simulate-matchday-wrapper">
    <div class="controls">
      <label>Day: {{ matchday.dayNr }}</label>
      <button v-if="!matchdayOngoing" @click="toggleMatchdayOngoing">Anpfiff</button>
      <button v-else @click="toggleMatchdayOngoing">Auszeit</button>
    </div>
    <div class="matches">
      <div v-for="match in matchday.matches">
        <SimulateMatch :match="match" :matchdayOngoing="matchdayOngoing" @matchFinished="handleFinishedMatches"/>
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
      finishedMatches: []
    }
  },
  methods: {
    toggleMatchdayOngoing() {
      this.matchdayOngoing = !this.matchdayOngoing
    },
    handleFinishedMatches(matchNr) {  // für reset() müsste überabeitet werden
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
  display: flex;
  flex-direction: column;
  row-gap: 4px;
  padding: 4px 8px;
  border: 1px solid #fff;
  border-radius: 8px;
  background-color: darkcyan;

  .controls {
    display: flex;
    column-gap: 4px;
  }
}
</style>