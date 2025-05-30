<template>
    <div class="club">
        <!-- BASE & ROLE -->
        <div class="role" :class="{ 'highlight': clubIsFocused(club) }">
            <label title="Inititals">{{ club.initials }}</label>
            <label title="Seed strength (rank)">{{ club.seed() }} ({{ club.rankSeed }}.)</label>
            <label title="Role (rank matchday, role difference)">{{ club.role }} ({{ club.rankMatchday }}. {{
                club.roleDiff }})</label>
        </div>


        <!-- PERF AVG TOTAL & RESULT-->
        <div class="result">
            <label title="Points last 5 games (avg)">P5(ø) {{ club.resultPoints.slice(-5) }} ({{ club.pointsL5Avg()
                }})</label>
            <label title="W - OTW - OTL - L">{{ club.wins() }}-{{ club.winsOvertime() }}-{{ club.lossesOvertime() }}-{{
                club.losses() }}</label>
        </div>


        <!-- ABILITY & TWEAK -->
        <div v-if="globalState.clubsShowRoleDetails" class="ability-stats">
            <div class="ability-entry" title="Initiative">
                <label>In</label>
                <label>{{ club.initiative }}</label>
            </div>
            <div class="ability-entry" title="Transition">
                <label>Tr</label>
                <label>{{ club.transition }}</label>
            </div>
            <div class="ability-entry" title="Attack">
                <label>At</label>
                <label>{{ club.attack }}</label>
            </div>
            <div class="ability-entry" title="Defend">
                <label>De</label>
                <label>{{ club.defend }}</label>
            </div>
            <div class="ability-entry" title="Shoot">
                <label>Sh</label>
                <label>{{ club.shoot }}</label>
            </div>
            <div class="ability-entry" title="Save">
                <label>Sa</label>
                <label>{{ club.save }}</label>
            </div>
            <div class="ability-entry" title="Momentum">
                <label>Mm</label>
                <label>{{ formatD2(club.momentum) }}</label>
            </div>
            <div class="ability-entry" title="Form">
                <label>Fo</label>
                <label>{{ formatD2(club.form) }}</label>
            </div>
            <div class="ability-entry" title="Morale">
                <label>Mr</label>
                <label>{{ formatD2(club.morale) }}</label>
            </div>
        </div>


        <!-- PERF AVG & EFF & RESULT -->
        <div class="perf-stats">
            <div class="column">
                <!-- PERF AVG Last x -->
                <div v-if="globalState.clubsShowPerfAvgDetails">
                </div>

                <!-- PERF EFF Last x -->
                <div v-if="globalState.clubsShowPerfEffDetails">
                </div>

                <!-- RESULT -->
                <div v-if="globalState.clubsShowResultDetails">
                    <div class="perf-entry" title="Shots : Shots against per match">
                        <label>Sh/M</label><label>{{ club.shotsPerMatch() }} : {{ club.shotsAgainstPerMatch() }}</label>
                    </div>
                    <div class="perf-entry" title="Saves per match">
                        <label>Sa/M</label><label>{{ club.savesPerMatch() }}</label>
                    </div>
                    <div class="perf-entry" title="Goals : Goals against per match">
                        <label>G/M</label><label>{{ club.goalsPerMatch() }} : {{ club.goalsAgainstPerMatch() }}</label>
                    </div>
                    <div class="perf-entry" title="Goals difference per match">
                        <label>Dif/M</label><label>{{ club.goalsDiffPerMatch() }}</label>
                    </div>
                    <div class="perf-entry" title="Points per match">
                        <label>P/M</label><label>{{ club.pointsPerMatch() }}</label>
                    </div>
                </div>
            </div>


            <div class="column">
                <!-- PERF AVG TOTAL -->
                <div v-if="globalState.clubsShowPerfAvgDetails">
                    <div class="perf-entry" title="Initiative strength avg">
                        <label>Inø</label><label>{{ club.initiativeStrAvg() }}</label>
                    </div>
                    <div class="perf-entry" title="Transition strength avg">
                        <label>Trø</label><label>{{ club.transitionStrAvg() }}</label>
                    </div>
                    <div class="perf-entry" title="Attack strength avg">
                        <label>Atø</label><label>{{ club.attackStrAvg() }}</label>
                    </div>
                    <div class="perf-entry" title="Defend strength avg">
                        <label>Deø</label><label>{{ club.defendStrAvg() }}</label>
                    </div>
                    <div class="perf-entry" title="Shot strength avg">
                        <label>Shø</label><label>{{ club.shotStrAvg() }}</label>
                    </div>
                    <div class="perf-entry" title="Save strength avg">
                        <label>Saø</label><label>{{ club.saveStrAvg() }}</label>
                    </div>
                    <div class="perf-entry" title="Save strength avg">
                        <label>Mmø</label><label>{{ club.momentumStrAvg() }}</label>
                    </div>
                    <div class="perf-entry" title="Save strength avg">
                        <label>Foø</label><label>{{ club.formStrAvg() }}</label>
                    </div>
                    <div class="perf-entry" title="Save strength avg">
                        <label>Mrø</label><label>{{ club.moraleStrAvg() }}</label>
                    </div>
                </div>

                <!-- PERF EFF TOTAL -->
                <div v-if="globalState.clubsShowPerfEffDetails">
                    <div class="perf-entry" title="Initiatives efficiency">
                        <label>In%</label><label>{{ club.initiativesEff() }}</label>
                    </div>
                    <div class="perf-entry" title="Transitions efficiency">
                        <label>Tr%</label><label>{{ club.transitionsEff() }}</label>
                    </div>
                    <div class="perf-entry" title="Attacks efficiency">
                        <label>At%</label><label>{{ club.attacksEff() }}</label>
                    </div>
                    <div class="perf-entry" title="Defends efficiency">
                        <label>De%</label><label>{{ club.defendsEff() }}</label>
                    </div>
                    <div class="perf-entry" title="Counters efficiency">
                        <label>Co%</label><label>{{ club.countersEff() }}</label>
                    </div>
                    <div class="perf-entry" title="Fallbacks efficiency">
                        <label>Fb%</label><label>{{ club.fallbacksEff() }}</label>
                    </div>
                    <div class="perf-entry" title="Shots efficiency">
                        <label>Sh%</label><label>{{ club.shotsEff() }}</label>
                    </div>
                    <div class="perf-entry" title="Saves efficiency">
                        <label>Sa%</label><label>{{ club.savesEff() }}</label>
                    </div>
                    <div class="perf-entry" title="Sum of Shots & Saves efficiency">
                        <label>∑%</label><label>{{ club.shotsSavesEff() }}</label>
                    </div>
                </div>

                <!-- RESULT -->
                <div v-if="globalState.clubsShowResultDetails">
                    <div class="perf-entry" title="Shots : Shots against">
                        <label>Sh</label><label>{{ club.attackShots + club.counterShots }} : {{ club.attackShotsAgainst
                            + club.counterShotsAgainst }}</label>
                    </div>
                    <div class="perf-entry" title="Saves">
                        <label>Sa</label><label>{{ club.saves }}</label>
                    </div>
                    <div class="perf-entry" title="Goals : Goals against">
                        <label>G</label><label>{{ club.goals }} : {{ club.goalsAgainst }}</label>
                    </div>
                    <div class="perf-entry" title="Goals difference">
                        <label>Dif</label><label>{{ club.goalsDiff() }}</label>
                    </div>
                    <div class="perf-entry" title="Points">
                        <label>P</label><label>{{ club.points }}</label>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { globalState } from '../lib/state.js'
import { formatD2 } from '../lib/util.js'

export default {
    name: 'DisplayClubTemplate',
    props: {
        club: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            globalState
        }
    },
    methods: {
        formatD2, // need to define it here again to be able to use it in template section
        clubIsFocused(club) {
            return this.globalState.globalFocusClubs.includes(club.initials)
        }
    }
}
</script>

<style lang="scss" scoped>
.club {
    min-width: 320px;
    padding: 4px 8px;
    display: flex;
    flex-direction: column;
    border: 1px solid #f0275e;
    border-radius: 4px;
    background-color: #35495e;

    .role {
        display: flex;
        justify-content: space-between;
        font-weight: 700;
    }

    .result {
        display: flex;
        justify-content: space-between;
        font-weight: 700;
        padding-bottom: 4px;
        border-bottom: 1px dashed #f0275e;
        margin-bottom: 4px;
    }

    .ability-stats {
        display: flex;
        column-gap: 0.25rem;
        text-align: center;
        padding-bottom: 4px;
        border-bottom: 1px dashed #f0275e;
        margin-bottom: 4px;

        .ability-entry {
            display: flex;
            flex-direction: column;
            width: 2rem;
        }
    }

    .perf-stats {
        display: flex;
        justify-content: space-between;

        .column {
            .perf-entry {
                width: 9rem;
                display: flex;
                justify-content: space-between;
            }
        }
    }
}

@media (max-width: 576px) {
    .club {
        min-width: 160px;

        .ability-stats {
            .ability-entry {
                width: 1rem
            }
        }

        .perf-stats {
            .column {
                .perf-entry {
                    width: 5rem;
                }
            }
        }
    }
}
</style>