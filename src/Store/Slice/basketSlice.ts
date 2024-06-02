import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { CardModules } from "../Modules"
import { setLS } from "../../LS"


type NewsState = {
    basket: CardModules[]
    count: number | null
}

const initialState: NewsState = {
    basket: [],
    count: null
}

const basketSlice = createSlice({
    name: 'basketSlice',
    initialState,
    reducers: {
        setCartArr(state, action: PayloadAction<CardModules[]>) {
            state.basket = action.payload
            state.count = state.basket.length > 0 ? state.basket.length : null
            setLS(action.payload)
        },
        filterCart(state, action: PayloadAction<CardModules>) {
            state.basket = state.basket.filter(item => item.id !== action.payload.id)
            setLS(state.basket)
            state.count = state.basket.length > 0 ? state.basket.length : null
        },
        setUpdateCartArr(state, action: PayloadAction<string | null>) {
            const updateBasket = action.payload && JSON.parse(action.payload)
            state.basket = updateBasket ? updateBasket : []
            state.count = state.basket.length > 0 ? state.basket.length : null
            setLS(updateBasket)
        },
    },
    extraReducers: ({ addCase }) => {

    }

})


export const { filterCart, setCartArr, setUpdateCartArr } = basketSlice.actions

export default basketSlice.reducer