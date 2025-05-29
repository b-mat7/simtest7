<template>
  <div class="simulate-match-wrapper">
    <div class="main">
      <div class="teams">
        <label :class="{'highlight': clubIsFocused(home)}">{{ home.initials }}</label>
        <label> - </label>
        <label :class="{'highlight': clubIsFocused(away)}">{{ away.initials }}</label>
      </div>
      <div class="standing">
        <label>{{ homeGoals }}</label>
        <label> : </label>
        <label>{{ awayGoals }}</label>
        <div class="time">
          <label>{{ matchTime }}.</label>
        </div>
      </div>
      <div class="controls">
        <button
          v-if="!matchOngoing"
          :disabled="matchTime === matchLength"
          class="match-btn btn-interact"
          @click="simulateMatch"
          >Anpfiff
        </button>
        <button
          v-else
          :disabled="matchTime === matchLength"
          class="match-btn btn-interact"
          @click="stopSimulateMatch"
          >Auszeit
        </button>
        <button
          v-if="matchTime > 0"
          class="match-btn btn-interact"
          @click="showDetails = !showDetails"
          >Details
        </button>
      </div>
    </div>
    <div v-if="showDetails || showMatchdayDetails" class="details">
      <div v-if="showStats" @click="showStats = !showStats" class="stats">
        <div class="possession">
          <div class="entry">
            <label class="bold">Inø</label>
            <label>{{ formatD1(homeInitiativeStrSum / matchTime) }}</label>
            <label>{{ formatD1(awayInitiativeStrSum / matchTime) }}</label>
          </div>
          <div class="entry">
            <label class="bold">At%</label>
            <label>{{ formatD0(homeAttacks / matchTime * 100) }}</label>
            <label>{{ formatD0(awayAttacks / matchTime * 100) }}</label>
          </div>
          <div class="entry">
            <label class="bold">Trø</label>
            <label>{{ formatD1(homeTransitionStrSum / (homeCounters + homeFallbacks)) }}</label>
            <label>{{ formatD1(awayTransitionStrSum / (awayCounters + awayFallbacks)) }}</label>
          </div>
          <div class="entry">
            <label class="bold">Co%</label>
            <label>{{ formatD0(homeCounterShots / homeCounters * 100) }}</label>
            <label>{{ formatD0(awayCounterShots / awayCounters * 100) }}</label>
          </div>
          <div class="entry">
            <label class="bold">Fb%</label>
            <label>{{ formatD0((homeFallbacks - awayCounterShots) / homeFallbacks * 100) }}</label>
            <label>{{ formatD0((awayFallbacks - homeCounterShots) / awayFallbacks * 100) }}</label>
          </div>
        </div>
        <div class="tweaks">
          <div class="entry">
            <label class="bold">Mm</label>
            <label>{{ formatD2(homeMomentum) }}</label>
            <label>{{ formatD2(awayMomentum) }}</label>
          </div>
          <div class="entry">
            <label class="bold">Fo</label>
            <label>{{ formatD2(home.form) }}</label>
            <label>{{ formatD2(away.form) }}</label>
          </div>
          <div class="entry">
            <label class="bold">Mr</label>
            <label>{{ formatD2(home.morale) }}</label>
            <label>{{ formatD2(away.morale) }}</label>
          </div>
          <!-- <div class="entry">
            <label>Mod</label>
            Analog zu Buffs
          </div> -->
        </div>
        <div class="attack">
          <div class="entry">
            <label class="bold">Atø</label>
            <label>{{ formatD1(homeAttackStrSum / homeAttacks) }}</label>
            <label>{{ formatD1(awayAttackStrSum / awayAttacks) }}</label>
          </div>
          <div class="entry">
            <label class="bold">Shø</label>
            <label>{{ formatD1(homeShotStrSum / (homeAttackShots + homeCounterShots)) }}</label>
            <label>{{ formatD1(awayShotStrSum / (awayAttackShots + awayCounterShots)) }}</label>
          </div>
          <div class="entry">
            <label class="bold">Sh, %</label>
            <label>{{ homeAttackShots + homeCounterShots }} | {{ formatD0(homeGoals / (homeAttackShots + homeCounterShots) * 100) }}</label>
            <label>{{ awayAttackShots + awayCounterShots }} | {{ formatD0(awayGoals / (awayAttackShots + awayCounterShots) * 100) }}</label>
          </div>
        </div>
        <div class="defend">
          <div class="entry">
            <label class="bold">Deø</label>
            <label>{{ formatD1(homeDefendStrSum / homeDefends) }}</label>
            <label>{{ formatD1(awayDefendStrSum / awayDefends) }}</label>
          </div>
          <div class="entry">
            <label class="bold">Saø</label>
            <label>{{ formatD1(homeSaveStrSum / (awayAttackShots + awayCounterShots)) }}</label>
            <label>{{ formatD1(awaySaveStrSum / (homeAttackShots + homeCounterShots)) }}</label>
          </div>
          <div class="entry">
            <label class="bold">Sa, %</label>
            <label>{{ homeSaves }} | {{ formatD0(homeSaves / (awayAttackShots + awayCounterShots) * 100) }}</label>
            <label>{{ awaySaves }} | {{ formatD0(awaySaves / (homeAttackShots + homeCounterShots) * 100) }}</label>
          </div>
        </div>
      </div>
      <div v-else @click="showStats = !showStats" class="ticker">
        <li v-for="(tick, index) in liveTicker.slice().reverse()" :key="index" :class="{ bold: tick.includes('Goal')}">
          {{ tick }}
        </li>
        <label>Unser LiveTicker berichtet... live...oO</label>
      </div>
    </div>
  </div>
</template>

<script>
import { globalState } from '../lib/state.js'
import { calcMomentum, calcInitiative, calcTransition, calcAttackStr, calcDefendStr, calcShotStr, calcSaveStr, calcShotCheck, updateTeam, updatePoints, updateFormData, updateForm, updateMorale, formatD0, formatD1, formatD2 } from '../lib/util.js'
import { cloneDeep } from 'lodash'

export default {
  emits: ['matchFinished'],
  name: 'SimulateMatch',
  props: {
    match: {
      type: Object,
      required: true
    },
    matchdayOngoing: {  //xday
      type: Boolean
    },
    showMatchdayDetails: {
      type: Boolean
    }
  },
  data() {
    return {
      globalState,
      matchTime: 0,
      matchLength: 60,
      initMatchesPlayedUpdated: false,
      matchOngoing: false,
      simulateMatchIntervall: null,
      initPointsSet: false,
      lastIntervalLeader: '',
      lastIntervalTrailer: '',

      showDetails: false,
      showStats: true,

      home: this.match.home,
      away: this.match.away,

      // if JS/BE: can be const vars outside simMatch() und als args übergeben
      homeMomentum: 1,
      awayMomentum: 1,
      homeInitiativeStr: 1,
      awayInitiativeStr: 1,
      homeInitiativeStrSum: 0,
      awayInitiativeStrSum: 0,
      homeTransitionStr: 1,
      awayTransitionStr: 1,
      homeTransitionStrSum: 0,
      awayTransitionStrSum: 0,
      attackStr: 0,
      defendStr: 0,
      homeAttackStrSum: 0,
      awayAttackStrSum: 0,
      homeDefendStrSum: 0,
      awayDefendStrSum: 0,
      shotStr: 0,
      saveStr: 0,
      homeShotStrSum: 0,
      awayShotStrSum: 0,
      homeSaveStrSum: 0,
      awaySaveStrSum: 0,

      homeAttacks: 0,
      awayAttacks: 0,
      homeDefends: 0,
      awayDefends: 0,
      homeCounters: 0,
      awayCounters: 0,
      homeFallbacks: 0,
      awayFallbacks: 0,
      homeAttackShots: 0,
      awayAttackShots: 0,
      homeCounterShots: 0,
      awayCounterShots: 0,
      // no ...shotsAgainst registered here (using #opponent's shots)
      homeSaves: 0,
      awaySaves: 0,
      homeGoals: 0,
      awayGoals: 0,
      liveTicker: [],
    }
  },
  methods: {
    formatD0, // need to define it here again to be able to use it in template section
    formatD1,
    formatD2,
    clubIsFocused(club) {
      return globalState.globalFocusClubs.includes(club.initials)
    },
    startSimulateMatch() {  // xday
    },
    simulateMatch() {
      // update matches_played one-time
      !this.initMatchesPlayedUpdated ? (this.home.matchesPlayed++, this.away.matchesPlayed++, this.initMatchesPlayedUpdated = true) : null


      // >--< >--< >--< >--< >--< >--< >--< >--< >--< >--<
      // >--< >--< >--< START MATCH CYCLE >--< >--< >--<
      // >--< >--< >--< >--< >--< >--< >--< >--< >--< >--<
      this.matchOngoing = true
      this.simulateMatchIntervall = setInterval(() => {

        // return-early pattern, bouncer
        if (this.matchTime === this.matchLength && this.homeGoals !== this.awayGoals) {
          this.stopSimulateMatch()
          return
        }

        // update match: matchTime & club: intervals played
        this.matchTime++
        this.home.intervalsPlayed++
        this.away.intervalsPlayed++

        // calc teamWerte aus einzelnen players
        // -> für alle Werte = mmer average der jew players-werte


        // >--< >--< >--< >--< >--< >--< >--< >--< >--< >--<
        // >--< >--< >--< DETERMINE INITIATIVE >--< >--< >--<
        // >--< >--< >--< >--< >--< >--< >--< >--< >--< >--<
        // calc both teams' play momentum
        calcMomentum(this, this.home, this.away)

        // calc both teams' initiativeStr
        calcInitiative(this, this.home, this.away, this.globalState.outfieldPlayerDiceRange)

        // determine attacker based on initiative
        // BULLYS: bullyStr(bestPlayer) + dice + momentum
        let [attacker, defender] = this.homeInitiativeStr >= this.awayInitiativeStr
          ? [this.home, this.away]
          : [this.away, this.home]

        // add attack and defend
        attacker === this.home 
          ? (this.homeAttacks++, this.awayDefends++) 
          : (this.homeDefends++, this.awayAttacks++)
        attacker.attacks++
        defender.defends++


        // >--< >--< >--< >--< >--< >--< >--< >--< >--<
        // >--< >--< >--< HANDLE ATTACK >--< >--< >--<
        // >--< >--< >--< >--< >--< >--< >--< >--< >--<
        // calc attackStr + defendStr
        this.attackStr = calcAttackStr(attacker, this.globalState.outfieldPlayerDiceRange)
        this.defendStr = calcDefendStr(defender, this.globalState.outfieldPlayerDiceRange)
        attacker === this.home
          ? (this.homeAttackStrSum += this.attackStr, this.awayDefendStrSum += this.defendStr)
          : (this.homeDefendStrSum += this.defendStr, this.awayAttackStrSum += this.attackStr)

        // if attackStr > defendStr => get Shot on goal
        if (this.attackStr > this.defendStr) {
          attacker === this.home ? this.homeMomentum += 0.35 : this.awayMomentum += 0.3
          attacker === this.home ? this.homeAttackShots++ : this.awayAttackShots++
          attacker.attackShots++
          defender.attackShotsAgainst++

          // Time inkl random seconds: ${this.matchTime - 1}:${(Math.floor(Math.random() * 60)).toString().padStart(2, 0)}
          this.liveTicker.push(`
            ${this.matchTime}. Min | ${this.homeGoals} : ${this.awayGoals} - ${attacker.initials} Attack success - ${this.attackStr} : ${this.defendStr} (${(this.attackStr - this.defendStr).toFixed(1)})
          `)
          // console.log(`${attacker.initials} ATTACK SUCCESS`)


          // >--< >--< >---< >--< >--< >--< >--< >--< >--< >--< >---< 
          // >--< >--< >---< HANDLE SHOT (attackShot) >--< >--< >---<
          // >--< >--< >---< >--< >--< >--< >--< >--< >--< >--< >---<
          // calc Scoring- & SaveStr
          this.shotStr = calcShotStr(attacker, this.globalState.outfieldPlayerDiceRange)
          this.saveStr = calcSaveStr(defender, this.globalState.goalkeeperDiceRange)
          attacker === this.home
          ? (this.homeShotStrSum += this.shotStr, this.awaySaveStrSum += this.saveStr)
          : (this.homeSaveStrSum += this.saveStr, this.awayShotStrSum += this.shotStr)

          // if ScoreChance > SaveChance => Score goal
          if (this.shotStr > this.saveStr && calcShotCheck(attacker, defender, 'attack')) {
            attacker === this.home ? this.homeMomentum += 0.5 : this.awayMomentum += 0.4
            attacker === this.home ? this.homeGoals++ : this.awayGoals++
            attacker.goals++
            defender.goalsAgainst++

            this.liveTicker.push(`
              ${this.matchTime}. Min | ${this.homeGoals} : ${this.awayGoals} - ${attacker.initials} Goal - ${this.shotStr} : ${this.saveStr} (${(this.shotStr - this.saveStr).toFixed(1)})
            `)
            // console.log(`${attacker.initials} >--< >--< >--< ATTACK GOAL - END >--< >--< >--<`)

          // if ScoreChance < SaveChance => miss goal
          } else {
            attacker === this.home ? this.awaySaves++ : this.homeSaves++
            defender.saves++

            this.liveTicker.push(`
              ${this.matchTime}. Min | ${this.homeGoals} : ${this.awayGoals} - ${attacker.initials} Miss - ${this.shotStr} : ${this.saveStr} (${(this.shotStr - this.saveStr).toFixed(1)})               
            `)
            // console.log(`${attacker.initials} >--< >--< >--< ATTACK MISS - END >--< >--< >--<`)
          }
        // if attackStr < defendStr -> attack failed, defender gets counter chance based on transitionStr
        } else {

          this.liveTicker.push(`
            ${this.matchTime}. Min | ${this.homeGoals} : ${this.awayGoals} - ${attacker.initials} Attack fail - ${this.attackStr} : ${this.defendStr} (${(this.attackStr - this.defendStr).toFixed(1)}) 
          `)
          // console.log(`${attacker.initials} ATTACK FAIL - COUNTER/FB TRIGGERED`)


          // >--< >--< >--< >--< >--< >--< >--< >--< >--< >--<
          // >--< >--< >--< DETERMINE TRANSITION >--< >--< >--<
          // >--< >--< >--< >--< >--< >--< >--< >--< >--< >--<
          // switch attacker / defender now
          attacker === this.home 
          ? (attacker = this.away, defender = this.home) 
          : (attacker = this.home, defender = this.away)

          // add counter to new attacker / fallback to new defender
          attacker === this.home 
          ? (this.homeCounters++, this.awayFallbacks++)
          : (this.homeFallbacks++, this.awayCounters++) 
          attacker.counters++
          defender.fallbacks++

          // calc both teams' transitionStr
          calcTransition(this, this.home, this.away, this.globalState.outfieldPlayerDiceRange)

          // determine if counter is successfull based on transition 
          if((this.homeTransitionStr > this.awayTransitionStr && attacker === this.home) || (this.awayTransitionStr > this.homeTransitionStr && attacker === this.away)) {

            this.liveTicker.push(`
              ${this.matchTime}. Min | ${this.homeGoals} : ${this.awayGoals} - ${attacker.initials} Counter success
            `)
            // console.log(`${attacker.initials} COUNTER SUCCESS`)

            // add momentum and shots
            attacker === this.home ? this.homeMomentum += 0.35 : this.awayMomentum += 0.3
            attacker === this.home ? this.homeCounterShots++ : this.awayCounterShots++
            attacker.counterShots++
            defender.counterShotsAgainst++


            // >--< >--< >---< >--< >--< >--< >--< >--< >--< >--< >---< 
            // >--< >--< >---< HANDLE SHOT (counterShot) >--< >--< >---<
            // >--< >--< >---< >--< >--< >--< >--< >--< >--< >--< >---<
            // calc Scoring- & SaveStr
            this.shotStr = calcShotStr(attacker, this.globalState.outfieldPlayerDiceRange)
            this.saveStr = calcSaveStr(defender, this.globalState.goalkeeperDiceRange)
            attacker === this.home
            ? (this.homeShotStrSum += this.shotStr, this.awaySaveStrSum += this.saveStr)
            : (this.homeSaveStrSum += this.saveStr, this.awayShotStrSum += this.shotStr)

            // if ScoreChance > SaveChance => Score goal
            if (this.shotStr > this.saveStr && calcShotCheck(attacker, defender, 'counter')) {
              attacker === this.home ? this.homeMomentum += 0.5 : this.awayMomentum += 0.4
              attacker === this.home ? this.homeGoals++ : this.awayGoals++
              attacker.goals++
              defender.goalsAgainst++

              this.liveTicker.push(`
                ${this.matchTime}. Min | ${this.homeGoals} : ${this.awayGoals} - ${attacker.initials} Goal - ${this.shotStr} : ${this.saveStr} (${(this.shotStr - this.saveStr).toFixed(1)})
              `)
              // console.log(`${attacker.initials} >--< >--< >--< COUNTER GOAL - END >--< >--< >--<`)

            // if ScoreChance < SaveChance => miss goal
            } else {
              attacker === this.home ? this.awaySaves++ : this.homeSaves++
              defender.saves++

              this.liveTicker.push(`
                ${this.matchTime}. Min | ${this.homeGoals} : ${this.awayGoals} - ${attacker.initials} Miss - ${this.shotStr} : ${this.saveStr} (${(this.shotStr - this.saveStr).toFixed(1)})
              `)
              // console.log(`${attacker.initials} >--< >--< >--< COUNTER MISS - END >--< >--< >--<`)
            }
          // if new attackers' transitionStr < new defenders' transitionStr -> counter failed, intervall end
          } else {

            this.liveTicker.push(`
              ${this.matchTime}. Min | ${this.homeGoals} : ${this.awayGoals} - ${attacker.initials} Counter fail
            `)
            // console.log(`${attacker.initials} >--< >--< >--< COUNTER FAIL - END >--< >--< >--<`)
          }
        }


        // >--< >--< >--< >--< >--< >--< >--< >--< >--< >--<
        // >--< >--< >--< HANDLE INTERVALL-END >--< >--< >--<
        // >--< >--< >--< >--< >--< >--< >--< >--< >--< >--<
        // update attacker with intervall-stats
        updateTeam(
          attacker === this.home ? this.home : this.away,
          team => {
            team.attackStrSum += this.attackStr
            team.shotStrSum += this.shotStr
          }
        )

        // update defender with intervall-stats
        updateTeam(
          defender === this.home ? this.home : this.away,
          team => {
            team.defendStrSum += this.defendStr
            team.saveStrSum += this.saveStr
          }
        )

        // update club points per current standing
        updatePoints(this, this.home, this.away)

        // reset all stats that may not be re-calculatet next intervall
        this.shotStr = 0
        this.saveStr = 0


        // >--< >--< >--< >--< >--< >--< >--< >--< >--< >--<
        // >--< >--< >--< HANDLE THIRD-BREAKS >--< >--< >--<
        // >--< >--< >--< >--< >--< >--< >--< >--< >--< >--<
        // stop the match (and reset momentum) after every third and each overtime
        this.matchTime === this.matchLength / 3 || this.matchTime === this.matchLength / 3 * 2 || this.matchTime === this.matchLength
          ? (this.homeMomentum = 1, this.awayMomentum = 1)
          : null
        // + this.stopSimulateMatch()


        // >--< >--< >--< >--< >--< >--< >--< >--< >--< >--<
        // >--< >--< >--< HANDLE MATCH-END >--< >--< >--<
        // >--< >--< >--< >--< >--< >--< >--< >--< >--< >--<
        // if time is up => check result + add overtime or end the match
        if (this.matchTime === this.matchLength) {
          if (this.homeGoals === this.awayGoals) {
            this.matchLength += 5

            this.liveTicker.push(`${this.matchTime}. Min | +++ Overtime, +5min +++`)
          }
          else {
            this.stopSimulateMatch()

            // update winner with match-stats
            updateTeam(
              this.homeGoals > this.awayGoals ? this.home : this.away,
              team => {
                this.matchTime === 60 ? team.resultPoints.push(3) : team.resultPoints.push(2)
              }
            )

            // update loser with match-stats
            updateTeam(
              this.homeGoals < this.awayGoals ? this.home : this.away,
              team => {
                this.matchTime === 60 ? team.resultPoints.push(0) : team.resultPoints.push(1)
              }
            )

            // update formStrData (based on opponent tableRank)
            updateFormData(this, this.home, this.away)

            // update form (based on last 5 formStrData items)
            updateForm(this.home)
            updateForm(this.away)

            // update morale (based on own+opponent form, role, rank)
            updateMorale(this, this.home, this.away)

            this.liveTicker.push(`${this.matchTime}. Min | +++ End of the game +++`)

            // add match stuff to matchReport{}
            this.match.matchReport.liveTicker = [...this.liveTicker]
            this.match.matchReport.home = cloneDeep(this.home)
            this.match.matchReport.away = cloneDeep(this.away)

            // emit: match is finished
            this.$emit('matchFinished', this.match.matchNr, this.match.matchReport)
          }
        }
      }, globalState.simulateSpeed)
    },
    stopSimulateMatch() {
      clearInterval(this.simulateMatchIntervall)
      this.matchOngoing = false
    }
  },
  watch: {   //xday
    matchdayOngoing() {
      if (this.matchdayOngoing) {
        this.simulateMatch()
      } else {
        this.stopSimulateMatch()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.simulate-match-wrapper {
  display: flex;
  column-gap: 8px;
  height: 2.5rem;

  .main {
    min-width: 168px;
    display: flex;
    justify-content: space-between;

    .teams {
      width: 4.75rem;
    }
    
    .standing {
      width: 2.5rem;
      text-align: center;

      .time {
        font-size: 0.5rem;
      }
    }

    .controls {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }

  .details {
    min-width: 476px;
    font-size: 0.5rem;

    .stats {
      display: flex;
      column-gap: 4px;
      text-align: center;

      .possession,
      .tweaks,
      .attack,
      .defend {
        display: flex;
        padding: 2px;
        border-radius: 4px;
        outline: 1px solid #f0275e;
        
        .entry {
          display: flex;
          flex-direction: column;
          width: 2rem;
        }
      }
    }
    
    .ticker {
      height: 2.25rem;
      overflow-x: scroll;
      list-style: none;
      padding: 2px;
      padding-left: 8px;
      border-radius: 4px;
      outline: 1px solid #f0275e;
    }
  }

  .bold {
    font-weight: 900;
  }
}
</style>