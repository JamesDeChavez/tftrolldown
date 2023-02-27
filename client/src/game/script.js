const fs = require('fs')

//Setup Variables to Update before running Script
const { setData } = require('./en_us.json') // file comes from https://raw.communitydragon.org/
const currentSet = 'TFTSet8' // 'mutator' field from file

//Parse out the current Set Data
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

//Write set data to output files ('tftChampionData.json' and 'tftTraitData.json')
fs.writeFile('./tftChampionData.json', JSON.stringify(relevantChampionData), err => {
    if (err) throw err
    console.log('Success')
})

fs.writeFile('./tftTraitData.json', JSON.stringify(relevantTraitData), err => {
    if (err) throw err
    console.log('Success')
})



