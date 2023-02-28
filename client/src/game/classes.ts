import championData from './tftChampionData.json'
import rollOddsData from './rollodds.json'
import levelsData from './levels.json'

export class Unit {
    name: string
    traits: string[]
    cost: number
    stars: number

    constructor (_name: string, _traits: string[], _cost: number, _stars: number ) {
        this.name = _name
        this.traits = _traits
        this.cost = _cost
        this.stars = _stars
    }
}

export class Game {

    static createStartingDeck() {
        const startingDeck: Unit[] = []
        let copiesToAdd: number = 1 

        championData.forEach(champ => {
            switch(champ.cost) {
                case 1: copiesToAdd = 29; break;
                case 2: copiesToAdd = 22; break;
                case 3: copiesToAdd = 18; break;
                case 4: copiesToAdd = 12; break;
                case 5: copiesToAdd = 10; break;
                default: break;
                
            }
            startingDeck.push(...Array(copiesToAdd).fill(new Unit(champ.name, champ.traits, champ.cost, 1)))
            console.log(startingDeck)
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
        const newShop = [...champShop]

        const unitToPurchase = champShop[purchaseIndex]
        const checkForLevelTwo = champBench.filter(unit => 
            unit && 
            unit.name === unitToPurchase!.name &&
            unit.stars === 1 
        ).length === 2
        const checkForLevelThree = (checkForLevelTwo &&
        champBench.filter(unit => 
            unit && 
            unit.name === unitToPurchase!.name &&
            unit.stars === 2 
        ).length === 2)
        
        if (checkForLevelThree) {
            const indexesToRemove = newBench.reduce((callback: number[], unit, index) => {
                if (unit && unit!.name === unitToPurchase!.name) callback.push(index)
                return callback
            }, []).sort((a, b) => b - a)
            let currentIndex = indexesToRemove.pop()
            newBench[currentIndex!] = new Unit(unitToPurchase!.name, unitToPurchase!.traits, unitToPurchase!.cost, 3)
            while (indexesToRemove.length > 0) {
                currentIndex = indexesToRemove.pop()
                newBench[currentIndex!] = undefined
            }
        } else if (checkForLevelTwo) {
            const indexesToRemove = newBench.reduce((callback: number[], unit, index) => {
                if (unit && unit.name === unitToPurchase!.name && unit.stars === 1) callback.push(index)
                return callback
            }, []).sort((a, b) => b - a)
            let currentIndex = indexesToRemove.pop()
            newBench[currentIndex!] = new Unit(unitToPurchase!.name, unitToPurchase!.traits, unitToPurchase!.cost, 2)
            while (indexesToRemove.length > 0) {
                currentIndex = indexesToRemove.pop()
                newBench[currentIndex!] = undefined
            }
        } else newBench[replacementIndex] = champShop[purchaseIndex]

        newShop[purchaseIndex] = undefined

        return {
            newBench,
            newShop
        }
    }

    static sellUnit(champPool: Unit[], champBench: (Unit|undefined)[], sellIndex: number) {
        const newBench = [...champBench]
        const newChampPool = [...champPool]
        const unitToSell: Unit = champBench[sellIndex]!

        newBench[sellIndex] = undefined

        switch(unitToSell.stars) {
            case 1: 
                newChampPool.push(unitToSell)
                break   
            case 2:
                newChampPool.push(...Array(3).fill(new Unit(unitToSell.name, unitToSell.traits, unitToSell.cost, 1)))
                break
            case 3:
                newChampPool.push(...Array(9).fill(new Unit(unitToSell.name, unitToSell.traits, unitToSell.cost, 1)))
                break
            default: break;
        }        
        return {
            newBench, 
            newChampPool
        }
    }

    static getRollPercentages(level: LevelRange) {
        const percentages = rollOddsData[`level-${level}`]
        return percentages
    }

    static determineActiveTraits(bench: (Unit|undefined)[]) {
        const newActiveTraits: any = {}
        bench.forEach(unit => {
            if(!unit) return
            unit.traits.forEach(trait => {
                if(trait in newActiveTraits) newActiveTraits[trait]++
                else newActiveTraits[trait] = 1
            })
        })
        return newActiveTraits
    }

}

export type LevelRange = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9