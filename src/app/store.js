import { configureStore } from '@reduxjs/toolkit'
import priceReducer from 'app/slices/priceSlice'
import priceWsReducer from 'app/slices/priceWsSlice'

export const store = configureStore({
    reducer: {
        price: priceReducer,
        priceWs: priceWsReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
})
