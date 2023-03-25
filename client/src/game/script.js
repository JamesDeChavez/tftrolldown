const fs = require('fs')

//Setup Variables to Update before running Script
const extractedData = require('./DataFiles/en_us2.json') // file comes from https://raw.communitydragon.org/ > 'latest/' folder > 'cdragon/' folder > 'tft/' folder
const { setData } = extractedData
const currentSet = 'TFTSet8_Stage2' // 'mutator' field from file setData file above
const setNumber = "8" // choose the correct set Number to use as property name of sets Object
const traitMinimums = extractedData.sets[setNumber].traits

//Parse out the relevant data
const currentSetData = setData.filter(set => {
    return set.mutator === currentSet
})

const relevantChampionData = currentSetData[0].champions.map((champ) => {
    return {
        name: champ.name,
        traits: champ.traits,
        cost: champ.cost,
        icon: champ.icon
    }
}).filter(champ => champ.traits.length !== 0)

const relevantTraitData = currentSetData[0].traits.map((trait) => {
    return {
        name: trait.name,
        effects: trait.effects.map(effect => effect.minUnits)
    }
})

const relevantTraitMinimumsData = traitMinimums.map((trait) => {
    return {
        name: trait.name,
        effects: trait.effects.map((effect) => {
            return {
                minUnits: effect.minUnits,
                maxUnits: effect.maxUnits
            }
        })
    }
})

//Write set data to output files ('tftChampionData.json' and 'tftTraitData.json')
fs.writeFile('./tftChampionData.json', JSON.stringify(relevantChampionData), err => {
    if (err) throw err
    console.log('Success')
})

fs.writeFile('./tftTraitData.json', JSON.stringify(relevantTraitData), err => {
    if (err) throw err
    console.log('Success')
})

fs.writeFile('./tftTraitMinimumsData.json', JSON.stringify(relevantTraitMinimumsData), err => {
    if (err) throw err
    console.log('Success')
})




