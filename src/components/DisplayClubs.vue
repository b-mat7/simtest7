<template>
  <div class="display-clubs-wrapper">
    <!-- All globally focused clubs -->
    <div v-for="(club, idx) in focusClubs" :key="idx">
      <DisplayClubTemplate :club />
    </div>

    <!-- All non-globally-focused clubs -->
    <div v-for="(club, idx) in remainingClubs" :key="idx">
      <DisplayClubTemplate :club />
    </div>
  </div>
</template>

<script>
import { globalState } from '../lib/state.js'
import DisplayClubTemplate from './DisplayClubTemplate.vue'

export default {
  name: 'DisplayClubs',
  data() {
    return {
      globalState
    }
  },
  computed: {
    focusClubs() {
      return [...this.globalState.simClubs].filter(club => this.globalState.globalFocusClubs.includes(club.initials)).sort((a, b) => b.seed() - a.seed())
    },
    remainingClubs() {
      return [...this.globalState.simClubs].filter(club => !this.globalState.globalFocusClubs.includes(club.initials)).sort((a, b) => b.seed() - a.seed())
    }
  },
  components: {
    DisplayClubTemplate
  }
}
</script>

<style lang="scss" scoped>
.display-clubs-wrapper {
  display: flex;
  column-gap: 8px;
}
</style>