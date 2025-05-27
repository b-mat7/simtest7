season<template>
  <div class="simulate-season-wrapper">
    <div v-for="matchday in schedule.matchdayList">
      <SimulateMatchday :matchday :simulatePara="globalState.simulatePara" :simulateSequDayNr @matchdayFinished="handlefinishedMatchdays"/>
    </div>
  </div>
</template>

<script>
import SimulateMatchday from './SimulateMatchday.vue'

import { globalState } from '../lib/state.js'
import { updateRank, prepareRole, updateRoleDiff, updatePriceMoney } from '../lib/util.js'

export default {
  name: 'SimulateSeason',
  props: {
    schedule: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      globalState,
      simulateSequDayNr: 0,
      startDayIntervall: null,
      finishedMatchdays: []
    }
  },
  methods: {
    async startSimulateSequIntervals() {
      if(globalState.simulateSequ) {
        this.startDayIntervall = setInterval(async () => {
          let nextSimDay = this.schedule.matchdayList.find(matchday => this.finishedMatchdays.includes(matchday.dayNr) === false)

          if (!nextSimDay) {
            clearInterval(this.startDayIntervall)
          } else {
            this.simulateSequDayNr = nextSimDay.dayNr

            await new Promise(resolve => {
              const checkDayIntervall = setInterval(() => {
                if (this.finishedMatchdays.includes(nextSimDay.dayNr)) {
                  clearInterval(checkDayIntervall)
                  resolve()
                }
              }, 100)
            })
          }
        }, 1000)

      } else {
        clearInterval(this.startDayIntervall)
      }
    },
    prepareSeason() {
      updateRank(this.globalState.simClubs, null, 'rankSeed')
      updateRank(this.globalState.simClubs, null, 'rankMatchday')
      prepareRole(this.globalState.simClubs)
    },
    handlefinishedMatchdays(dayNr) {  // für resetMatch() müsste überabeitet werden
      this.finishedMatchdays.push(dayNr)
      
      updateRank(this.globalState.simClubs, null, 'rankMatchday')
      updateRoleDiff(this.globalState.simClubs)
      // updatePriceMoney(this.globalState.simClubs, this.finishedMatchdays)
    }
  },
  watch: {
    'globalState.simulateSequ': function(newValue) {
      this.startSimulateSequIntervals()
    }
  },
  mounted() {
    this.prepareSeason()
  },
  components: {
    SimulateMatchday
  }
}
</script>

<style lang="scss" scoped>
.simulate-season-wrapper {
  display: flex;
  column-gap: 8px;
  overflow-x: scroll;
}
</style>