import BenchUnit from './benchUnit'
import './styles.css'

const Bench = () => {
    
    const className = 'Bench'

    return (
        <div className={className}>
            <div className={`${className}_benchslot`}>
                <BenchUnit/>
            </div>
            <div className={`${className}_benchslot`}>
                <BenchUnit/>
            </div>
            <div className={`${className}_benchslot`}></div>
            <div className={`${className}_benchslot`}></div>
            <div className={`${className}_benchslot`}></div>
            <div className={`${className}_benchslot`}></div>
            <div className={`${className}_benchslot`}></div>
            <div className={`${className}_benchslot`}></div>
            <div className={`${className}_benchslot`}></div>
        </div>
    )
}

export default Bench