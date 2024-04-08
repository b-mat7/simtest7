<template>
  <div v-if="clubs.length > 0" class="clubs-container">
    <!-- somehow comp got loaded before App has loaded the clubs ?! (wenn in comp kein mounted() verwende gehts ?!) -->
    <DisplayClubs :clubs="clubs"/>
  </div>
  <div class="body">
    <div class="season-container">
        <SimulateSeason :schedule="schedule"/>
    </div>
    <div v-if="clubs.length > 0" class="tables-container">
      <!-- somehow comp got loaded before App has loaded the clubs ?! (wenn in comp kein mounted() verwende gehts ?!) -->
      <DisplayTables :clubs="clubs"/>
    </div>
  </div>
</template>

<script>
import DisplayClubs from './components/DisplayClubs.vue'
import SimulateSeason from './components/SimulateSeason.vue'
import DisplayTables from './components/DisplayTables.vue'

import { clubsData } from './data/clubs.js'
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
    init() {
      this.clubs = clubsData
      this.schedule = createSchedule(this.clubs)
    }
  },
  mounted() {
    this.init()
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
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  padding: 1rem;

  .clubs-container {
    max-height: 320px;
    overflow-y: scroll;
  }

  .body {
    display: flex;
    column-gap: 1rem;

    .season-container {
      max-height: 100svh;
      overflow-x: scroll;
    }

    .tables-container {
      max-height: 100svh;
    }
  }
}
</style>