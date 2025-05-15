<template>
  <div v-if="clubs.length > 0" class="season-container">
    <SimulateSeason :clubs :schedule/>
  </div>
  <div class="tables-container">
    <DisplayTables :clubs/>
  </div>
  <div v-if="clubs.length > 0" class="clubs-container">
    <DisplayClubs :clubs/>
  </div>
</template>

<script>
import DisplayClubs from './components/DisplayClubs.vue'
import SimulateSeason from './components/SimulateSeason.vue'
import DisplayTables from './components/DisplayTables.vue'

import { Club } from './models/club.js'
import { clubSeedData } from './data/clubSeed.js'
import { createSchedule } from './lib/util.js'

export default {
  name: 'App',
  data() {
    return {
      season: 2023,
      league: 'DEL2',
      clubs: [],
      schedule: []
    }
  },
  methods: {
    init(Club, clubSeedData) {
      this.clubs = clubSeedData.map(seedData => new Club(seedData))

      this.schedule = createSchedule(this.clubs)
    }
  },
  mounted() {
    this.init(Club, clubSeedData)
  },
  components: {
    DisplayClubs,
    SimulateSeason,
    DisplayTables,
  }
}
</script>

<style lang="scss" >
body {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;
  font-size: 0.875rem;
  
  color-scheme: light dark;
  color: rgba(255, 255, 255, 0.87);
  background-color: #242424;
  
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  
  // min-width: 320px;
  // min-height: 100vh;
}

#app {
  // max-width: 1280px;
  // margin: 0 auto;
  padding: 0.5rem;
  
  .clubs-container {
    max-height: 440px;
    overflow-y: scroll;
  }
  
  .tables-container {
    padding: 0.5rem 0;
    overflow-x: scroll;
  }

  .season-container {
    overflow-x: scroll;
  }
}
</style>./data/clubSeed.js/index.js