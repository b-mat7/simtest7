<template>
    <div class="controls-wrapper">
        <div class="params-controls">
            <label v-if="simulationCanStart" class="descr-column">Ready!</label>
            <label v-else class="descr-column">Params:</label>
            <div class="btn-column">
                <DataInput 
                    v-model="globalState.simulateSpeed"
                    title="Simulation speed in ms, max:60000"
                    label="Speed"
                    :required="true"
                    :error="globalState.simulateSpeed < 1"
                    @update:modelValue="validateSimulateSpeedInput"
                />
                <DataInput
                    v-model="globalState.playOpponent"
                    title="Match schedule: Each club plays each other x times, min:2 max:100"
                    label="Duels"
                    :required="true"
                    :step="2"
                    :disabled="globalState.simulationHasStarted"
                    :error="globalState.playOpponent < 2 || globalState.playOpponent > 100"
                    @update:modelValue="validatePlayOpponentInput"
                />
                <DataInput
                    v-model="globalState.outfieldPlayerDiceRange"
                    title="Field players: dice range, min:1 max:20"
                    label="Player dice"
                    :required="true"
                    :disabled="globalState.simulationHasStarted"
                    :error="globalState.outfieldPlayerDiceRange < 1 || globalState.outfieldPlayerDiceRange > 20"
                    @update:modelValue="validateOutfieldPlayerDiceRangeInput"
                />
                <DataInput
                    v-model="globalState.goalkeeperDiceRange"
                    title="Goalkeepers: dice range, min:1 max:40"
                    label="Goali dice"
                    :required="true"
                    :disabled="globalState.simulationHasStarted"
                    :error="globalState.goalkeeperDiceRange < 1 || globalState.goalkeeperDiceRange > 40"
                    @update:modelValue="validateGoalkeeperDiceRangeInput"
                />
                <DataInput
                    v-model="globalState.selectedMatchday"
                    title="Matchday Table: Selected matchday"
                    label="Matchday"
                    :disabled="globalState.simulatedMatchdays.length === 0"
                    :error="!globalState.selectedMatchday"
                    @update:modelValue="validateSelectedMatchdayInput"
                />
                <DataInput
                    v-model="globalState.lastNMatchdays"
                    title="Table: L.. entry: Select number of last matchdays min:1 max:5"
                    label="Last matchdays"
                    :disabled="globalState.simulatedMatchdays.length === 0"
                    :error="!globalState.lastNMatchdays"
                    @update:modelValue="validateLastNMatchdaysInput"
                />
            </div>
        </div>
        <div class="season-controls">
            <label class="descr-column">Season:</label>
            <div class="btn-column">
                <button
                    :disabled="globalState.simulationHasStarted || globalState.playOpponent < 2 || globalState.playOpponent > 100"
                    class="app-controls-btn btn-interact"
                    title="Generate new match schedule"
                    @click="generateNewSchedule"
                    >Schedule
                </button>

                <button 
                    v-if="!globalState.simulateSequ"
                    :disabled="!globalState.simulationCanStart || globalState.simulatePara"
                    class="app-controls-btn btn-interact"
                    title="Simulate matchdays sequentially"
                    @click="handleToggleSimulateSequ"
                    >SimSequ
                </button>
                <button 
                    v-else 
                    :disabled="!globalState.simulationCanStart || globalState.simulatePara"
                    class="app-controls-btn btn-interact"
                    title="Stop simulate matchdays sequentially"
                    @click="handleToggleSimulateSequ"
                    >Stop
                </button>
                <button 
                    v-if="!globalState.simulatePara"
                    :disabled="!globalState.simulationCanStart || globalState.simulateSequ"
                    class="app-controls-btn btn-interact"
                    title="Simulate matchdays in parallel"
                    @click="handleToggleSimulatePara"
                    >SimPara
                </button>
                <button 
                    v-else 
                    :disabled="!globalState.simulationCanStart || globalState.simulateSequ"
                    class="app-controls-btn btn-interact"
                    title="Stop simulate matchdays in parallel"
                    @click="handleToggleSimulatePara"
                    >Stop
                </button>

                <button 
                    v-if="!globalState.focusMatchday"
                    :disabled="!globalState.simulationCanStart"
                    class="app-controls-btn btn-interact"
                    title="Focus on current matchday"
                    @click="handleToggleFocusMatchday"
                    >Focus
                </button>
                <button 
                    v-else
                    :disabled="!globalState.simulationCanStart"
                    class="app-controls-btn btn-interact"
                    title="Stop focus on current matchday"
                    @click="handleToggleFocusMatchday"
                    >Stop
                </button>

                <button v-if="!showFullPane" class="app-controls-btn btn-interact" title="Show full controls panel" @click="handleToggleControlsPane">More</button>
                <button v-else class="app-controls-btn btn-interact" title="Close controls panel" @click="handleToggleControlsPane">Close</button>
            </div>
        </div>
        <div v-if="showFullPane" class="table-controls">
            <label class="descr-column">Tables:</label>
            <div class="btn-column">
                <button
                    class="app-controls-btn btn-interact"
                    :class="{ 'btn-active': globalState.tableShowResultDetails }"
                    title="Show result details"
                    @click="handleTableShowResultDetails"
                    >Result
                </button>
                <button
                    class="app-controls-btn btn-interact"
                    :class="{ 'btn-active': globalState.tableShowPerfAvgDetails }"
                    title="Show performance average details"
                    @click="handleTableShowPerfAvgDetails"
                    >Perf Avg
                </button>
                <button
                    class="app-controls-btn btn-interact"
                    :class="{ 'btn-active': globalState.tableShowPerfEffDetails }"
                    title="Show performance efficiency details"
                    @click="handleTableShowPerfEffDetails"
                    >Perf Eff
                </button>
                <button
                    class="app-controls-btn btn-interact"
                    :class="{ 'btn-active': globalState.tableShowRoleDetails }"
                    title="Show role details"
                    @click="handleTableShowRoleDetails"
                    >Role
                </button>
            </div>
        </div>
        <div v-if="showFullPane" class="clubs-controls">
            <label class="descr-column">Clubs:</label>
            <div class="btn-column">
                <button
                class="app-controls-btn btn-interact"
                :class="{ 'btn-active': globalState.clubsShowResultDetails }"
                title="Show result details"
                @click="handleClubsShowResultDetails">Result
            </button>
                <button
                class="app-controls-btn btn-interact"
                :class="{ 'btn-active': globalState.clubsShowPerfAvgDetails }"
                title="Show performance average details"
                @click="handleClubsShowPerfAvgDetails">Perf Avg
            </button>
                <button
                class="app-controls-btn btn-interact"
                :class="{ 'btn-active': globalState.clubsShowPerfEffDetails }"
                title="Show performance efficiency details"
                @click="handleClubsShowPerfEffDetails">Perf Eff
            </button>
                <button
                class="app-controls-btn btn-interact"
                :class="{ 'btn-active': globalState.clubsShowRoleDetails }"
                title="Show role details"
                @click="handleClubsShowRoleDetails">Role
            </button>
            </div>
        </div>
        <div v-if="showFullPane" class="clubs-list-controls">
            <label class="descr-column">Focus:</label>
            <div class="btn-column">
                <div v-for="(club, idx) in globalState.initClubs" :key="idx" class="club-item interact" :class="{'highlight': globalState.globalFocusClubs.includes(club.initials)}" @click="handleAddGlobalFocusClub(club)">
                    <label>{{ club.initials }}</label>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { globalState } from '../lib/state.js'
import { createSchedule } from '../lib/util.js'
import DataInput from './elements/DataInput.vue'

export default {
    emits: ['generateNewSchedule'],
    name: 'AppControls',
    data() {
        return {
            globalState,
            showFullPane: true,
        }
    },
    computed: {
        simulationCanStart() {
            const canStart = this.globalState.schedule !== undefined
                && this.globalState.simulateSpeed >= 1 && this.globalState.simulateSpeed <= 60000
                && this.globalState.playOpponent >= 2 && this.globalState.playOpponent <= 100
                && this.globalState.outfieldPlayerDiceRange >= 1 && this.globalState.outfieldPlayerDiceRange <= 20
                && this.globalState.goalkeeperDiceRange >= 1 && this.globalState.goalkeeperDiceRange <= 40

            this.globalState.simulationCanStart = canStart
            return canStart
        },
        // currMatchDay is always "the next day", so we need to show "the last day" up until it actually is the last day
        // see DisplayMatchDayTable -> club computed prop -> simulatedMatchdays[selectedMatchday - 1]
        currMatchday() {
            return this.globalState.simulatedMatchdays.length + 1 < this.maxMatchday
            ?   this.globalState.simulatedMatchdays.length + 1
            :   this.globalState.simulatedMatchdays.length
        },
        maxMatchday() {
            return (this.globalState.simClubs.length -1 ) * this.globalState.playOpponent
        },
        matchdayTableDisplayMaxMatchday() {
            return this.currMatchday !== this.maxMatchday ? this.currMatchday -1 : this.maxMatchday
        }
    },
    methods: {
        handleToggleSimulateSequ() {
            globalState.simulateSequ = !globalState.simulateSequ
        },
        handleToggleSimulatePara() {
            globalState.simulatePara = !globalState.simulatePara
        },
        handleToggleFocusMatchday() {
            globalState.focusMatchday = !globalState.focusMatchday
        },
        handleToggleControlsPane() {
            this.showFullPane = !this.showFullPane
        },
        
        handleTableShowResultDetails() {
            globalState.tableShowResultDetails = !globalState.tableShowResultDetails
        },
        handleTableShowPerfAvgDetails() {
            globalState.tableShowPerfAvgDetails = !globalState.tableShowPerfAvgDetails
        },
        handleTableShowPerfEffDetails() {
            globalState.tableShowPerfEffDetails = !globalState.tableShowPerfEffDetails
        },
        handleTableShowRoleDetails() {
            globalState.tableShowRoleDetails = !globalState.tableShowRoleDetails
        },

        handleClubsShowResultDetails() {
            globalState.clubsShowResultDetails = !globalState.clubsShowResultDetails
        },
        handleClubsShowPerfAvgDetails() {
            globalState.clubsShowPerfAvgDetails = !globalState.clubsShowPerfAvgDetails
        },
        handleClubsShowPerfEffDetails() {
            globalState.clubsShowPerfEffDetails = !globalState.clubsShowPerfEffDetails
        },
        handleClubsShowRoleDetails() {
            globalState.clubsShowRoleDetails = !globalState.clubsShowRoleDetails
        },

        handleAddGlobalFocusClub(club) {
            globalState.globalFocusClubs.includes(club.initials)
                ? globalState.globalFocusClubs = globalState.globalFocusClubs.filter(item => item !== club.initials)
                : globalState.globalFocusClubs.push(club.initials)
        },

        validateSimulateSpeedInput() {
            if (!this.globalState.simulateSpeed || this.globalState.simulateSpeed < 0) this.globalState.simulateSpeed = 0
            if (this.globalState.simulateSpeed > 60000) this.globalState.simulateSpeed = 60000
        },
        validatePlayOpponentInput() {
            if (!this.globalState.playOpponent || this.globalState.playOpponent < 0) this.globalState.playOpponent = 0
            if (this.globalState.playOpponent > 100) this.globalState.playOpponent = 100
        },
        validateOutfieldPlayerDiceRangeInput() {
            if (!this.globalState.outfieldPlayerDiceRange || this.globalState.outfieldPlayerDiceRange < 0) this.globalState.outfieldPlayerDiceRange = 0
            if (this.globalState.outfieldPlayerDiceRange > 20) this.globalState.outfieldPlayerDiceRange = 20
        },
        validateGoalkeeperDiceRangeInput() {
            if (!this.globalState.goalkeeperDiceRange || this.globalState.outfieldPlayerDiceRange < 0) this.globalState.goalkeeperDiceRange = 0
            if (this.globalState.goalkeeperDiceRange > 40) this.globalState.goalkeeperDiceRange = 40
        },
        validateSelectedMatchdayInput() {
            if (!this.globalState.selectedMatchday || this.globalState.selectedMatchday < 1) this.globalState.selectedMatchday = 1
            if (this.globalState.selectedMatchday > this.matchdayTableDisplayMaxMatchday) this.globalState.selectedMatchday = this.matchdayTableDisplayMaxMatchday
        },
        validateLastNMatchdaysInput() {
            if (!this.globalState.lastNMatchdays || this.globalState.lastNMatchdays < 1) this.globalState.lastNMatchdays = 1
            if (this.globalState.lastNMatchdays > 5) this.globalState.lastNMatchdays = 5
        },

        generateNewSchedule() {
            this.globalState.schedule = createSchedule(this.globalState.simClubs, this.globalState.playOpponent)
        }
    },
    components: {
        DataInput
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

    .params-controls,
    .season-controls,
    .table-controls,
    .clubs-controls,
    .clubs-list-controls {
        display: flex;
        column-gap: 8px;

        .descr-column {
            min-width: 64px;
            flex: 0;
        }

        .btn-column {
            display: flex;
            flex-wrap: wrap;
            gap: 8px; 

            .club-item {
                width: 2.5rem;
                text-align: center;
            }
        }
        
    }
}

@media (max-width: 576px) {
    .controls-wrapper {
        .params-controls,
        .season-controls,
        .table-controls,
        .clubs-controls,
        .clubs-list-controls {
            .descr-column {
                min-width: 32px;
            }

            .btn-column {
                .club-item {
                    width: 1.5rem;
                }
            }
        }
    }
}
</style>