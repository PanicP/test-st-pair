import { getAllPriceAsync, selectCurrentPair, selectPairData, setCurrentPair } from "app/slices/priceSlice"
import { selectCurrentPairWs, selectPairDataWs, setCurrentPairWs, setDataWs } from "app/slices/priceWsSlice"
import SimpleButton from "components/buttons/SimpleButton"
import PriceAndVolumeBox from "components/displays/PriceAndVolumeBox"
import { useEffect, useRef } from "react"
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
    const currentPair = useSelector(selectCurrentPair)

    const pairDataWs = useSelector(selectPairDataWs)
    const currentPairWs = useSelector(selectCurrentPairWs)

    const webSocket = useRef(null)

    useEffect(() => {
        if (currentPair !== '') {
            dispatch(getAllPriceAsync())
            const interval = setInterval(() => {
                dispatch(getAllPriceAsync())
            }, 5000)

            return () => clearInterval(interval)
        }
    }, [currentPair, dispatch])

    useEffect(() => {
        if (currentPairWs !== '') {
            webSocket.current = new WebSocket("wss://ws.satangcorp.com/ws/!miniTicker@arr")
            webSocket.current.onmessage = (message) => {
                dispatch(setDataWs(JSON.parse(message.data)))
            }

            return () => webSocket.current.close()
        }

    }, [currentPairWs, dispatch])


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