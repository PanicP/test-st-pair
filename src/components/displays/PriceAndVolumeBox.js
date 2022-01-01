import './PriceAndVolumeBox.scss'

const PriceAndVolumeBox = ({ using, pairText, price, volume }) => {
    return <div className="priceandvolumebox-container">
        <div />
        <div />
        <div />
        <div />
        <div className="priceandvolumebox-container-inner">
            <div>
                <p className="using">{using}</p>
            </div>
            <div>
                <p>{pairText}</p>
            </div>
            <div>
                <p>{price}</p>
            </div>
            <div>
                <p>Volume: {volume}</p>
            </div>
        </div>
        <div />
        <div />
        <div />
        <div />
    </div>
}

export default PriceAndVolumeBox