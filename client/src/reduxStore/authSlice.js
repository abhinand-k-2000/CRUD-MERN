import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    isUserAuthenticated: null,
    userToken: null, 
    isAdminAuthenticated: null,
    adminToken: null,
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        setUserLogin: (state, action) => {
            state.isUserAuthenticated = true;
            state.userToken = action.payload;
        },
        setUserLogout: (state, action) => {
            state.isUserAuthenticated = false;
            state.userToken = null;
        },
        setAdminLogin: (state, action) => {
            state.isAdminAuthenticated = true;
            state.adminToken = action.payload;
        },
        setAdminLogout: (state, action) => {
            state.isAdminAuthenticated = false;
            state.adminToken = null;
        }
    }
})

export const {setUserLogin, setUserLogout, setAdminLogin, setAdminLogout} = authSlice.actions;
export default authSlice.reducer;