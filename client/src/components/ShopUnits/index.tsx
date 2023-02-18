import './styles.css'
import Unit from './unit'

const ShopUnits = () => {
    const className = 'ShopUnits'

    return (
        <div className={className}>
            {[...Array(5).keys()].map((n) => {
                return <Unit/>
            })}        
        </div>
    )
}

export default ShopUnits