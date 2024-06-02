import { configureStore } from "@reduxjs/toolkit"
import cardSlice from "./Slice/cardSlice"
import basketSlice from "./Slice/basketSlice"


export const store = configureStore({
    reducer: {
        card: cardSlice,
        basket: basketSlice,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
