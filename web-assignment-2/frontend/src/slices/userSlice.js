import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    users: [
        { id: 1, name: 'Ahmed Khan', email: 'ahmed@umt.edu', password: '123456', phone: '0300-1234567' },
        { id: 2, name: 'Sara Ali', email: 'sara@umt.edu', password: '123456', phone: '0321-9876543' },
        { id: 3, name: 'Usman Tariq', email: 'usman@umt.edu', password: '123456', phone: '0333-5556667' }
    ],
    loggedInUser: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        register: (state, action) => {
            state.users.push(action.payload)
        },
        login: (state, action) => {
            state.loggedInUser = action.payload
        },
        logout: (state) => {
            state.loggedInUser = null
        },
        changePassword: (state, action) => {
            let user = state.users.find(u => u.id == state.loggedInUser.id)
            if (user) {
                user.password = action.payload
                state.loggedInUser.password = action.payload
            }
        }
    }
})

export const { register, login, logout, changePassword } = userSlice.actions
export default userSlice.reducer
