import { reactive } from 'vue'

const globalState = reactive({
    simulatePara: false,
    simulateSequ: false,
    simulateSpeed: 5,
    playOpponent: 4,
    outfieldPlayerDiceRange: 10,
    goalkeeperDiceRange: 14,

    tableShowResultDetails: false,
    tableShowPerfAvgDetails: false,
    tableShowPerfEffDetails: false,
    tableShowRoleDetails: false,

    clubsShowResultDetails: true,
    clubsShowPerfAvgDetails: false,
    clubsShowPerfEffDetails: false,
    clubsShowRoleDetails: true,

    globalFocusClubs: ['FRB'],

    initClubs: [],
    simClubs: [],
    simulatedMatchdays: [],
    selectedMatchday: 1
})

export {
    globalState
}