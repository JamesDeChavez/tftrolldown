import './styles.css'

const EmptyUnit = () => {
    const className = 'Unit'
    return (
        <div className={className}>
            <div className={`${className}_imageContainer`}>
                <div className={`${className}_traitsContainer`}>
                    <p>Traits</p>
                </div>
            </div>
            <div className={`${className}_nameplateContainer`}>
                <p>Unit Name</p>
                <p>Unit Cost</p>
            </div>
        </div>
    )
}

export default EmptyUnit