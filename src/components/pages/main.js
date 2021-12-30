import SimpleButton from "components/buttons/SimpleButton"
import PriceAndVolumeBox from "components/displays/PriceAndVolumeBox"

const Main = () => {
    return <>
        <SimpleButton text="BTC/THB" onClick={() => {}}/>
        <SimpleButton text="BUSD/THB" onClick={() => {}}/>
        <SimpleButton text="USDT/THB" onClick={() => {}}/>
        <PriceAndVolumeBox pairText="BTC/THB" price="33.33" volume="123,456.78"/>
        
    </>
}

export default Main