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
              <label>{{ homeMomentum }} {{ parseFloat((homeMomentumSum / matchTime).toFixed(1)) }}</label>
              <label>{{ awayMomentum }} {{ parseFloat((awayMomentumSum / matchTime).toFixed(1)) }}</label>
            </div>
            <div class="entry">
              <label>OP %</label>
              <label>{{ parseFloat((homeAttPlays / matchTime * 100).toFixed()) }}</label>
              <label>{{ parseFloat((awayAttPlays / matchTime * 100).toFixed()) }}</label>
            </div>
          </div>
          <div class="tweaks">
            <div class="entry">
              <label>Buf</label>
              <label>{{ homeBuffSum }} {{ parseFloat((homeBuffSum / matchTime).toFixed(1)) }}</label>
              <label>{{ awayBuffSum }} {{ parseFloat((awayBuffSum / matchTime).toFixed(1)) }}</label>
            </div>
            <div class="entry">
              <label>Mod</label>
              <!-- Analog zu Buffs -->
            </div>
          </div>
          <div class="attack">
            <div class="entry">
              <label>APStr</label>
              <label>{{ (homeAttPlayStrSum).toFixed() }} {{ parseFloat((homeAttPlayStrSum / homeAttPlays).toFixed(1)) }}</label>
              <label>{{ (awayAttPlayStrSum).toFixed() }} {{ parseFloat((awayAttPlayStrSum / awayAttPlays).toFixed(1)) }}</label>
            </div>
            <div class="entry">
              <label>ShStr</label>
              <label>{{ (homeShotStrSum).toFixed() }} {{ parseFloat((homeShotStrSum / homeShots).toFixed(1)) }}</label>
              <label>{{ (awayShotStrSum).toFixed() }} {{ parseFloat((awayShotStrSum / awayShots).toFixed(1)) }}</label>
            </div>
            <div class="entry">
              <label>SG, %</label>
              <label>{{ homeShots }} {{ parseFloat((homeGoals / homeShots * 100).toFixed()) }}</label>
              <label>{{ awayShots }} {{ parseFloat((awayGoals / awayShots * 100).toFixed()) }}</label>
            </div>
          </div>
          <div class="defend">
            <div class="entry">
              <label>DPStr</label>
              <label>{{ (homeDefPlayStrSum).toFixed() }} {{ parseFloat((homeDefPlayStrSum / homeDefPlays).toFixed(1)) }}</label>
              <label>{{ (awayDefPlayStrSum).toFixed() }} {{ parseFloat((awayDefPlayStrSum / awayDefPlays).toFixed(1)) }}</label>
            </div>
            <div class="entry">
              <label>SaStr</label>
              <label>{{ (homeSaveStrSum).toFixed() }} {{ parseFloat((homeSaveStrSum / awayShots).toFixed(1)) }}</label>
              <label>{{ (awaySaveStrSum).toFixed() }} {{ parseFloat((awaySaveStrSum / homeShots).toFixed(1)) }}</label>
            </div>
            <div class="entry">
              <label>SV, %</label>
              <label>{{ homeSaves }} {{ parseFloat((homeSaves / awayShots * 100).toFixed()) }}</label>
              <label>{{ awaySaves }} {{ parseFloat((awaySaves / homeShots * 100).toFixed()) }}</label>
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
        <!-- <button @click="resetMatch">Reset</button> -->
      </div>
    </div>
  </div>
</template>

<script>
import { calcMomentum, calcTeamBuff, calcAttPlayStr, calcDefPlayStr, calcShotStr, calcSaveStr, updateTeam, updatePoints, updateMorale} from '../lib/util.js';

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
      matchesPlayedUpdated: false,
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
      attPlayStr: 0,
      defPlayStr: 0,
      homeAttPlayStrSum: 0,
      awayAttPlayStrSum: 0,
      homeDefPlayStrSum: 0,
      awayDefPlayStrSum: 0,
      shotStr: 0,
      saveStr: 0,
      homeShotStrSum: 0,
      awayShotStrSum: 0,
      homeSaveStrSum: 0,
      awaySaveStrSum: 0,

      homeAttPlays: 0,
      awayAttPlays: 0,
      homeDefPlays: 0,
      awayDefPlays: 0,
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
      !this.matchesPlayedUpdated ? (this.home.matchesPlayed++, this.away.matchesPlayed++) : null
      this.matchesPlayedUpdated = true
      

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

        // add attackPlay and defPlay
        attacker === this.home 
          ? (this.homeAttPlays++, this.awayDefPlays++) 
          : (this.homeDefPlays++, this.awayAttPlays++)
        attacker.attPlays++
        defender.defPlays++


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
        this.attPlayStr = calcAttPlayStr(attacker, this.attackerBuff, 10)
        this.defPlayStr = calcDefPlayStr(defender, this.defenderBuff, 10)
        attacker === this.home
          ? (this.homeAttPlayStrSum += this.attPlayStr, this.awayDefPlayStrSum += this.defPlayStr)
          : (this.homeDefPlayStrSum += this.defPlayStr, this.awayAttPlayStrSum += this.attPlayStr)

        // if attPlayStr > defPlayStr => get Shot on goal
        if (this.attPlayStr - this.defPlayStr > 1.5) {
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
                ${this.matchTime - 1}:${(Math.floor(Math.random() * 60)).toString().padStart(2, 0)}: ${attacker.initials} Goal ${this.shotStr} : ${this.saveStr} (${this.shotStr - this.saveStr}) | ${this.homeGoals}:${this.awayGoals}
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
                ${this.matchTime - 1}:${(Math.floor(Math.random() * 60)).toString().padStart(2, 0)}: ${attacker.initials} Miss ${this.shotStr} : ${this.saveStr} (${this.shotStr - this.saveStr})
              `)
          }
        }


        // >--< >--< >--< >--< >--< >--< >--< >--< >--< >--<
        // >--< >--< >--< HANDLE INTERVALL-END >--< >--< >--<
        // >--< >--< >--< >--< >--< >--< >--< >--< >--< >--<
        // reset & update attacker with its play-stats
        updateTeam(
          attacker === this.home ? this.home : this.away,
          team => {
            team.buffSum += this.attackerBuff
            team.attPlayStrSum += this.attPlayStr
            team.shotStrSum += this.shotStr
          }
        )

        // reset & update defender with its play-stats
        updateTeam(
          defender === this.home ? this.home : this.away,
          team => {
            team.buffSum += this.defenderBuff
            team.defPlayStrSum += this.defPlayStr
            team.saveStrSum += this.saveStr
          }
        )

        // reset & update home with its play-stats
        updateTeam(
          this.home,
          team => {
            team.momentumSum += this.homeMomentum
          }
        )

        // reset & update away with its play-stats
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

            // update winner
            updateTeam(
              this.homeGoals > this.awayGoals ? this.home : this.away,
              team => {
                team.momentum = 1
                this.matchTime === 60 ? team.wins++ : team.winsOvertime++
              }
            )

            // update loser
            updateTeam(
              this.homeGoals < this.awayGoals ? this.home : this.away,
              team => {
                team.momentum = 1
                this.matchTime === 60 ? team.losses++ : team.lossesOvertime++
              }
            )

            // update morale (depends on current table positions / form)
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
    },
    resetMatch() {
      this.matchTime = 0
      this.matchLength = 60
        this.matchesPlayedUpdated = false // reset funzt net richtig weil müsste alles (goals, shots...) wieder rausrechnen statt nur matches -1
        this.home.matchesPlayed -= 1
        this.away.matchesPlayed -= 1
      this.stopSimulateMatch()
      this.initPointsSet = false,
      this.lastIntervalLeader = '',
      this.lastIntervalTrailer = '',
      // + reset points: club.points === homePointsInit (util)
      this.homeMomentum = 1
      this.awayMomentum = 1
      this.homeMomentumSum = 0
      this.awayMomentumSum = 0
      this.attackerBuff = 1
      this.defenderBuff = 1
      this.homeBuffSum = 0
      this.awayBuffSum = 0
      this.attPlayStr = 0,
      this.defPlayStr = 0,
      this.homeAttPlayStrSum = 0
      this.awayAttPlayStrSum = 0
      this.homeDefPlayStrSum = 0
      this.awayDefPlayStrSum = 0
      this.shotStr = 0
      this.saveStr = 0
      this.homeShotStrSum = 0
      this.awayShotStrSum = 0
      this.homeSaveStrSum = 0
      this.awaySaveStrSum = 0
      this.homeAttPlays = 0
      this.awayAttPlays = 0
      this.homeDefPlays = 0
      this.awayDefPlays = 0
      this.homeShots = 0
      this.awayShots = 0
      this.homeSaves = 0
      this.awaySaves = 0
      this.homeGoals = 0
      this.awayGoals = 0
      this.liveTicker = []
    },
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
      width: 22.5rem;   // check with size of each entry
      font-size: 0.5rem;

      .stats {
        display: flex;
        text-align: center;

        .possession,
        .tweaks,
        .attack,
        .defend {
          display: flex;
          border-radius: 4px;
          
          .entry {
            display: flex;
            flex-direction: column;
            width: 2.25rem;
          }
        }
      }

      .ticker {
        height: 2.25rem;
        overflow-x: scroll;
        text-align: start;
        list-style: none;
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