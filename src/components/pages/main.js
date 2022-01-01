import { getAllPriceAsync, selectCurrentPair, selectPairData, selectPriceIsLoading, setCurrentPair } from "app/slices/priceSlice"
import { selectCurrentPairWs, selectPairDataWs, selectPriceIsLoadingWs, setCurrentPairWs, setDataWs } from "app/slices/priceWsSlice"
import SimpleButton from "components/buttons/SimpleButton"
import PriceAndVolumeBox from "components/displays/PriceAndVolumeBox"
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import './Main.scss'

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

    const pairDataWs = useSelector(selectPairDataWs)
    const isLoadingWs = useSelector(selectPriceIsLoadingWs)
    const currentPairWs = useSelector(selectCurrentPairWs)

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
        if (currentPairWs !== '') {
            webSocket.current = new WebSocket("wss://ws.satangcorp.com/ws/!miniTicker@arr")
            webSocket.current.onmessage = (message) => {
                // console.log(message.data?.find(data => data))
                // setMessages(JSON.parse(message.data).find(data => data.s === currentPair))
                // console.log(JSON.parse(message.data).find(data => data.s === currentPairWs))
                dispatch(setDataWs(JSON.parse(message.data)))
            }

            return () => webSocket.current.close()
        }

    }, [currentPairWs])

    useEffect(() => {
        // console.log(messages?.find(data => true))
        // console.log(typeof messages, messages)
    }, [messages])


    return (
        <div className="main">
            <div className="submain">
                <div />
                <div className="container">
                    <div className="button-container">
                        <div />
                        <div className="button-container-inner">
                            <SimpleButton text="BTC/THB" isSelected={pairData?.symbol === 'btc_thb'} onClick={() => dispatch(setCurrentPair("btc_thb"))} />
                            <SimpleButton text="BUSD/THB" isSelected={pairData?.symbol === 'busd_thb'} onClick={() => dispatch(setCurrentPair("busd_thb"))} />
                            <SimpleButton text="USDT/THB" isSelected={pairData?.symbol === 'usdt_thb'} onClick={() => dispatch(setCurrentPair("usdt_thb"))} />
                        </div>
                        <div />
                    </div>
                    <PriceAndVolumeBox using="using API" pairText={mapPair[pairData?.symbol]} price={pairData?.lastPrice} volume={pairData?.volume} />
                </div>
                <div />

            </div>

            <div className="submain">
                <div />
                <div className="container">
                    <div className="button-container">
                        <div />
                        <div className="button-container-inner">
                            <SimpleButton text="BTC/THB" isSelected={pairDataWs?.s === 'btc_thb'} onClick={() => dispatch(setCurrentPairWs("btc_thb"))} />
                            <SimpleButton text="BUSD/THB" isSelected={pairDataWs?.s === 'busd_thb'} onClick={() => dispatch(setCurrentPairWs("busd_thb"))} />
                            <SimpleButton text="USDT/THB" isSelected={pairDataWs?.s === 'usdt_thb'} onClick={() => dispatch(setCurrentPairWs("usdt_thb"))} />
                        </div>
                        <div />
                    </div>
                    <PriceAndVolumeBox using="using Web Socket" pairText={mapPair[pairDataWs?.s]} price={pairDataWs?.c} volume={pairDataWs?.q} />
                </div>
                <div />
            </div>

        </div>
    )
}

export default Main