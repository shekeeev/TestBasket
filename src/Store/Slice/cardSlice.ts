import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { CardModules, UserModules } from "../Modules"
import { authApi } from "../../Axios"
import { setCookiesToken } from "../../Components/Cookies"

type NewsState = {
    loading: boolean
    error: null | string | undefined
    allCard: CardModules[]
    card: CardModules | null
    token: string | null
}

const initialState: NewsState = {
    error: null,
    loading: false,
    allCard: [],
    card: null,
    token: null
}

export const fetchByCard = createAsyncThunk<CardModules[], void, { rejectValue: string }>(
    'cardSlice/fetchByCard',
    async (_, { rejectWithValue }) => {
        const res = await authApi.addCardAll()
        // console.log(res)
        if (res.status !== 200) {
            return rejectWithValue('Server Error')
        }
        return res.data
    })


export const fetchByCardSingle = createAsyncThunk<CardModules, string, { rejectValue: string }>(
    'cardSlice/fetchByCardSingle',
    async (id, { rejectWithValue }) => {
        const res = await authApi.addCardSingle(id)
        // console.log(res)
        if (res.status !== 200) {
            return rejectWithValue('Server Error')
        }
        return res.data as CardModules
    })

export const fetchByUserData = createAsyncThunk<string, UserModules, { rejectValue: string }>(
    'cardSlice/fetchByUserData',
    async (userData, { rejectWithValue }) => {
        const res = await authApi.addUserData(userData)
        // console.log(res)
        if (res.status !== 200) {
            return rejectWithValue('Server Error')
        }
        return res.data.token
    })

export const fetchByUserToken = createAsyncThunk<void, string, { rejectValue: string }>(
    'cardSlice/fetchByUserToken',
    async (token, { rejectWithValue }) => {
        const res = await authApi.addUserToken(token)
        console.log(res)
        // if (res.status !== 200) {
        //     return rejectWithValue('Server Error')
        // }
        // return res.data
    })



const cardSlice = createSlice({
    name: 'cardSlice',
    initialState,
    reducers: {
        setToken(state, action: PayloadAction<string | null>) {
            state.token = action.payload
        },
    },
    extraReducers: ({ addCase }) => {
        addCase(fetchByCard.pending, (state) => {
            state.loading = true
            state.error = null
        })

        addCase(fetchByCard.fulfilled, (state, action) => {
            state.allCard = action.payload
            state.loading = false
        })

        addCase(fetchByCard.rejected, (state, action) => {
            state.loading = false
            if (action.payload?.includes('404')) {
                state.error = 'No Broouuuu,No News!'
            } else {
                state.error = action.payload
            }
        })
        addCase(fetchByCardSingle.pending, (state) => {
            state.loading = true
            state.error = null
        })

        addCase(fetchByCardSingle.fulfilled, (state, action) => {
            state.card = action.payload
            state.loading = false
        })

        addCase(fetchByCardSingle.rejected, (state, action) => {
            state.loading = false
            if (action.payload?.includes('404')) {
                state.error = 'No Broouuuu,No News!'
            } else {
                state.error = action.payload
            }
        })
        addCase(fetchByUserData.pending, (state) => {
            state.loading = true
            state.error = null
        })

        addCase(fetchByUserData.fulfilled, (state, action) => {
            state.loading = false
            if (action.payload) {
                state.token = action.payload
                setCookiesToken(action.payload)
            }
        })

        addCase(fetchByUserData.rejected, (state, action) => {
            state.loading = false
            if (action.payload?.includes('404')) {
                state.error = 'No Broouuuu,No News!'
            } else {
                state.error = action.payload
            }
        })
    }

})

export const { setToken } = cardSlice.actions

export default cardSlice.reducer