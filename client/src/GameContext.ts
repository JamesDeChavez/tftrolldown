import React from 'react'
import { LevelRange, Unit } from './game/classes'


export const GameContext = React.createContext<{
    level: LevelRange,
    setLevel: React.Dispatch<React.SetStateAction<LevelRange>>,
    cumulativeLevel: number,
    setCumulativeLevel: React.Dispatch<React.SetStateAction<number>>,
    gold: number,
    setGold: React.Dispatch<React.SetStateAction<number>>,
    champPool: Unit[],
    setChampPool: React.Dispatch<React.SetStateAction<Unit[]>>,
    champShop: (Unit|undefined)[],
    setChampShop: React.Dispatch<React.SetStateAction<(Unit|undefined)[]>>,
    champBench: (Unit|undefined)[],
    setChampBench: React.Dispatch<React.SetStateAction<(Unit|undefined)[]>>,
    gameActive: boolean,
    time: number,
    setTime: React.Dispatch<React.SetStateAction<number>>,
    sellActive: boolean,
    setSellActive: React.Dispatch<React.SetStateAction<boolean>>,
    sellAreaHovered: boolean,
    setSellAreaHovered: React.Dispatch<React.SetStateAction<boolean>>
  }>({
    level: 7,
    setLevel: () => {},
    cumulativeLevel: 74,
    setCumulativeLevel: () => {},
    gold: 50,
    setGold: () => {},
    champPool: [],
    setChampPool: () => {},
    champShop: [],
    setChampShop: () => {},
    champBench: [],
    setChampBench: () => {},
    gameActive: false,
    time: 50,
    setTime: () => {},
    sellActive: false,
    setSellActive: () => {},
    sellAreaHovered: false,
    setSellAreaHovered: () => {}
  })