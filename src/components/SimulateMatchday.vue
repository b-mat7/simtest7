<template>
  <div class="simulate-matchday-wrapper">
    <div class="controls">
      <label>Day: {{ matchday.dayNr }}</label>
      <button
        v-if="!matchdayOngoing"
        :disabled="matchday.matches.length === finishedMatches.length"
        class="matchday-btn btn-interact"
        @click="toggleMatchdayOngoing"
        >Anpfiff
      </button>
      <button
        v-else
        :disabled="matchday.matches.length === finishedMatches.length"
        class="matchday-btn btn-interact"
        @click="toggleMatchdayOngoing"
        >Auszeit
      </button>
      <button
        v-if="!showMatchdayDetails"
        class="matchday-btn btn-interact"
        @click="showMatchdayDetails = true"
        >Details
      </button>
      <button
        v-else
        class="matchday-btn btn-interact"
        @click="showMatchdayDetails = false"
        >Close
      </button>
    </div>
    <div class="matches">
      <div v-for="match in matchday.matches">
        <SimulateMatch :match :matchdayOngoing :showMatchdayDetails @matchFinished="handleFinishedMatches"/>
      </div>
    </div>
  </div>
</template>

<script>
import { globalState } from '../lib/state.js'
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
      globalState,
      matchdayOngoing: false,
      finishedMatches: [],
      finishedMatchReports: [],
      showMatchdayDetails: false
    }
  },
  methods: {
    toggleMatchdayOngoing() {
      this.matchdayOngoing = !this.matchdayOngoing
    },
    handleFinishedMatches(matchNr, matchReport) {  // für resetMatch() müsste überabeitet werden
      this.finishedMatches.push(matchNr)
      this.finishedMatchReports.push(matchReport)

      if (this.matchday.matches.length === this.finishedMatches.length) {
        this.globalState.simulatedMatchdays.push(this.finishedMatchReports)
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
  border: 1px solid #f0275e;
  border-radius: 4px;
  background-color: #35495e;

  .controls {
    max-width: 168px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 700;
    padding-bottom: 4px;
    border-bottom: 1px dashed #f0275e;
    margin-bottom: 4px;
  }

  .matches {
    display: flex;
    flex-direction: column;
    row-gap: 12px;
  }
}

@media (max-width: 576px) {
  .simulate-matchday-wrapper {
    .controls {
      max-width: 126px;
    }
  }
}
</style>