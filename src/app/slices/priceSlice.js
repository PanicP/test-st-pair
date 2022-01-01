import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchAllPrice } from 'app/apis/priceAPI'

// inits

const initialState = {
    allData: [],
    currentPair: "",
    isLoading: false
}

// thunks

export const getAllPriceAsync = createAsyncThunk(
    'price/fetchAllPrice',
    async () => await fetchAllPrice()
)

// slice + reducers

export const priceSlice = createSlice({
    name: 'price',
    initialState,
    reducers: {
        setCurrentPair: (state, action) => {
            state.currentPair = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllPriceAsync.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAllPriceAsync.fulfilled, (state, action) => {
                state.isLoading = false
                state.allData = [...action.payload.data]
            })
    },
})

// selectors

export const selectPairData = (state) => state.price.allData?.find(data => data.symbol === state.price.currentPair)
export const selectPriceIsLoading = (state) => state.price.isLoading
export const selectCurrentPair = (state) => state.price.currentPair

export const { setCurrentPair } = priceSlice.actions

export default priceSlice.reducer
