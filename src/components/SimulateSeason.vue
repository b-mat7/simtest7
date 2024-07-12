season<template>
  <div class="simulate-season-wrapper">
    <div class="controls">
      <label>Season-Control:</label>
      <button v-if="!simulateSequ" @click="toggleSimulateSequ">SimSequ</button>
      <button v-else @click="toggleSimulateSequ">! SimSequ</button>
      <button v-if="!simulatePara" @click="toggleSimulatePara">SimPara</button>
      <button v-else @click="toggleSimulatePara">! SimPara</button>
    </div>
    <div class="matchdays">
      <div v-for="matchday in schedule.matchdayList">
        <SimulateMatchday :matchday :simulatePara :simulateSequDayNr @matchdayFinished="handlefinishedMatchdays"/>
      </div>
    </div>
  </div>
</template>

<script>
import SimulateMatchday from './SimulateMatchday.vue'

import { updateRank, prepareRole, updateRoleDiff } from '../lib/util.js'

export default {
  name: 'SimulateSeason',
  props: {
    schedule: {
      type: Object,
      required: true
    },
    clubs: {
      type: Array
    }
  },
  data() {
    return {
      simulatePara: false,
      simulateSequ: false,
      simulateSequDayNr: 0,
      startDayIntervall: null,
      finishedMatchdays: []
    }
  },
  methods: {
    toggleSimulatePara() {
      this.simulatePara = !this.simulatePara
    },
    async toggleSimulateSequ() {
      this.simulateSequ = !this.simulateSequ

      if(this.simulateSequ) {
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
      updateRank(this.clubs, null, 'rankSeed')
      updateRank(this.clubs, null, 'rankMatchday')
      prepareRole(this.clubs)
    },
    handlefinishedMatchdays(dayNr) {  // für resetMatch() müsste überabeitet werden
      this.finishedMatchdays.push(dayNr)
      
      updateRank(this.clubs, null, 'rankMatchday')
      updateRoleDiff(this.clubs)
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
  flex-direction: column;
  row-gap: 4px;

  .controls {
    display: flex;
    column-gap: 4px;
    padding: 4px;
  }

  .matchdays {
    display: flex;
    column-gap: 4px;
    overflow-x: scroll;
  }
}
</style>