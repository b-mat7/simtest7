<template>
  <div class="app-controls-container">
    <AppControls />
  </div>

  <!-- ensure clubs are available for prepareSeason() tasks -->
  <div v-if="this.globalState.simClubs.length > 0 && this.globalState.schedule" class="season-container">
    <SimulateSeason />
  </div>

  <div class="tables-container">
    <DisplayLiveTable />
  </div>

  <div class="tables-container">
    <DisplayMatchdayTable />
  </div>

  <div class="clubs-container">
    <DisplayClubs />
  </div>
</template>

<script>
import AppControls from './components/AppControls.vue'
import SimulateSeason from './components/SimulateSeason.vue'
import DisplayLiveTable from './components/DisplayLiveTable.vue'
import DisplayMatchdayTable from './components/DisplayMatchdayTable.vue'
import DisplayClubs from './components/DisplayClubs.vue'

import { globalState } from './lib/state.js'
import { Club } from './models/club.js'
import { clubSeedData } from './data/clubSeed.js'

export default {
  name: 'App',
  data() {
    return {
      globalState,
      season: 2023,
      league: 'DEL2'
    }
  },
  methods: {
    init(Club, clubSeedData) {
      this.globalState.initClubs = clubSeedData.map(clubSeed => new Club(clubSeed))
      this.globalState.simClubs = clubSeedData.map(clubSeed => new Club(clubSeed))
    }
  },
  mounted() {
    this.init(Club, clubSeedData)
  },
  components: {
    AppControls,
    SimulateSeason,
    DisplayLiveTable,
    DisplayMatchdayTable,
    DisplayClubs
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
  margin: 8px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  .app-controls-container {
    width: 100%;
    position: sticky;
    top: 0px;
    z-index: 10;
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
  .highlight {
    font-weight: 900;
    color: #f0275e;
  }

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
    width: 72px;
  }

  .matchday-btn,
  .match-btn {
    width: 42px;
    font-size: 0.5rem;
    height: calc((2.25rem - 2px) / 2);
  }

  .app-controls-input {
    width: 64px;

    &.small {
      width: 40px;
    }
  }
}

@media (max-width: 576px) {
  #app {
    margin: 4px;
    font-size: 0.5rem;
    gap: 4px;

    .app-controls-btn {
      max-width: 56px;
      font-size: 0.5rem;
    }

    .matchday-btn,
    .match-btn {
      width: 34px;
      font-size: 0.4rem;
      height: calc((2rem - 2px) / 2);
    }

    .app-controls-input {
      max-width: 56px;
      font-size: 0.5rem;

      &.small {
        width: 32px;
      }
    }
  }
}
</style>