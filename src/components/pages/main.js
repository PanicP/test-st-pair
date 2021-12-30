import { getAllPriceAsync, selectCurrentPair, selectPairData, selectPriceIsLoading, setCurrentPair } from "app/slices/priceSlice"
import SimpleButton from "components/buttons/SimpleButton"
import PriceAndVolumeBox from "components/displays/PriceAndVolumeBox"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

const mapPair = {
    "btc_thb": "BTC/THB",
    "busd_thb": "BUSD/THB",
    "usdt_thb": "USDT/THB"
}

const Main = () => {

    const dispatch = useDispatch()
    const pairData = useSelector(selectPairData)
    const isLoading = useSelector(selectPriceIsLoading)
    const currentPair = useSelector(selectCurrentPair)

    // const [intervalId, setIntervalId] = useState()


    useEffect(() => {
        if(currentPair !== '') {
            dispatch(getAllPriceAsync())
            const interval = setInterval(() => {
                dispatch(getAllPriceAsync())
            }, 5000)
            
            return () => clearInterval(interval)
        }
    }, [currentPair])

    // useEffect(() => {
    //     console.log(pairData)
    //     // dispatch(setCurrentPair("btc_thb"))
    // }, [pairData])

    return <>
        <div>selected : {currentPair}</div>
        <SimpleButton text="BTC/THB" onClick={() => dispatch(setCurrentPair("btc_thb"))} />
        <SimpleButton text="BUSD/THB" onClick={() => dispatch(setCurrentPair("busd_thb"))} />
        <SimpleButton text="USDT/THB" onClick={() => dispatch(setCurrentPair("usdt_thb"))} />
        <PriceAndVolumeBox pairText={mapPair[pairData?.symbol]} price={pairData?.lastPrice} volume={pairData?.volume} />

    </>
}

export default Main