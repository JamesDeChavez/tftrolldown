import { useContext, useEffect, useState } from 'react'
import Unit from '../Unit'
import { GameContext } from '../../game/GameContext'
import './styles.css'

const ShopUnits = () => {
    const { champShop } = useContext(GameContext)
    const [image1Loaded, setImage1Loaded] = useState(false)
    const [image2Loaded, setImage2Loaded] = useState(false)
    const [image3Loaded, setImage3Loaded] = useState(false)
    const [image4Loaded, setImage4Loaded] = useState(false)
    const [image5Loaded, setImage5Loaded] = useState(false)
    const [allImagesLoaded, setAllImagesLoaded] = useState(false)

    useEffect(() => {
        setAllImagesLoaded(image1Loaded && image2Loaded && image3Loaded && image4Loaded && image5Loaded)
    }, [image1Loaded, image2Loaded, image3Loaded, image4Loaded, image5Loaded])

    const className = 'ShopUnits'
    return (
        <div className={className}>
            <Unit 
                champData={champShop[0]} key={`Unit_0`} index={0}
                setImageLoaded={setImage1Loaded} 
                allImagesLoaded={allImagesLoaded} 
            />
            <Unit 
                champData={champShop[1]} key={`Unit_1`} index={1}
                setImageLoaded={setImage2Loaded} 
                allImagesLoaded={allImagesLoaded} 
            />
            <Unit 
                champData={champShop[2]} key={`Unit_2`} index={2}
                setImageLoaded={setImage3Loaded} 
                allImagesLoaded={allImagesLoaded} 
            />
            <Unit 
                champData={champShop[3]} key={`Unit_3`} index={3}
                setImageLoaded={setImage4Loaded} 
                allImagesLoaded={allImagesLoaded} 
            />
            <Unit 
                champData={champShop[4]} key={`Unit_4`} index={4}
                setImageLoaded={setImage5Loaded} 
                allImagesLoaded={allImagesLoaded} 
            />
        </div>
    )
}

export default ShopUnits