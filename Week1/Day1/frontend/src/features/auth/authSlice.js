import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as authService from "./authService.js";

const initialState = {
    user : null,
    isLoading : false,
    isError : null
}

export const register = createAsyncThunk("auth/user", async (data) => {
    return await authService.registerUser(data);
});

export const login = createAsyncThunk("auth/login", async (data) => {
    return await authService.loginUser(data);
});

export const fetchProfile = createAsyncThunk("auth/profile", async () => {
    return await authService.getProfile();
});

export const logout = createAsyncThunk("auth/logout", async () => {
    return await authService.logoutUser();
});

const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder
            .addCase(register.pending, (state, action) => {
            state.isLoading = true;
            }).addCase(register.fulfilled, (state, action) => {
                state.user = null;
                state.isLoading = false;
                state.isError = false;
            }).addCase(register.rejected, (state, action) => {
                state.user = null;
                state.isLoading = false;
                state.isError = true;
            }).addCase(login.pending, (state, action) => {
            state.isLoading = true;
            }).addCase(login.fulfilled, (state, action) => {
                state.user = action.payload.success ? action.payload.user : null;
                state.isLoading = false;
                state.isError = false;
            }).addCase(login.rejected, (state, action) => {
                state.user = null;
                state.isLoading = false;
                state.isError = true;
            }).addCase(fetchProfile.pending, (state, action) => {
            state.isLoading = true;
            }).addCase(fetchProfile.fulfilled, (state, action) => {
                state.user = action.payload.success ? action.payload.user : null;
                state.isLoading = false;
                state.isError = false;
            }).addCase(fetchProfile.rejected, (state, action) => {
                state.user = null;
                state.isLoading = false;
                state.isError = true;
            }).addCase(logout.fulfilled, (state, action) => {
                state.user = null;
                state.isLoading = false;
                state.isError = false;
            })
    }
});

export default authSlice.reducer;