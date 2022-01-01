import { createSlice } from '@reduxjs/toolkit'

// inits

const initialState = {
    allData: [],
    currentPair: "",
    isLoading: false
}

// slice + reducers

export const priceWsSlice = createSlice({
    name: 'priceWs',
    initialState,
    reducers: {
        setCurrentPairWs: (state, action) => {
            state.currentPair = action.payload
        },
        setDataWs: (state, action) => {
            state.allData = [...action.payload]
        }
    }
})

// selectors

export const selectPairDataWs = (state) => state.priceWs.allData?.find(data => data.s === state.priceWs.currentPair)
export const selectPriceIsLoadingWs = (state) => state.priceWs.isLoading
export const selectCurrentPairWs = (state) => state.priceWs.currentPair


export const { setCurrentPairWs, setDataWs } = priceWsSlice.actions

export default priceWsSlice.reducer
