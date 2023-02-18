import './styles.css'

const Unit = () => {
    const className = 'Unit'
    return (
        <div className={className}>
            <div className={`${className}_imageContainer`}>
                <div className={`${className}_traitsContainer`}>
                    <span>trait 1</span>
                    <span>trait 2</span>
                    <span>trait 3</span>
                </div>
            </div>
            <div className={`${className}_nameplateContainer`}>
                <span>Name</span>
                <span>1 G</span>
            </div>
        </div>
    )
}

export default Unit