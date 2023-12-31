import {createSlice} from "@reduxjs/toolkit"

export const userSlice = createSlice({
    name: "user",
    initialState: {value: null},
    reducers: {
        // logging in state
        login: (state, action) => {
            state.value = action.payload
        },

        // logging out state
        logout: (state, action) => {
            state.value = null
        },
    }
})

export const {login, logout} = userSlice.actions

export default userSlice.reducer