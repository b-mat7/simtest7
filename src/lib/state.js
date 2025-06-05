import { reactive } from 'vue'

const globalState = reactive({
    simulateSpeed: 5,
    playOpponent: 4,
    outfieldPlayerDiceRange: 10,
    goalkeeperDiceRange: 14,

    schedule: undefined,
    simulationCanStart: false,
    simulationHasStarted: false,
    simulatePara: false,
    simulateSequ: false,
    focusMatchday: false,

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
    selectedMatchday: 1,
    lastNMatchdays: 5
})

export {
    globalState
}