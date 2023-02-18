import './styles.css'

const ShopButtons = () => {
    const className = 'ShopButtons'
    return (
        <div className={className}>
            <div className={`${className}_buttonContainer`}>
                <span>Buy XP</span>
                <span>4 G</span> 
            </div>
            <div className={`${className}_buttonContainer`}>
                <span>Refresh</span> 
                <span>2 G</span> 
            </div>
        </div>
    )
}

export default ShopButtons