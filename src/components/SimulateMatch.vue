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
              <label>Mom, ø</label>
              <label>{{ homeMomentum }}|{{ parseFloat((homeMomentumSum / matchTime).toFixed(1)) }}</label>
              <label>{{ awayMomentum }}|{{ parseFloat((awayMomentumSum / matchTime).toFixed(1)) }}</label>
            </div>
            <div class="entry">
              <label>OP%</label>
              <label>{{ parseFloat((homeAttacks / matchTime * 100).toFixed()) }}</label>
              <label>{{ parseFloat((awayAttacks / matchTime * 100).toFixed()) }}</label>
            </div>
          </div>
          <div class="tweaks">
            <div class="entry">
              <label>Bufø</label>
              <label>{{ parseFloat((homeBuffSum / matchTime).toFixed(2)) }}</label>
              <label>{{ parseFloat((awayBuffSum / matchTime).toFixed(2)) }}</label>
            </div>
            <div class="entry">
              <label>Mod</label>
              <!-- Analog zu Buffs -->
            </div>
          </div>
          <div class="attack">
            <div class="entry">
              <label>Atø</label>
              <label>{{ parseFloat((homeAttackStrSum / homeAttacks).toFixed(1)) }} {{  }}</label>
              <label>{{ parseFloat((awayAttackStrSum / awayAttacks).toFixed(1)) }} {{  }}</label>
            </div>
            <div class="entry">
              <label>Shø</label>
              <label>{{ parseFloat((homeShotStrSum / homeShots).toFixed(1)) }} {{  }}</label>
              <label>{{ parseFloat((awayShotStrSum / awayShots).toFixed(1)) }} {{  }}</label>
            </div>
            <div class="entry">
              <label>Sh, %</label>
              <label>{{ homeShots }} | {{ parseFloat((homeGoals / homeShots * 100).toFixed()) }}</label>
              <label>{{ awayShots }} | {{ parseFloat((awayGoals / awayShots * 100).toFixed()) }}</label>
            </div>
          </div>
          <div class="defend">
            <div class="entry">
              <label>Deø</label>
              <label>{{ parseFloat((homeDefendStrSum / homeDefends).toFixed(1)) }} {{  }}</label>
              <label>{{ parseFloat((awayDefendStrSum / awayDefends).toFixed(1)) }} {{  }}</label>
            </div>
            <div class="entry">
              <label>Saø</label>
              <label>{{ parseFloat((homeSaveStrSum / awayShots).toFixed(1)) }} {{  }}</label>
              <label>{{ parseFloat((awaySaveStrSum / homeShots).toFixed(1)) }} {{  }}</label>
            </div>
            <div class="entry">
              <label>Sa, %</label>
              <label>{{ homeSaves }} | {{ parseFloat((homeSaves / awayShots * 100).toFixed()) }}</label>
              <label>{{ awaySaves }} | {{ parseFloat((awaySaves / homeShots * 100).toFixed()) }}</label>
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
import { calcMomentum, calcTeamBuff, calcAttackStr, calcDefendStr, calcShotStr, calcSaveStr, updateTeam, updatePoints, updateFormData, updateForm, updateMorale} from '../lib/util.js';

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
      homeMomentumSum: 0,
      awayMomentumSum: 0,
      attackerBuff: 1,
      defenderBuff: 1,
      homeBuffSum: 0,
      awayBuffSum: 0,
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
      homeShots: 0,
      awayShots: 0,
      // no shotsAgainst registered here (using #opponent's shots)
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


        // >--< >--< >--< >--< >--< >--< >--< >--< >--< >--<
        // >--< >--< >--< DETERMINE ATTACKER >--< >--< >--<
        // >--< >--< >--< >--< >--< >--< >--< >--< >--< >--<
        // calc teamMomentum
        this.homeMomentum = calcMomentum(this.home)
        this.awayMomentum = calcMomentum(this.away)
        this.homeMomentumSum += this.homeMomentum
        this.awayMomentumSum += this.awayMomentum

        // determine attacker based on momentum
        // BULLYS: bullyStr(bestPlayer) + dice + momentum
        const [attacker, defender] = this.homeMomentum >= this.awayMomentum
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
        // calc teamWerte team.attack..
        // -> für alle Werte = mmer average der jew players-werte

        // calculate teamBuff
        this.attackerBuff = calcTeamBuff(attacker)
        this.defenderBuff = calcTeamBuff(defender)
        attacker === this.home
          ? (this.homeBuffSum += this.attackerBuff, this.awayBuffSum += this.defenderBuff)
          : (this.homeBuffSum += this.defenderBuff, this.awayBuffSum += this.attackerBuff)

        // calc playStr
        this.attackStr = calcAttackStr(attacker, this.attackerBuff, 10)
        this.defendStr = calcDefendStr(defender, this.defenderBuff, 10)
        attacker === this.home
          ? (this.homeAttackStrSum += this.attackStr, this.awayDefendStrSum += this.defendStr)
          : (this.homeDefendStrSum += this.defendStr, this.awayAttackStrSum += this.attackStr)

        // if attackStr > defendStr => get Shot on goal
        if (this.attackStr - this.defendStr > 1.5) {
          attacker === this.home ? this.homeShots++ : this.awayShots++
          attacker.shots++;
          defender.shotsAgainst++;

          updateTeam(
            attacker,
            team => {
              team.momentum += 0.15
            }
          )


          // >--< >--< >--< >--< >--< >--< >--< >--< >--< 
          // >--< >--< >--< HANDLE SHOT >--< >--< >--<
          // >--< >--< >--< >--< >--< >--< >--< >--< >--<
          // calc Scoring- & SaveStr
          this.shotStr = calcShotStr(attacker, this.attackerBuff, 10)
          this.saveStr = calcSaveStr(defender, this.defenderBuff, 10)
          attacker === this.home
            ? (this.homeShotStrSum += this.shotStr, this.awaySaveStrSum += this.saveStr)
            : (this.homeSaveStrSum += this.saveStr, this.awayShotStrSum += this.shotStr)

          // if ScoreChance > SaveChance => Score goal
          if (this.shotStr - this.saveStr > 3.5) {                // (1.5) + 2,5 nur dice = 25%D-Range = 3,7-4 T
            attacker === this.home ? this.homeGoals++ : this.awayGoals++
            attacker.goals++
            defender.goalsAgainst++

            this.liveTicker.push(`
                ${this.matchTime - 1}:${(Math.floor(Math.random() * 60)).toString().padStart(2, 0)}: ${attacker.initials} Goal ${this.shotStr} : ${this.saveStr} (${(this.shotStr - this.saveStr).toFixed(1)}) | ${this.homeGoals}:${this.awayGoals}
              `)

            updateTeam(
              attacker,
              team => {
                team.momentum += 0.2
              }
            )

          // if ScoreChance < SaveChance => miss goal
          } else {
            attacker === this.home ? this.awaySaves++ : this.homeSaves++
            defender.saves++

            this.liveTicker.push(`
                ${this.matchTime - 1}:${(Math.floor(Math.random() * 60)).toString().padStart(2, 0)}: ${attacker.initials} Miss ${this.shotStr} : ${this.saveStr} (${(this.shotStr - this.saveStr).toFixed(1)})
              `)
          }
        }


        // >--< >--< >--< >--< >--< >--< >--< >--< >--< >--<
        // >--< >--< >--< HANDLE INTERVALL-END >--< >--< >--<
        // >--< >--< >--< >--< >--< >--< >--< >--< >--< >--<
        // update attacker with intervall-stats
        updateTeam(
          attacker === this.home ? this.home : this.away,
          team => {
            team.buffSum += this.attackerBuff
            team.attackStrSum += this.attackStr
            team.shotStrSum += this.shotStr
          }
        )

        // update defender with intervall-stats
        updateTeam(
          defender === this.home ? this.home : this.away,
          team => {
            team.buffSum += this.defenderBuff
            team.defendStrSum += this.defendStr
            team.saveStrSum += this.saveStr
          }
        )

        // update home with intervall-stats
        updateTeam(
          this.home,
          team => {
            team.momentumSum += this.homeMomentum
          }
        )

        // update away with intervall-stats
        updateTeam(
          this.away,
          team => {
            team.momentumSum += this.awayMomentum
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
        // stop the match after every third and each overtime
        // this.matchTime === this.matchLength / 3 || this.matchTime === this.matchLength / 3 * 2 || this.matchTime === this.matchLength
        //   ? this.stopSimulateMatch()
        //   : null


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
                team.momentum = 1
                this.matchTime === 60 ? team.wins++ : team.winsOvertime++
              }
            )

            // update loser with match-stats
            updateTeam(
              this.homeGoals < this.awayGoals ? this.home : this.away,
              team => {
                team.momentum = 1
                this.matchTime === 60 ? team.losses++ : team.lossesOvertime++
              }
            )

            // update formData (based on opponent tablePosition)
            updateFormData(this, this.home, this.away)

            // update form (based on last 5 formData items)
            updateForm(this.home)
            updateForm(this.away)

            // update morale (based on opponent form)
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
      width: 20.5rem;   // check with size of each entry
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