import { reactive } from 'vue'

const globalState = reactive({
    simulatePara: false,
    simulateSequ: false,
    simulateSpeed: 50
})

export {
    globalState
}