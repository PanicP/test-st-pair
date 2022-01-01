import './PriceAndVolumeBox.scss'

const PriceAndVolumeBox = ({ using, pairText, price, volume }) => {
    return <div className="priceandvolumebox-container">
        <div />
        <div />
        <div />
        <div />
        <div className="priceandvolumebox-container-inner">
            <div>
                <p className="priceandvolumebox-using">{using}</p>
            </div>
            <div>
                <p className="priceandvolumebox-pair">{pairText ? pairText : '-/-'}</p>
            </div>
            <div>
                <p className="priceandvolumebox-price">{price ? price : '0'}</p>
            </div>
            <div>
                <p className="priceandvolumebox-volume">Volume: {volume ? volume : '0'}</p>
            </div>
        </div>
        <div />
        <div />
        <div />
        <div />
    </div>
}

export default PriceAndVolumeBox