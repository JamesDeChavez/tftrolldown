import image from '../../assets/face.png'
import './styles.css'

const BenchUnit = () => {
    const className = 'BenchUnit'
    return (
        <div className={className}>
            <div className={`${className}_imageContainer`}>
                <img src={image} alt="face" className={`${className}_image`} />  
            </div>
            <div className={`${className}_nameplateContainer`}>
                <span>Name</span>
                <span>1 *</span>
            </div>
        </div>
    )
}

export default BenchUnit