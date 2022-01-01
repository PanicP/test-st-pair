import { configureStore } from '@reduxjs/toolkit'
import counterReducer from 'app/slices/counterSlice'
import priceReducer from 'app/slices/priceSlice'
import priceWsReducer from 'app/slices/priceWsSlice'

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        price: priceReducer,
        priceWs: priceWsReducer
    },
})
