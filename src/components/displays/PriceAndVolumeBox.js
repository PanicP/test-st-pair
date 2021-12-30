const PriceAndVolumeBox = ({ pairText, price, volume }) => {
    return <>
        <div>
            <p>{ pairText }</p>
        </div>
        <div>
            <p>{ price }</p>
        </div>
        <div>
            <p>Volume: { volume }</p>
        </div>
    </>
}

export default PriceAndVolumeBox