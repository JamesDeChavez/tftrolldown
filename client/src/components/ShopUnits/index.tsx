import { useContext, useEffect, useState } from 'react'
import Unit from '../Unit'
import { GameContext } from '../../game/GameContext'
import './styles.css'

const ShopUnits = () => {
    const { champShop, image1Loaded, image2Loaded, image3Loaded, image4Loaded, image5Loaded, setImage1Loaded, setImage2Loaded, setImage3Loaded, setImage4Loaded, setImage5Loaded } = useContext(GameContext)

    const [allLoaded, setAllLoaded] = useState(false)

    useEffect(() => {
        setAllLoaded(image1Loaded && image2Loaded && image3Loaded && image4Loaded && image5Loaded)
    }, [image1Loaded, image2Loaded, image3Loaded, image4Loaded, image5Loaded])

    const className = 'ShopUnits'
    return (
        <div className={className}>
            <Unit champData={champShop[0]} key={`Unit_0`} index={0} allLoaded={allLoaded} setLoaded={setImage1Loaded} />
            <Unit champData={champShop[1]} key={`Unit_1`} index={1} allLoaded={allLoaded} setLoaded={setImage2Loaded} />
            <Unit champData={champShop[2]} key={`Unit_2`} index={2} allLoaded={allLoaded} setLoaded={setImage3Loaded} />
            <Unit champData={champShop[3]} key={`Unit_3`} index={3} allLoaded={allLoaded} setLoaded={setImage4Loaded} />
            <Unit champData={champShop[4]} key={`Unit_4`} index={4} allLoaded={allLoaded} setLoaded={setImage5Loaded} />
        </div>
    )
}

export default ShopUnits