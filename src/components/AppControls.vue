<template>
    <div class="controls-wrapper">
        <div class="season-controls">
            <label class="descr-column">Season:</label>
            <div class="btn-column">
                <button 
                    v-if="!globalState.simulateSequ"
                    :disabled="globalState.simulatePara"
                    class="app-controls-btn btn-interact"
                    title="Simulate matchdays sequentially"
                    @click="handleToggleSimulateSequ"
                    >SimSequ
                </button>
                <button 
                    v-else 
                    :disabled="globalState.simulatePara"
                    class="app-controls-btn btn-interact"
                    title="Stop simulate matchdays sequentially"
                    @click="handleToggleSimulateSequ"
                    >Stop
                </button>
                <button 
                    v-if="!globalState.simulatePara"
                    :disabled="globalState.simulateSequ"
                    class="app-controls-btn btn-interact"
                    title="Simulate matchdays in parallel"
                    @click="handleToggleSimulatePara"
                    >SimPara
                </button>
                <button 
                    v-else 
                    :disabled="globalState.simulateSequ"
                    class="app-controls-btn btn-interact"
                    title="Stop simulate matchdays in parallel"
                    @click="handleToggleSimulatePara"
                    >Stop
                </button>
                <input
                    v-model="globalState.simulateSpeed"
                    type="number"
                    class="app-controls-input"
                    title="Simulation speed in ms, max:60000"
                    placeholder="Speed"
                    max="60000"
                    @input="validateSimulateSpeedInput"
                >

                <input
                    v-model="globalState.playOpponent"
                    type="number"
                    class="app-controls-input small"
                    title="Match schedule: Each club plays each other x times, min:2 max:100"
                    placeholder="Duels"
                    min="2"
                    max="100"
                    @input="validatePlayOpponentInput"
                >
                <button 
                    class="app-controls-btn btn-interact"
                    title="Generate new match schedule"
                    @click="generateNewSchedule"
                    >Generate
                </button>

                <input
                    v-model="globalState.outfieldPlayerDiceRange"
                    type="number"
                    class="app-controls-input small"
                    title="Field players: dice range, min:1 max:20"
                    placeholder="Player dice"
                    min="1"
                    max="20"
                    @input="validateOutfieldPlayerDiceRangeInput"
                >
                <input
                    v-model="globalState.goalkeeperDiceRange"
                    type="number"
                    class="app-controls-input small"
                    title="Goalkeepers: dice range, min:1 max:40"
                    placeholder="Goali dice"
                    min="1"
                    max="40"
                    @input="validateGoalkeeperDiceRangeInput"
                >

                <button v-if="!showFullPane" class="app-controls-btn btn-interact" title="Show full controls panel" @click="handleToggleControlsPane">Open</button>
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
                <input
                    v-model="globalState.selectedMatchday"
                    type="number"
                    title="Matchday Table: Selected matchday"
                    class="app-controls-input small"
                    placeholder="Day"
                    :disabled="globalState.simulatedMatchdays.length === 0"
                    min="1"
                    :max="currMatchday !== maxMatchday ? currMatchday -1 : maxMatchday"
                    @input="validateSelectedMatchdayInput"
                >
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
        // currMatchDay is always "the next day", so we need to show "the last day" up until it actually is the last day
        // see DisplayMatchDayTable -> club computed prop -> simulatedMatchdays[selectedMatchday - 1]
        currMatchday() {
            return this.globalState.simulatedMatchdays.length + 1 < this.maxMatchday
            ?   this.globalState.simulatedMatchdays.length + 1
            :   this.globalState.simulatedMatchdays.length
        },
        maxMatchday() {
            return (this.globalState.simClubs.length -1 ) * this.globalState.playOpponent
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
            if (this.globalState.simulateSpeed < 5) this.globalState.simulateSpeed = 5
            if (this.globalState.simulateSpeed > 60000) this.globalState.simulateSpeed = 60000
        },
        validatePlayOpponentInput() {
            if (this.globalState.playOpponent < 2) this.globalState.playOpponent = 2
            if (this.globalState.playOpponent > 100) this.globalState.playOpponent = 100
        },
        validateOutfieldPlayerDiceRangeInput() {
            if (this.globalState.outfieldPlayerDiceRange < 1) this.globalState.outfieldPlayerDiceRange = 1
            if (this.globalState.outfieldPlayerDiceRange > 20) this.globalState.outfieldPlayerDiceRange = 20
        },
        validateGoalkeeperDiceRangeInput() {
            if (this.globalState.goalkeeperDiceRange < 1) this.globalState.goalkeeperDiceRange = 1
            if (this.globalState.goalkeeperDiceRange > 40) this.globalState.goalkeeperDiceRange = 40
        },
        validateSelectedMatchdayInput() {
            if (this.globalState.selectedMatchday < 1) this.globalState.selectedMatchday = 1
            if (this.globalState.selectedMatchday > this.maxMatchday) this.globalState.selectedMatchday = this.maxMatchday
        },

        generateNewSchedule() {
            this.$emit('generateNewSchedule')
        }
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
    .clubs-controls,
    .clubs-list-controls {
        display: flex;
        column-gap: 8px;

        .descr-column {
            min-width: 64px;
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