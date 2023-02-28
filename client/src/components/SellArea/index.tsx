import './styles.css'

interface Props {
    setSellAreaHovered: React.Dispatch<React.SetStateAction<boolean>>
}

const SellArea: React.FC<Props> = ({setSellAreaHovered}) => {
    
    const handleDragEnter = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setSellAreaHovered(true)
    }
    
    const className = 'SellArea'
    return (
        <div className={className} onDragEnter={handleDragEnter} >
            <p>Drag Unit Here to Sell</p>
        </div>
    )
}

export default SellArea