# open / to check =========

- attackStrDiceAvg / defendStrDiceAvg calc
  - evtl weil matchesPlayed++ jeweils am START statt ENDE des matches -> formAvg + moraleAvg hat immer +1 zu hohe Basis während match calc ?

## CLUB:
- "attack_seed": 2, + "attack" (=current)
same für alle seed werte dich sich während Saison ändern können

- "team_streak": false,

- "team_injured": false,

- "keeper_streak": false -> wenn 5 shots am Stück gehalten, kleiner Bonus bis goal

- "league_next": 1, + "league" (=current) // default = same so dass edit nur bei Auf/Ab

- class Club {
  constructor({uuid, name, initials, offense, defense, save, morale, momentum}) {
    this.uuid = uuid
    this.name = name
    this.initials = initials

    this.team = {
      startingSix : {
        offense : offense,
        defense : defense,
        save : save,
      },
      buffs: {
        morale : morale,
        momentum : momentum
      },
      modifiers: {},
      roster: [], // [] with all player{}s
    },

    this.stats = {
      matches_played: 0,
      points : 0,
      goals : 0,
      goals_against: 0
    }
  }

  get goals_diff() {
    return this.stats.goals - this.stats.goals_against
  }

  addMatchPlayed() {
    this.stats.matches_played++
  }
  addPoints(num) {
    this.stats.points += num
  }

- wenn Team, Roster:
     startingSix: {
         leftWing: {},
         rightWing: {},
         center: {},
         leftDefensive: {},
         rightDefensive: {},
         goalkeeper: {}
     },
     bench [] / {} ?,
   clubTeam.energy: 1           default, falls after played match
   clubTeam.effort: 1           = morale * energy
   clubTeam.aggressiveness: 0   = base für strafzeit calc, (calc selbst?)
   clubTeam.chemistry: 0        startWert, + 0.5?/match mit >= 4 same Players
}

## PLAYER:
- postion             off/deff, LW/C/RW...
- energy: 1           default, falls after played match
- effort: 1           = morale * energy
- aggressiveness: 0   = base für strafzeit calc, (calc selbst?)


# styling ===============