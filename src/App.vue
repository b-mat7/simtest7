<template>
  <div class="app-controls-container">
    <AppControls :clubs/>
  </div>

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
import AppControls from './components/AppControls.vue'
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
    AppControls,
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
  color: #dee2e6;
  background-color: #222629;
  
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  margin: 0 // reset style
  
  // min-width: 320px;
  // min-height: 100vh;
}

#app {
  // max-width: 1280px;
  // margin: 0 auto;
  margin: 0.5rem;
  display: flex;
  flex-direction: column;
  row-gap: 8px;

  .app-controls-container {
    position: sticky;
    top: 0px;
    z-index: 10;
    // max-width: fit-content;
  }

  .season-container {
    overflow-x: scroll;
  }
  
  .tables-container {
    overflow-x: scroll;
  }

  .clubs-container {
    overflow-y: scroll;
  }

  // GLOBAL STYLES SECTION
  .interact {
    cursor: pointer;
    transition: all 0.1s ease;

    &:hover {
      color: #f0275e;
      font-weight: 800;
      outline: 1px solid #f0275e;
      border-radius: 4px;

      & > * {
        cursor: pointer;
        // transform: translateY(-4px);
      }
    }
  }

  .btn-interact {
    cursor: pointer;

    &:hover {
      cursor: pointer;
      border: 1px solid #f0275e;
      border-radius: 4px;
      // box-shadow: 0 0 8px #f0275e;
    }

    &:disabled {
      pointer-events: none;
    }
  }

  .btn-active {
    font-weight: 900;
    color: #f0275e;
  }

  .app-controls-btn {
    min-width: 70px;
  }

  .matchday-btn,
  .match-btn {
    width: 42px;
    font-size: 0.5rem;
    height: calc((2.25rem - 2px) / 2);
  }

  .highlight {
    font-weight: 900;
    color: #f0275e;
  }
}
</style>