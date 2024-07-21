<template>
  <div class="simulate-match-wrapper">
    <div class="main">
      <div class="teams">
        <label>{{ home.initials }}</label>
        <label> - </label>
        <label>{{ away.initials }}</label>
      </div>
      <div class="standing" @click="showDetails = !showDetails">
        <label>{{ homeGoals }}</label>
        <label> : </label>
        <label>{{ awayGoals }}</label>
        <div class="time">
          <label>{{ matchTime }}.</label>
        </div>
      </div>
      <div v-if="showDetails" class="details">
        <div v-if="showStats" @click="showStats = !showStats" class="stats">
          <div class="possession">
            <div class="entry">
              <label>In, ø</label>
              <label>{{ parseFloat(homeInitiativeStr) }}|{{ parseFloat((homeInitiativeStrSum / matchTime).toFixed(1)) }}</label>
              <label>{{ parseFloat(awayInitiativeStr) }}|{{ parseFloat((awayInitiativeStrSum / matchTime).toFixed(1)) }}</label>
            </div>
            <div class="entry">
              <label>At%</label>
              <label>{{ parseFloat((homeAttacks / matchTime * 100).toFixed()) }}</label>
              <label>{{ parseFloat((awayAttacks / matchTime * 100).toFixed()) }}</label>
            </div>
            <div class="entry">
              <label>Tr, ø</label>
              <label>{{ parseFloat(homeTransitionStr) }}|{{ parseFloat((homeTransitionStrSum / (homeCounters + homeFallbacks)).toFixed(1)) }}</label>
              <label>{{ parseFloat(awayTransitionStr) }}|{{ parseFloat((awayTransitionStrSum / (awayCounters + awayFallbacks)).toFixed(1)) }}</label>
            </div>
            <div class="entry">
              <label>Co%</label>
              <label>{{ parseFloat((homeCounterShots / homeCounters * 100).toFixed()) }}</label>
              <label>{{ parseFloat((awayCounterShots / awayCounters * 100).toFixed()) }}</label>
            </div>
            <div class="entry">
              <label>Fb%</label>
              <label>{{ parseFloat(((homeFallbacks - awayCounterShots) / homeFallbacks * 100).toFixed()) }}</label>
              <label>{{ parseFloat(((awayFallbacks - homeCounterShots) / awayFallbacks * 100).toFixed()) }}</label>
            </div>
          </div>
          <div class="tweaks">
            <div class="entry">
              <label>Mm</label>
              <label>{{ parseFloat((homeMomentum).toFixed(2))}}</label>
              <label>{{ parseFloat((awayMomentum).toFixed(2))}}</label>
            </div>
            <div class="entry">
              <label>Fo</label>
              <label>{{ parseFloat((home.form).toFixed(2))}}</label>
              <label>{{ parseFloat((away.form).toFixed(2))}}</label>
            </div>
            <div class="entry">
              <label>Mr</label>
              <label>{{ parseFloat((home.morale).toFixed(2)) }}</label>
              <label>{{ parseFloat((away.morale).toFixed(2)) }}</label>
            </div>
            <!-- <div class="entry">
              <label>Mod</label>
              Analog zu Buffs
            </div> -->
          </div>
          <div class="attack">
            <div class="entry">
              <label>Atø</label>
              <label>{{ parseFloat((homeAttackStrSum / homeAttacks).toFixed(1)) }}</label>
              <label>{{ parseFloat((awayAttackStrSum / awayAttacks).toFixed(1)) }}</label>
            </div>
            <div class="entry">
              <label>Shø</label>
              <label>{{ parseFloat((homeShotStrSum / (homeAttackShots + homeCounterShots)).toFixed(1)) }}</label>
              <label>{{ parseFloat((awayShotStrSum / (awayAttackShots + awayCounterShots)).toFixed(1)) }}</label>
            </div>
            <div class="entry">
              <label>Sh, %</label>
              <label>{{ homeAttackShots + homeCounterShots }} | {{ parseFloat((homeGoals / (homeAttackShots + homeCounterShots) * 100).toFixed()) }}</label>
              <label>{{ awayAttackShots + awayCounterShots }} | {{ parseFloat((awayGoals / (awayAttackShots + awayCounterShots) * 100).toFixed()) }}</label>
            </div>
          </div>
          <div class="defend">
            <div class="entry">
              <label>Deø</label>
              <label>{{ parseFloat((homeDefendStrSum / homeDefends).toFixed(1)) }}</label>
              <label>{{ parseFloat((awayDefendStrSum / awayDefends).toFixed(1)) }}</label>
            </div>
            <div class="entry">
              <label>Saø</label>
              <label>{{ parseFloat((homeSaveStrSum / (awayAttackShots + awayCounterShots)).toFixed(1)) }}</label>
              <label>{{ parseFloat((awaySaveStrSum / (homeAttackShots + homeCounterShots)).toFixed(1)) }}</label>
            </div>
            <div class="entry">
              <label>Sa, %</label>
              <label>{{ homeSaves }} | {{ parseFloat((homeSaves / (awayAttackShots + awayCounterShots) * 100).toFixed()) }}</label>
              <label>{{ awaySaves }} | {{ parseFloat((awaySaves / (homeAttackShots + homeCounterShots) * 100).toFixed()) }}</label>
            </div>
          </div>
        </div>
        <div v-else @click="showStats = !showStats" class="ticker">
          <li v-for="(tick, index) in liveTicker.slice().reverse()" :key="index">
            {{ tick }}
          </li>
          <label>Unser LiveTicker berichtet live...oO</label>
        </div>
      </div>
      <div class="controls">
        <button v-if="!matchOngoing" @click="simulateMatch">Anpfiff</button>
        <button v-else @click="stopSimulateMatch">Auszeit</button>
      </div>
    </div>
  </div>
</template>

<script>
import { calcMomentum, calcInitiative, calcTransition, calcAttackStr, calcDefendStr, calcShotStr, calcSaveStr, calcShotCheck, updateTeam, updatePoints, updateFormData, updateForm, updateMorale } from '../lib/util.js'

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
    }
  },
  data() {
    return {
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
        calcInitiative(this, this.home, this.away, 10)

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
        this.attackStr = calcAttackStr(attacker, 10)
        this.defendStr = calcDefendStr(defender, 10)
        attacker === this.home
          ? (this.homeAttackStrSum += this.attackStr, this.awayDefendStrSum += this.defendStr)
          : (this.homeDefendStrSum += this.defendStr, this.awayAttackStrSum += this.attackStr)

        // if attackStr > defendStr => get Shot on goal
        if (this.attackStr > this.defendStr) {
          attacker === this.home ? this.homeMomentum += 0.35 : this.awayMomentum += 0.3
          attacker === this.home ? this.homeAttackShots++ : this.awayAttackShots++
          attacker.attackShots++
          defender.attackShotsAgainst++

          this.liveTicker.push(`
              ${this.matchTime - 1}:${(Math.floor(Math.random() * 60)).toString().padStart(2, 0)}: ${attacker.initials} Attack success ${this.attackStr} : ${this.defendStr} (${(this.attackStr - this.defendStr).toFixed(1)})
            `)
          // console.log(`${attacker.initials} ATTACK SUCCESS`)


          // >--< >--< >---< >--< >--< >--< >--< >--< >--< >--< >---< 
          // >--< >--< >---< HANDLE SHOT (attackShot) >--< >--< >---<
          // >--< >--< >---< >--< >--< >--< >--< >--< >--< >--< >---<
          // calc Scoring- & SaveStr
          this.shotStr = calcShotStr(attacker, 10)
          this.saveStr = calcSaveStr(defender, 10)
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
                ${this.matchTime - 1}:${(Math.floor(Math.random() * 60)).toString().padStart(2, 0)}: ${attacker.initials} Goal ${this.shotStr} : ${this.saveStr} (${(this.shotStr - this.saveStr).toFixed(1)}) | ${this.homeGoals} : ${this.awayGoals}
              `)
            // console.log(`${attacker.initials} >--< >--< >--< ATTACK GOAL - END >--< >--< >--<`)

          // if ScoreChance < SaveChance => miss goal
          } else {
            attacker === this.home ? this.awaySaves++ : this.homeSaves++
            defender.saves++

            this.liveTicker.push(`
                ${this.matchTime - 1}:${(Math.floor(Math.random() * 60)).toString().padStart(2, 0)}: ${attacker.initials} Miss ${this.shotStr} : ${this.saveStr} (${(this.shotStr - this.saveStr).toFixed(1)})
              `)
            // console.log(`${attacker.initials} >--< >--< >--< ATTACK MISS - END >--< >--< >--<`)
          }
        // if attackStr < defendStr -> attack failed, defender gets counter chance based on transitionStr
        } else {

          this.liveTicker.push(`
              ${this.matchTime - 1}:${(Math.floor(Math.random() * 60)).toString().padStart(2, 0)}: ${attacker.initials} Attack fail ${this.attackStr} : ${this.defendStr} (${(this.attackStr - this.defendStr).toFixed(1)})
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
          calcTransition(this, this.home, this.away, 10)

          // determine if counter is successfull based on transition 
          if((this.homeTransitionStr > this.awayTransitionStr && attacker === this.home) || (this.awayTransitionStr > this.homeTransitionStr && attacker === this.away)) {

            this.liveTicker.push(`
              ${this.matchTime - 1}:${(Math.floor(Math.random() * 60)).toString().padStart(2, 0)}: ${attacker.initials} Counter success
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
            this.shotStr = calcShotStr(attacker, 10)
            this.saveStr = calcSaveStr(defender, 10)
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
                  ${this.matchTime - 1}:${(Math.floor(Math.random() * 60)).toString().padStart(2, 0)}: ${attacker.initials} Goal ${this.shotStr} : ${this.saveStr} (${(this.shotStr - this.saveStr).toFixed(1)}) | ${this.homeGoals} : ${this.awayGoals}
                `)
              // console.log(`${attacker.initials} >--< >--< >--< COUNTER GOAL - END >--< >--< >--<`)

            // if ScoreChance < SaveChance => miss goal
            } else {
              attacker === this.home ? this.awaySaves++ : this.homeSaves++
              defender.saves++

              this.liveTicker.push(`
                  ${this.matchTime - 1}:${(Math.floor(Math.random() * 60)).toString().padStart(2, 0)}: ${attacker.initials} Miss ${this.shotStr} : ${this.saveStr} (${(this.shotStr - this.saveStr).toFixed(1)})
                `)
              // console.log(`${attacker.initials} >--< >--< >--< COUNTER MISS - END >--< >--< >--<`)
            }
          // if new attackers' transitionStr < new defenders' transitionStr -> counter failed, intervall end
          } else {

            this.liveTicker.push(`
                ${this.matchTime - 1}:${(Math.floor(Math.random() * 60)).toString().padStart(2, 0)}: ${attacker.initials} Counter fail
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

            this.liveTicker.push(`${this.matchTime}.: Overtime, +5min`)
          }
          else {
            this.stopSimulateMatch()

            // update winner with match-stats
            updateTeam(
              this.homeGoals > this.awayGoals ? this.home : this.away,
              team => {
                this.matchTime === 60 ? team.results.push(3) : team.results.push(2)
              }
            )

            // update loser with match-stats
            updateTeam(
              this.homeGoals < this.awayGoals ? this.home : this.away,
              team => {
                this.matchTime === 60 ? team.results.push(0) : team.results.push(1)
              }
            )

            // update formData (based on opponent tableRank)
            updateFormData(this, this.home, this.away)

            // update form (based on last 5 formData items)
            updateForm(this.home)
            updateForm(this.away)

            // update morale (based on own+opponent form, role, rank)
            updateMorale(this, this.home, this.away)

            this.liveTicker.push(`${this.matchTime}.: End of the game`)

            // emit: match is finished
            this.$emit('matchFinished', this.match.matchNr)

            // add match stuff to matchReport{} and return match
            this.match.matchReport.liveTicker = this.liveTicker
            // +: result (homeGoals/awayGoals), stats (aus details->stats)

            return this.match
          }
        }
      }, 50)
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
  height: 2.25rem;

  .main {
    display: flex;
    column-gap: 4px;

    .teams {
      width: 4.5rem;
    }
    
    .standing {
      width: 2.5rem;
      text-align: center;

      .time {
        font-size: 0.5rem;
      }
    }

    .details {
      min-width: 20.5rem;   // check with size of each entry
      font-size: 0.5rem;

      .stats {
        display: flex;
        column-gap: 2px;
        text-align: center;

        .possession,
        .tweaks,
        .attack,
        .defend {
          display: flex;
          border-radius: 4px;
          background-color: cadetblue;
          
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
        text-align: start;
        list-style: none;
        border-radius: 4px;
        background-color: cadetblue;
      }
    }

    .controls {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      button {
        width: 42px;
        font-size: 0.5rem;
        height: calc((2.25rem - 2px) / 2);
      }
    }
  }
}
</style>