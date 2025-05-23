import { reactive } from 'vue'

const globalState = reactive({
    simulatePara: false,
    simulateSequ: false,
    simulateSpeed: 50,

    tableShowResultDetails: false,
    tableShowPerfAvgDetails: false,
    tableShowPerfEffDetails: false,
    tableShowRoleDetails: false,
})

export {
    globalState
}