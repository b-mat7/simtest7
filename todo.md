> Rename:
formSum -> formStrSum + formAvg -> formStrAvg
moraleSum -> moraleStrSum + moraleAvg -> moraleStrAvg
momentumSum -> momentumStrSum + momentumAvg -> momentumStrAvg


> Einteilung Data-Buckets
Base / Ability (-> seed) // Role // Sum / PerfEff + PerfAvg // Result (Diff, PerMatch, wins...)


> STRUKTUR (+ ADD MISSING PERF):
--> club -> util -> DisplayClub -> DisplayTables -> SimMatch
uuid
name
initials
colorPrim
initiative
transition
attack
shoot
defend
save
form
morale

role
roleTarget
roleDiff
rankSeed
rankMatchday
priceMoney

matchesPlayed
intervalsPlayed
momentumSum
initiativeStrSum
transitionStrSum
attackStrSum
defendStrSum
shotStrSum
saveStrSum
formData
formSum
moraleSum

attacks
defends
counters
fallbacks
attackShots
attackShotsAgainst
counterShots
counterShotsAgainst
saves
goals
goalsAgainst
points
results

seed()
initiativesDiff()
transitionsDiff()
goalsDiff()
wins()
winsOvertime()
lossesOvertime()
losses()

momentumAvg()
initiativeStrAvg()
transitionStrAvg()
attackStrAvg()
defendStrAvg()
shotStrAvg()
saveStrAvg()
formAvg()
moraleAvg()
resultsL5Avg()
initiativeStrDiceAvg()
transitionStrDiceAvg()
attackStrDiceAvg()
defendStrDiceAvg()
shotStrDiceAvg()
saveStrDiceAvg()

initiativesEff()
transitionsEff()
attacksEff()
defendsEff()
countersEff()
fallbacksEff()
shotsEff()
savesEff()
shotsSavesEff()

goalsPerMatch()
goalsAgainstPerMatch()
goalsDiffPerMatch()
pointsPerMatch()


> MOMENTUM:
add: club.momentum = 0 into seed + PLACE INTO: vor transition
anpassen: momentum in Struktur + Anzeige: club / util / DisplayClub / DisplayTables / SimMatch

---

> Result5 -> Points5
resultL5 -> pointsL5, P5ø + P5 neue Spalte mit 3,3,2,1,0 Schriftgröße wie Header links-oben


> Season Control als "SimControl" in App +sticky -> props into components
Border: solid, Sections: dashed
    -> Season: +SimSpeed als Btns Auswahl=util SimSpeeds
    -> Table: Base / Ability / Role /PerfEff + PerfAvg / Result
    -> Clubs: 3 Btn Eff / Avg / Result
        AllClubsList -> focusClub []


> Tables: focusClub auch als [] mit ausgewähltes push -> kann n Aus-/Abwählen
> Tables: + Rank diff zu last matchday

> Remove formatD1... from template sections

---

> DiceStrAvg calc -> Real dice value


> MATCHDAY TABLES:
DisplayTable -> DisplayLiveTable 
+ DisplayMatchdayTable mit Auswahl im Season Control (single days, days from-to)


> Matchday -> focus on current running day?
> Goali +5%: saveDice = saveDice + 5% vom maxDice (permanent)