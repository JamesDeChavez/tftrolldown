import championData from './tftChampionData.json'
import rollOddsData from './rollodds.json'
import levelsData from './levels.json'

export class Unit {
    name: string
    traits: string[]
    cost: number

    constructor (_name: string, _traits: string[], _cost: number ) {
        this.name = _name
        this.traits = _traits
        this.cost = _cost
    }
}

export class Game {

    static createStartingDeck() {
        const startingDeck: Unit[] = []
        championData.forEach(champ => {
            startingDeck.push(new Unit(champ.name, champ.traits, champ.cost))
        })
        return startingDeck
    }

    static refreshShop(champPool: Unit[], champShop: (Unit|undefined)[], level: LevelRange) {
        const newShop = []
        const currDeck: Unit[] = [...champPool]
        champShop.forEach(unit => {
            if (unit !== undefined) currDeck.push(unit)
        })

        //Split current deck into 5 seperate decks for each cost
        const currDeck_one = currDeck.filter(unit => unit.cost === 1)
        const currDeck_two = currDeck.filter(unit => unit.cost === 2)
        const currDeck_three = currDeck.filter(unit => unit.cost === 3)
        const currDeck_four = currDeck.filter(unit => unit.cost === 4)
        const currDeck_five = currDeck.filter(unit => unit.cost === 5)

        //Move 5 Units from 'currDeck' to 'newShop'
        for (let i = 0; i < 5; i++) {
            let currentOdds = rollOddsData[`level-${level}`]
            let randomNumber = Math.random()
            let deckToPullFrom

            if (randomNumber < currentOdds['one-cost']) {
                deckToPullFrom = currDeck_one
            }
            else if (randomNumber < currentOdds['one-cost'] + currentOdds['two-cost']) {
                deckToPullFrom = currDeck_two
            }
            else if (randomNumber < currentOdds['one-cost'] + currentOdds['two-cost'] + currentOdds['three-cost']) {
                deckToPullFrom = currDeck_three
            }
            else if (randomNumber < currentOdds['one-cost'] + currentOdds['two-cost'] + currentOdds['three-cost'] + currentOdds['four-cost']) {
                deckToPullFrom = currDeck_four
            }
            else {
                deckToPullFrom = currDeck_five
            }            

            let randomIndex = Math.floor(Math.random() * deckToPullFrom.length)
            newShop.push(deckToPullFrom[randomIndex])
            deckToPullFrom.splice(randomIndex, 1)
        }

        const returnChampPool: Unit[] = [...currDeck_one, ...currDeck_two, ...currDeck_three, ...currDeck_four, ...currDeck_five]
        const returnChampShop = newShop
        return {
            newChampPool: returnChampPool,
            newChampShop: returnChampShop
        }
    }

    static startingCumulativeLevel(level: LevelRange) {
        return levelsData[`level-${level}`].cumulative - levelsData[`level-${level}`].points
    }

    static buyXP(level: LevelRange, cumulativeLevel: number) {
        const levelOptions: LevelRange[] = [2, 3, 4, 5, 6, 7, 8, 9]
        const newCumulativeLevel = cumulativeLevel + 4
        const levelUpPoint = levelsData[`level-${level}`].cumulative
        const difference = newCumulativeLevel - levelUpPoint
        let newLevel: LevelRange = levelOptions[levelOptions.indexOf(level)]

        if(difference >= 0) {
            newLevel = levelOptions[levelOptions.indexOf(level)+ 1]
        }

        return {
            newLevel,
            newCumulativeLevel
        }

    }

    static buyUnit(champShop: (Unit|undefined)[], champBench: (Unit|undefined)[], purchaseIndex: number) {
        const replacementIndex = champBench.indexOf(undefined)
        const newBench = [...champBench]
        newBench[replacementIndex] = champShop[purchaseIndex]
        const newShop = [...champShop]
        newShop[purchaseIndex] = undefined

        return {
            newBench,
            newShop
        }
    }

    static sellUnit(champPool: Unit[], champBench: (Unit|undefined)[], sellIndex: number) {
        const newBench = [...champBench]
        newBench[sellIndex] = undefined
        const newChampPool = [...champPool]
        const unitToSell: Unit = champBench[sellIndex]!
        newChampPool.push(unitToSell)
        return {
            newBench, 
            newChampPool
        }
    }

}

export type LevelRange = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9