<template>
    <div class="display-matchday-table-wrapper">
        <div v-if="matchdayTable.length !== 0" class="matchday-table">
            <div class="header">
                <!-- TABLE HEADER -->
                <div class="column sticky-left-0 split">
                    <label>* * *</label>
                    <label title="Sort for rank" class="interact" @click="setSortTopic('')">Rank</label>
                </div>


                <!-- Default columns -->
                <div class="column sticky-left-1 split">
                    <label class="highlight" title="Live Table">Matchday</label>
                    <label class="highlight" title="Live Table">Table</label>
                </div>
                <div class="column interact" :class="{ 'highlight': sortTopic === 'matchesPlayed' }"
                    @click="setSortTopic('matchesPlayed')">
                    <label title="Matches played">M</label>
                </div>
                <div class="column interact" :class="{ 'highlight': sortTopic === 'goals' }"
                    @click="setSortTopic('goals')">
                    <label title="Goals">G</label>
                </div>
                <div class="column interact" :class="{ 'highlight': sortTopic === 'goalsAgainst' }"
                    @click="setSortTopic('goalsAgainst')">
                    <label title="Goals against">GA</label>
                </div>
                <div class="column interact" :class="{ 'highlight': sortTopic === 'goalsDiff' }"
                    @click="setSortTopic('goalsDiff')">
                    <label title="Goals difference">Dif</label>
                </div>
                <div class="column interact" :class="{ 'highlight': sortTopic === '' || sortTopic === 'points' }"
                    @click="setSortTopic('points')">
                    <label title="Points">P</label>
                </div>
                <div class="column">
                    <label title="Points last n games">PL{{ globalState.lastNMatchdays }}</label>
                </div>
                <div class="column interact" :class="{ 'highlight': sortTopic === 'pointsAvgL5' }"
                    @click="setSortTopic('pointsAvgL5')">
                    <label title="Points avg last n games">PøL{{ globalState.lastNMatchdays }}</label>
                </div>


                <!-- RESULT -->
                <div class="column interact" :class="{ 'highlight': sortTopic === 'shotsPerMatch' }"
                    @click="setSortTopic('shotsPerMatch')" v-if="globalState.tableShowResultDetails">
                    <label title="Shots per match">Sh/M</label>
                </div>
                <div class="column interact" :class="{ 'highlight': sortTopic === 'shotsAgainstPerMatch' }"
                    @click="setSortTopic('shotsAgainstPerMatch')" v-if="globalState.tableShowResultDetails">
                    <label title="Goals per match">ShA/M</label>
                </div>
                <div class="column interact" :class="{ 'highlight': sortTopic === 'savesPerMatch' }"
                    @click="setSortTopic('savesPerMatch')" v-if="globalState.tableShowResultDetails">
                    <label title="Saves per match">Sa/M</label>
                </div>
                <div class="column interact" :class="{ 'highlight': sortTopic === 'goalsPerMatch' }"
                    @click="setSortTopic('goalsPerMatch')" v-if="globalState.tableShowResultDetails">
                    <label title="Goals per match">G/M</label>
                </div>
                <div class="column interact" :class="{ 'highlight': sortTopic === 'goalsAgainstPerMatch' }"
                    @click="setSortTopic('goalsAgainstPerMatch')" v-if="globalState.tableShowResultDetails">
                    <label title="Goals against per match">GA/M</label>
                </div>
                <div class="column interact" :class="{ 'highlight': sortTopic === 'goalsDiffPerMatch' }"
                    @click="setSortTopic('goalsDiffPerMatch')" v-if="globalState.tableShowResultDetails">
                    <label title="Goals difference per match">Dif/M</label>
                </div>
                <div class="column interact" :class="{ 'highlight': sortTopic === 'pointsPerMatch' }"
                    @click="setSortTopic('pointsPerMatch')" v-if="globalState.tableShowResultDetails">
                    <label title="Points per match">P/M</label>
                </div>
                <div class="column interact" :class="{ 'highlight': sortTopic === 'wins' }"
                    @click="setSortTopic('wins')" v-if="globalState.tableShowResultDetails">
                    <label title="Wins">W</label>
                </div>
                <div class="column interact" :class="{ 'highlight': sortTopic === 'winsOvertime' }"
                    @click="setSortTopic('winsOvertime')" v-if="globalState.tableShowResultDetails">
                    <label title="Overtime wins">OTW</label>
                </div>
                <div class="column interact" :class="{ 'highlight': sortTopic === 'lossesOvertime' }"
                    @click="setSortTopic('lossesOvertime')" v-if="globalState.tableShowResultDetails">
                    <label title="Overtime losses">OTL</label>
                </div>
                <div class="column interact" :class="{ 'highlight': sortTopic === 'losses' }"
                    @click="setSortTopic('losses')" v-if="globalState.tableShowResultDetails">
                    <label title="Losses">L</label>
                </div>


                <!-- PERF AVG TOTAL -->
                <div class="column interact" :class="{ 'highlight': sortTopic === 'initiativeStrAvg' }"
                    @click="setSortTopic('initiativeStrAvg')" v-if="globalState.tableShowPerfAvgDetails">
                    <label title="Initiative strength avg">Inø</label>
                </div>
                <div class="column interact" :class="{ 'highlight': sortTopic === 'transitionStrAvg' }"
                    @click="setSortTopic('transitionStrAvg')" v-if="globalState.tableShowPerfAvgDetails">
                    <label title="Transition strength avg">Trø</label>
                </div>
                <div class="column interact" :class="{ 'highlight': sortTopic === 'attackStrAvg' }"
                    @click="setSortTopic('attackStrAvg')" v-if="globalState.tableShowPerfAvgDetails">
                    <label title="Attack strength avg">Atø</label>
                </div>
                <div class="column interact" :class="{ 'highlight': sortTopic === 'shotStrAvg' }"
                    @click="setSortTopic('shotStrAvg')" v-if="globalState.tableShowPerfAvgDetails">
                    <label title="Shot strength avg">Shø</label>
                </div>
                <div class="column interact" :class="{ 'highlight': sortTopic === 'defendStrAvg' }"
                    @click="setSortTopic('defendStrAvg')" v-if="globalState.tableShowPerfAvgDetails">
                    <label title="Defend strength avg">Deø</label>
                </div>
                <div class="column interact" :class="{ 'highlight': sortTopic === 'saveStrAvg' }"
                    @click="setSortTopic('saveStrAvg')" v-if="globalState.tableShowPerfAvgDetails">
                    <label title="Save strength avg">Saø</label>
                </div>
                <div class="column interact" :class="{ 'highlight': sortTopic === 'momentumStrAvg' }"
                    @click="setSortTopic('momentumStrAvg')" v-if="globalState.tableShowPerfAvgDetails">
                    <label title="Momentum avg">Mmø</label>
                </div>
                <div class="column interact" :class="{ 'highlight': sortTopic === 'formStrAvg' }"
                    @click="setSortTopic('formStrAvg')" v-if="globalState.tableShowPerfAvgDetails">
                    <label title="Form avg">Foø</label>
                </div>
                <div class="column interact" :class="{ 'highlight': sortTopic === 'moraleStrAvg' }"
                    @click="setSortTopic('moraleStrAvg')" v-if="globalState.tableShowPerfAvgDetails">
                    <label title="Morale avg">Mrø</label>
                </div>


                <!-- PERF EFF TOTAL -->
                <div class="column interact" :class="{ 'highlight': sortTopic === 'initiativesEff' }"
                    @click="setSortTopic('initiativesEff')" v-if="globalState.tableShowPerfEffDetails">
                    <label title="Initiatives efficiency">In%</label>
                </div>
                <div class="column interact" :class="{ 'highlight': sortTopic === 'transitionsEff' }"
                    @click="setSortTopic('transitionsEff')" v-if="globalState.tableShowPerfEffDetails">
                    <label title="Transitions efficiency">Tr%</label>
                </div>
                <div class="column interact" :class="{ 'highlight': sortTopic === 'attacksEff' }"
                    @click="setSortTopic('attacksEff')" v-if="globalState.tableShowPerfEffDetails">
                    <label title="Attacks efficiency">At%</label>
                </div>
                <div class="column interact" :class="{ 'highlight': sortTopic === 'defendsEff' }"
                    @click="setSortTopic('defendsEff')" v-if="globalState.tableShowPerfEffDetails">
                    <label title="Defends efficiency">De%</label>
                </div>
                <div class="column interact" :class="{ 'highlight': sortTopic === 'countersEff' }"
                    @click="setSortTopic('countersEff')" v-if="globalState.tableShowPerfEffDetails">
                    <label title="Counters efficiency">Co%</label>
                </div>
                <div class="column interact" :class="{ 'highlight': sortTopic === 'fallbacksEff' }"
                    @click="setSortTopic('fallbacksEff')" v-if="globalState.tableShowPerfEffDetails">
                    <label title="Fallbacks efficiency">Fb%</label>
                </div>
                <div class="column interact" :class="{ 'highlight': sortTopic === 'shotsEff' }"
                    @click="setSortTopic('shotsEff')" v-if="globalState.tableShowPerfEffDetails">
                    <label title="Shots efficiency">Sh%</label>
                </div>
                <div class="column interact" :class="{ 'highlight': sortTopic === 'savesEff' }"
                    @click="setSortTopic('savesEff')" v-if="globalState.tableShowPerfEffDetails">
                    <label title="Saves efficiency">Sa%</label>
                </div>
                <div class="column interact" :class="{ 'highlight': sortTopic === 'shotsSavesEff' }"
                    @click="setSortTopic('shotsSavesEff')" v-if="globalState.tableShowPerfEffDetails">
                    <label title="Sum of Shots & Saves efficiency">∑%</label>
                </div>


                <!-- ROLE -->
                <div class="column interact" :class="{ 'highlight': sortTopic === 'seed' }"
                    @click="setSortTopic('seed')" v-if="globalState.tableShowRoleDetails">
                    <label title="Seed">Seed</label>
                </div>
                <div class="column interact" :class="{ 'highlight': sortTopic === 'rankSeed' }"
                    @click="setSortTopic('rankSeed')" v-if="globalState.tableShowRoleDetails">
                    <label title="Seed rank">SRa</label>
                </div>
                <!-- <div class="column interact" :class="{ 'highlight': sortTopic === 'rankMatchday' }" @click="setSortTopic('rankMatchday')" v-if="globalState.tableShowRoleDetails">
                    <label title="Day rank">DRa</label>
                </div> -->
                <div class="column" v-if="globalState.tableShowRoleDetails">
                    <label title="Role">Role</label>
                </div>
                <div class="column interact" :class="{ 'highlight': sortTopic === 'roleDiff' }"
                    @click="setSortTopic('roleDiff')" v-if="globalState.tableShowRoleDetails">
                    <label title="Role difference">RDiff</label>
                </div>
                <div class="column interact" :class="{ 'highlight': sortTopic === 'priceMoney' }"
                    @click="setSortTopic('priceMoney')" v-if="globalState.tableShowRoleDetails">
                    <label title="Price money (in thousand)">Pr$</label>
                </div>


                <!-- ABILITY -->
                <div class="column interact" :class="{ 'highlight': sortTopic === 'initiative' }"
                    @click="setSortTopic('initiative')" v-if="globalState.tableShowRoleDetails">
                    <label title="Initiative">In</label>
                </div>
                <div class="column interact" :class="{ 'highlight': sortTopic === 'transition' }"
                    @click="setSortTopic('transition')" v-if="globalState.tableShowRoleDetails">
                    <label title="Transition">Tr</label>
                </div>
                <div class="column interact" :class="{ 'highlight': sortTopic === 'attack' }"
                    @click="setSortTopic('attack')" v-if="globalState.tableShowRoleDetails">
                    <label title="Transition">At</label>
                </div>
                <div class="column interact" :class="{ 'highlight': sortTopic === 'defend' }"
                    @click="setSortTopic('defend')" v-if="globalState.tableShowRoleDetails">
                    <label title="Transition">De</label>
                </div>
                <div class="column interact" :class="{ 'highlight': sortTopic === 'shoot' }"
                    @click="setSortTopic('shoot')" v-if="globalState.tableShowRoleDetails">
                    <label title="Transition">Sh</label>
                </div>
                <div class="column interact" :class="{ 'highlight': sortTopic === 'save' }"
                    @click="setSortTopic('save')" v-if="globalState.tableShowRoleDetails">
                    <label title="Transition">Sa</label>
                </div>
                <div class="column interact" :class="{ 'highlight': sortTopic === 'momentum' }"
                    @click="setSortTopic('momentum')" v-if="globalState.tableShowRoleDetails">
                    <label title="Momentum">Mm</label>
                </div>
                <div class="column interact" :class="{ 'highlight': sortTopic === 'form' }"
                    @click="setSortTopic('form')" v-if="globalState.tableShowRoleDetails">
                    <label title="Form">Fo</label>
                </div>
                <div class="column interact" :class="{ 'highlight': sortTopic === 'morale' }"
                    @click="setSortTopic('morale')" v-if="globalState.tableShowRoleDetails">
                    <label title="Morale">Mr</label>
                </div>
            </div>


            <!-- TABLE CONTENT -->
            <div class="body">
                <!-- Default columns -->
                <li v-for="(club, index) in matchdayTable" :key="index" class="entry">
                    <div class="column sticky-left-0" :class="{ 'highlight': clubIsFocused(club) }">
                        <label>{{ club.rankLive }}</label>
                    </div>
                    <div class="column sticky-left-1 interact" :class="{ 'highlight': clubIsFocused(club) }"
                        @click="addTableFocusClub(club)">
                        <label>{{ club.initials }}</label>
                    </div>
                    <div class="column" :class="{ 'highlight': sortTopic === 'matchesPlayed' || clubIsFocused(club) }">
                        <label>{{ club.matchesPlayed }}</label>
                    </div>
                    <div class="column" :class="{ 'highlight': sortTopic === 'goals' || clubIsFocused(club) }">
                        <label>{{ club.goals }}</label>
                    </div>
                    <div class="column" :class="{ 'highlight': sortTopic === 'goalsAgainst' || clubIsFocused(club) }">
                        <label>{{ club.goalsAgainst }}</label>
                    </div>
                    <div class="column" :class="{ 'highlight': sortTopic === 'goalsDiff' || clubIsFocused(club) }">
                        <label>{{ club.goals - club.goalsAgainst }}</label>
                    </div>
                    <div class="column" :class="{ 'highlight': sortTopic === '' || sortTopic === 'points' || clubIsFocused(club) }">
                        <label>{{ club.points }}</label>
                    </div>
                    <div class="column pointsL5" :class="{ 'highlight': clubIsFocused(club) }">
                        <label>{{ club.resultPoints.slice(-globalState.lastNMatchdays).join('') }}</label>
                    </div>
                    <div class="column" :class="{ 'highlight': sortTopic === 'pointsAvgL5' || clubIsFocused(club) }">
                        <label>{{ club.pointsAvgL5(globalState.lastNMatchdays) }}</label>
                    </div>


                    <!-- RESULT -->
                    <div class="column" :class="{ 'highlight': sortTopic === 'shotsPerMatch' || clubIsFocused(club) }"
                        v-if="globalState.tableShowResultDetails">
                        <label>{{ club.shotsPerMatch() }}</label>
                    </div>
                    <div class="column"
                        :class="{ 'highlight': sortTopic === 'shotsAgainstPerMatch' || clubIsFocused(club) }"
                        v-if="globalState.tableShowResultDetails">
                        <label>{{ club.shotsAgainstPerMatch() }}</label>
                    </div>
                    <div class="column" :class="{ 'highlight': sortTopic === 'savesPerMatch' || clubIsFocused(club) }"
                        v-if="globalState.tableShowResultDetails">
                        <label>{{ club.savesPerMatch() }}</label>
                    </div>
                    <div class="column" :class="{ 'highlight': sortTopic === 'goalsPerMatch' || clubIsFocused(club) }"
                        v-if="globalState.tableShowResultDetails">
                        <label>{{ club.goalsPerMatch() }}</label>
                    </div>
                    <div class="column"
                        :class="{ 'highlight': sortTopic === 'goalsAgainstPerMatch' || clubIsFocused(club) }"
                        v-if="globalState.tableShowResultDetails">
                        <label>{{ club.goalsAgainstPerMatch() }}</label>
                    </div>
                    <div class="column"
                        :class="{ 'highlight': sortTopic === 'goalsDiffPerMatch' || clubIsFocused(club) }"
                        v-if="globalState.tableShowResultDetails">
                        <label>{{ formatD1((club.goals - club.goalsAgainst) / club.matchesPlayed) }}</label>
                    </div>
                    <div class="column" :class="{ 'highlight': sortTopic === 'pointsPerMatch' || clubIsFocused(club) }"
                        v-if="globalState.tableShowResultDetails">
                        <label>{{ formatD1(club.pointsPerMatch()) }}</label>
                    </div>
                    <div class="column" :class="{ 'highlight': sortTopic === 'wins' || clubIsFocused(club) }"
                        v-if="globalState.tableShowResultDetails">
                        <label>{{ club.wins() }}</label>
                    </div>
                    <div class="column" :class="{ 'highlight': sortTopic === 'winsOvertime' || clubIsFocused(club) }"
                        v-if="globalState.tableShowResultDetails">
                        <label>{{ club.winsOvertime() }}</label>
                    </div>
                    <div class="column" :class="{ 'highlight': sortTopic === 'lossesOvertime' || clubIsFocused(club) }"
                        v-if="globalState.tableShowResultDetails">
                        <label>{{ club.lossesOvertime() }}</label>
                    </div>
                    <div class="column" :class="{ 'highlight': sortTopic === 'losses' || clubIsFocused(club) }"
                        v-if="globalState.tableShowResultDetails">
                        <label>{{ club.losses() }}</label>
                    </div>


                    <!-- PERF AVG TOTAL -->
                    <div class="column"
                        :class="{ 'highlight': sortTopic === 'initiativeStrAvg' || clubIsFocused(club) }"
                        v-if="globalState.tableShowPerfAvgDetails">
                        <label>{{ club.initiativeStrAvg() }}</label>
                    </div>
                    <div class="column"
                        :class="{ 'highlight': sortTopic === 'transitionStrAvg' || clubIsFocused(club) }"
                        v-if="globalState.tableShowPerfAvgDetails">
                        <label>{{ club.transitionStrAvg() }}</label>
                    </div>
                    <div class="column" :class="{ 'highlight': sortTopic === 'attackStrAvg' || clubIsFocused(club) }"
                        v-if="globalState.tableShowPerfAvgDetails">
                        <label>{{ club.attackStrAvg() }}</label>
                    </div>
                    <div class="column" :class="{ 'highlight': sortTopic === 'defendStrAvg' || clubIsFocused(club) }"
                        v-if="globalState.tableShowPerfAvgDetails">
                        <label>{{ club.defendStrAvg() }}</label>
                    </div>
                    <div class="column" :class="{ 'highlight': sortTopic === 'shotStrAvg' || clubIsFocused(club) }"
                        v-if="globalState.tableShowPerfAvgDetails">
                        <label>{{ club.shotStrAvg() }}</label>
                    </div>
                    <div class="column" :class="{ 'highlight': sortTopic === 'saveStrAvg' || clubIsFocused(club) }"
                        v-if="globalState.tableShowPerfAvgDetails">
                        <label>{{ club.saveStrAvg() }}</label>
                    </div>
                    <div class="column" :class="{ 'highlight': sortTopic === 'momentumStrAvg' || clubIsFocused(club) }"
                        v-if="globalState.tableShowPerfAvgDetails">
                        <label>{{ (club.momentumStrAvg()) }}</label>
                    </div>
                    <div class="column" :class="{ 'highlight': sortTopic === 'formStrAvg' || clubIsFocused(club) }"
                        v-if="globalState.tableShowPerfAvgDetails">
                        <label>{{ (club.formStrAvg()) }}</label>
                    </div>
                    <div class="column" :class="{ 'highlight': sortTopic === 'moraleStrAvg' || clubIsFocused(club) }"
                        v-if="globalState.tableShowPerfAvgDetails">
                        <label>{{ (club.moraleStrAvg()) }}</label>
                    </div>


                    <!-- PERF EFF TOTAL -->
                    <div class="column" :class="{ 'highlight': sortTopic === 'initiativesEff' || clubIsFocused(club) }"
                        v-if="globalState.tableShowPerfEffDetails">
                        <label>{{ club.initiativesEff() }}</label>
                    </div>
                    <div class="column" :class="{ 'highlight': sortTopic === 'transitionsEff' || clubIsFocused(club) }"
                        v-if="globalState.tableShowPerfEffDetails">
                        <label>{{ club.transitionsEff() }}</label>
                    </div>
                    <div class="column" :class="{ 'highlight': sortTopic === 'attacksEff' || clubIsFocused(club) }"
                        v-if="globalState.tableShowPerfEffDetails">
                        <label>{{ club.attacksEff() }}</label>
                    </div>
                    <div class="column" :class="{ 'highlight': sortTopic === 'defendsEff' || clubIsFocused(club) }"
                        v-if="globalState.tableShowPerfEffDetails">
                        <label>{{ club.defendsEff() }}</label>
                    </div>
                    <div class="column" :class="{ 'highlight': sortTopic === 'countersEff' || clubIsFocused(club) }"
                        v-if="globalState.tableShowPerfEffDetails">
                        <label>{{ club.countersEff() }}</label>
                    </div>
                    <div class="column" :class="{ 'highlight': sortTopic === 'fallbacksEff' || clubIsFocused(club) }"
                        v-if="globalState.tableShowPerfEffDetails">
                        <label>{{ club.fallbacksEff() }}</label>
                    </div>
                    <div class="column" :class="{ 'highlight': sortTopic === 'shotsEff' || clubIsFocused(club) }"
                        v-if="globalState.tableShowPerfEffDetails">
                        <label>{{ club.shotsEff() }}</label>
                    </div>
                    <div class="column" :class="{ 'highlight': sortTopic === 'savesEff' || clubIsFocused(club) }"
                        v-if="globalState.tableShowPerfEffDetails">
                        <label>{{ club.savesEff() }}</label>
                    </div>
                    <div class="column" :class="{ 'highlight': sortTopic === 'shotsSavesEff' || clubIsFocused(club) }"
                        v-if="globalState.tableShowPerfEffDetails">
                        <label>{{ club.shotsSavesEff() }}</label>
                    </div>


                    <!-- ROLE -->
                    <div class="column" :class="{ 'highlight': sortTopic === 'seed' || clubIsFocused(club) }"
                        v-if="globalState.tableShowRoleDetails">
                        <label>{{ club.seed() }}</label>
                    </div>
                    <div class="column" :class="{ 'highlight': sortTopic === 'rankSeed' || clubIsFocused(club) }"
                        v-if="globalState.tableShowRoleDetails">
                        <label>{{ club.rankSeed }}</label>
                    </div>
                    <!-- <div class="column" :class="{ 'highlight': sortTopic === 'rankMatchday' || clubIsFocused(club) }" v-if="globalState.tableShowRoleDetails">
                        <label>{{ club.rankMatchday }}</label>
                    </div> -->
                    <div class="column" :class="{ 'highlight': clubIsFocused(club) }"
                        v-if="globalState.tableShowRoleDetails">
                        <label>{{ club.role.slice(0, 5) }}</label>
                    </div>
                    <div class="column" :class="{ 'highlight': sortTopic === 'roleDiff' || clubIsFocused(club) }"
                        v-if="globalState.tableShowRoleDetails">
                        <label>{{ club.roleDiff }}</label>
                    </div>
                    <div class="column" :class="{ 'highlight': sortTopic === 'priceMoney' || clubIsFocused(club) }"
                        v-if="globalState.tableShowRoleDetails">
                        <label>{{ (club.priceMoney / 1000).toFixed(2) }}</label>
                    </div>


                    <!-- ABILITY -->
                    <div class="column" :class="{ 'highlight': sortTopic === 'initiative' || clubIsFocused(club) }"
                        v-if="globalState.tableShowRoleDetails">
                        <label>{{ club.initiative }}</label>
                    </div>
                    <div class="column" :class="{ 'highlight': sortTopic === 'transition' || clubIsFocused(club) }"
                        v-if="globalState.tableShowRoleDetails">
                        <label>{{ club.transition }}</label>
                    </div>
                    <div class="column" :class="{ 'highlight': sortTopic === 'attack' || clubIsFocused(club) }"
                        v-if="globalState.tableShowRoleDetails">
                        <label>{{ club.attack }}</label>
                    </div>
                    <div class="column" :class="{ 'highlight': sortTopic === 'shoot' || clubIsFocused(club) }"
                        v-if="globalState.tableShowRoleDetails">
                        <label>{{ club.shoot }}</label>
                    </div>
                    <div class="column" :class="{ 'highlight': sortTopic === 'defend' || clubIsFocused(club) }"
                        v-if="globalState.tableShowRoleDetails">
                        <label>{{ club.defend }}</label>
                    </div>
                    <div class="column" :class="{ 'highlight': sortTopic === 'save' || clubIsFocused(club) }"
                        v-if="globalState.tableShowRoleDetails">
                        <label>{{ club.save }}</label>
                    </div>
                    <div class="column" :class="{ 'highlight': sortTopic === 'momentum' || clubIsFocused(club) }"
                        v-if="globalState.tableShowRoleDetails">
                        <label>{{ formatD2(club.momentum) }}</label>
                    </div>
                    <div class="column" :class="{ 'highlight': sortTopic === 'form' || clubIsFocused(club) }"
                        v-if="globalState.tableShowRoleDetails">
                        <label>{{ formatD2(club.form) }}</label>
                    </div>
                    <div class="column" :class="{ 'highlight': sortTopic === 'morale' || clubIsFocused(club) }"
                        v-if="globalState.tableShowRoleDetails">
                        <label>{{ formatD2(club.morale) }}</label>
                    </div>
                </li>
            </div>
        </div>
    </div>
</template>

<script>
import { globalState } from '../lib/state.js'
import { updateRank, formatD1, formatD2 } from '../lib/util.js'

export default {
    name: 'DisplayMatchdayTable',
    data() {
        return {
            globalState,
            matchdayTable: [],
            sortTopic: '',
            tableFocusClubs: []
        }
    },
    computed: {
        // currMatchDay is always "the next day", so we need to show "the last day" up until it actually is the last day
        // see AppControls -> matchdayTableDisplayMaxMatchday
        // not all checks here are needed since validateSelectedMatchdayInput in AppControls handels some of the boundaries 
        clubs() {
            return this.globalState.simulatedMatchdays.length !== 0 
                && this.globalState.selectedMatchday 
                && this.globalState.selectedMatchday > 0 
                && this.globalState.selectedMatchday <= this.globalState.simulatedMatchdays.length
                ? [...this.globalState.simulatedMatchdays[this.globalState.selectedMatchday - 1]].flatMap(report => [report.home, report.away])
                : []
        }
    },
    methods: {
        formatD1, // need to define it here again to be able to use it in template section
        formatD2,
        createMatchdayTable(clubs, sortTopic, entryName) {
            this.matchdayTable = updateRank(clubs, sortTopic, entryName).sort((a, b) => {
                return typeof a[this.sortTopic] === 'function'
                    ? b[this.sortTopic](this.globalState.lastNMatchdays) - a[this.sortTopic](this.globalState.lastNMatchdays)
                    : b[this.sortTopic] - a[this.sortTopic]
            })
        },
        setSortTopic(topic) {
            this.sortTopic = topic
            this.createMatchdayTable(this.clubs)
        },
        addTableFocusClub(club) {
            this.tableFocusClubs.includes(club.initials)
                ? this.tableFocusClubs = this.tableFocusClubs.filter(item => item !== club.initials)
                : this.tableFocusClubs.push(club.initials)
        },
        clubIsFocused(club) {
            return globalState.globalFocusClubs.includes(club.initials) || this.tableFocusClubs.includes(club.initials)
        }
    },
    watch: {
        clubs: {
            handler(newClubs, oldClubs) {
                this.createMatchdayTable([...newClubs], null, 'rankLive')
            },
            // deep: true
        }
    }
}
</script>

<style lang="scss" scoped>
.display-matchday-table-wrapper {
    overflow-x: scroll;

    .matchday-table {
        min-width: fit-content;
        max-width: fit-content;
        list-style: none;
        border: 1px solid #f0275e;
        border-radius: 4px;
        background-color: #35495e;

        .header {
            display: flex;
            justify-content: flex-end;
            column-gap: 4px;
            font-weight: 700;
            padding: 4px 8px;
            border-bottom: 2px dashed #f0275e;
        }

        .body {
            display: flex;
            flex-direction: column;
        }

        .column {
            width: 2.5rem;
            text-align: center;
        }

        .entry {
            display: flex;
            justify-content: flex-end;
            column-gap: 4px;
            padding: 4px 8px;

            &:not(:first-of-type) {
                border-top: 1px dashed #f0275e;
            }
        }

        .sticky-left-0 {
            position: sticky;
            left: 0;
            background-color: #35495e;
            // backdrop-filter: blur(20px)
        }

        .sticky-left-1 {
            position: sticky;
            left: 2.5rem;
            background-color: #35495e;
        }

        .split {
            font-size: 0.5rem;
            display: flex;
            flex-direction: column;
        }

        .pointsL5 {
            font-size: 0.85rem;
            display: flex;
            place-items: center;
        }
    }
}

@media (max-width: 576px) {
    .display-matchday-table-wrapper {
        .matchday-table {
            .column {
                width: 2rem;
            }

            .sticky-left-1 {
                left: 2rem;
            }

            .pointsL5 {
                font-size: 0.5rem;
            }
        }
    }
}
</style>