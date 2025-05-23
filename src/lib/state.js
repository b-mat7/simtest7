import { reactive } from 'vue'

const globalState = reactive({
    simulatePara: false,
    simulateSequ: false,
})

export {
    globalState
}