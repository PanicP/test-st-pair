import { getAllPriceAsync, selectCurrentPair, selectPairData, selectPriceIsLoading, setCurrentPair } from "app/slices/priceSlice"
import SimpleButton from "components/buttons/SimpleButton"
import PriceAndVolumeBox from "components/displays/PriceAndVolumeBox"
import { useEffect, useRef, useState } from "react"
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

    useEffect(() => {
        if (currentPair !== '') {
            dispatch(getAllPriceAsync())
            const interval = setInterval(() => {
                dispatch(getAllPriceAsync())
            }, 5000)

            return () => clearInterval(interval)
        }
    }, [currentPair])

    const [messages, setMessages] = useState([])
    const webSocket = useRef(null)

    useEffect(() => {
        if (currentPair !== '') {
            webSocket.current = new WebSocket("wss://ws.satangcorp.com/ws/!miniTicker@arr")
            webSocket.current.onmessage = (message) => {
                // console.log(message.data?.find(data => data))
                setMessages(JSON.parse(message.data).find(data => data.s === currentPair))
            }

            return () => webSocket.current.close()
        }

    }, [currentPair])

    useEffect(() => {
        // console.log(messages?.find(data => true))
        // console.log(typeof messages, messages)
    }, [messages])


    return <>
        <div>selected : {currentPair}</div>
        <SimpleButton text="BTC/THB" onClick={() => dispatch(setCurrentPair("btc_thb"))} />
        <SimpleButton text="BUSD/THB" onClick={() => dispatch(setCurrentPair("busd_thb"))} />
        <SimpleButton text="USDT/THB" onClick={() => dispatch(setCurrentPair("usdt_thb"))} />
        <PriceAndVolumeBox pairText={mapPair[pairData?.symbol]} price={pairData?.lastPrice} volume={pairData?.volume} />

        <div>selected : {currentPair}</div>
        <SimpleButton text="BTC/THB" onClick={() => dispatch(setCurrentPair("btc_thb"))} />
        <SimpleButton text="BUSD/THB" onClick={() => dispatch(setCurrentPair("busd_thb"))} />
        <SimpleButton text="USDT/THB" onClick={() => dispatch(setCurrentPair("usdt_thb"))} />
        <PriceAndVolumeBox pairText={mapPair[messages?.s]} price={messages?.c} volume={messages?.q} />
    </>
}

export default Main