<template>
    <div class="controls-wrapper">
        <div class="season-controls">
            <label class="descr-column">Season:</label>
            <div class="btn-column">
                <button v-if="!globalState.simulateSequ" class="app-controls-btn btn-interact" @click="handleToggleSimulateSequ">SimSequ</button>
                <button v-else class="app-controls-btn btn-interact" @click="handleToggleSimulateSequ">Stop</button>
                <button v-if="!globalState.simulatePara" class="app-controls-btn btn-interact" @click="handleToggleSimulatePara">SimPara</button>
                <button v-else class="app-controls-btn btn-interact" @click="handleToggleSimulatePara">Stop</button>

                <button v-if="!showFullPane" class="app-controls-btn" @click="handleToggleControlsPane">Open</button>
                <button v-else class="app-controls-btn" @click="handleToggleControlsPane">Close</button>
            </div>
        </div>
        <div v-if="showFullPane" class="table-controls">
            <label class="descr-column">Table:</label>
            <div class="btn-column">
                <button class="app-controls-btn btn-interact">1</button>
                <button class="app-controls-btn btn-interact">2</button>
                <button class="app-controls-btn btn-interact">2</button>
                <button class="app-controls-btn btn-interact">2</button>
            </div>
        </div>
        <div v-if="showFullPane" class="clubs-controls">
            <label class="descr-column">Clubs:</label>
            <div class="btn-column">
                <button class="app-controls-btn btn-interact">1</button>
                <button class="app-controls-btn btn-interact">2</button>
                <button class="app-controls-btn btn-interact">2</button>
            </div>
        </div>
    </div>
</template>

<script>
import { globalState } from '../lib/state.js'

export default {
    name: 'AppControls',
    data() {
        return {
            globalState,
            showFullPane: false,
        }
    },
    methods: {
        handleToggleSimulateSequ() {
            globalState.simulateSequ = !globalState.simulateSequ
        },
        handleToggleSimulatePara() {
            globalState.simulatePara = !globalState.simulatePara
        },
        handleToggleControlsPane() {
            this.showFullPane = !this.showFullPane
        },
    }
}
</script>

<style lang="scss" scoped>
.controls-wrapper {
    display: flex;
    flex-direction: column;
    row-gap: 4px;
    font-weight: 700;
    padding: 4px 8px;
    border: 1px solid #f0275e;
    border-radius: 4px;
    background-color: #35495e;

    & > :not(:last-child) {
        padding-bottom: 4px;
        border-bottom: 1px dashed #f0275e;
    }

    .season-controls,
    .table-controls,
    .clubs-controls {
        display: flex;
        column-gap: 8px;

        .descr-column {
            width: 64px;
        }

        .btn-column {
            display: flex;
            flex-wrap: wrap;
            gap: 8px; 

            .app-controls-btn {
                min-width: 70px;
            }
        }
        
    }
}
</style>