import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as authService from "./authService.js";

const initialState = {
    user : {},
    isLoading : false,
    error : null 
}

export const register = createAsyncThunk("auth/register", async (data, thunkAPI) => {
    try {
        return await authService.registerUser(data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const login = createAsyncThunk("auth/login", async (data, thunkAPI) => {
    try {
        return await authService.loginUser(data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const fetchProfile = createAsyncThunk("auth/profile", async (_, thunkAPI) => {
    try {
        return await authService.getProfile();
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
    try {
        return await authService.logoutUser();
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const logoutAll = createAsyncThunk("auth/logout-all", async (_, thunkAPI) => {
    try {
        return await authService.logoutAllDevices();
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder
            .addCase(register.pending, (state) => {
            state.isLoading = true;
            state.error = null
            }).addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.user = action.payload.user;
            }).addCase(register.rejected, (state, action) => {
                state.user = null;
                state.isLoading = false;
                state.error = action.payload;
            }).addCase(login.pending, (state) => {
            state.isLoading = true;
            state.error = null;
            }).addCase(login.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.isLoading = false;
                state.error = null;
            }).addCase(login.rejected, (state, action) => {
                state.user = null;
                state.isLoading = false;
                state.error = action.payload;
            }).addCase(fetchProfile.pending, (state) => {
            state.isLoading = true;
            state.error = null;
            }).addCase(fetchProfile.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.isLoading = false;
                state.error = null;
            }).addCase(fetchProfile.rejected, (state, action) => {
                state.user = null;
                state.isLoading = false;
                state.error = action.payload;
            }).addCase(logout.pending, (state) => {
                state.isLoading = true;
            }).addCase(logout.fulfilled, (state) => {
                state.user = null;
                state.isLoading = false;
                state.error = null;
            }).addCase(logout.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            }).addCase(logoutAll.pending, (state) => {
                state.isLoading = true;
            }).addCase(logoutAll.fulfilled, (state) => {
                state.user = null;
                state.isLoading = false;
                state.error = null;
            }).addCase(logoutAll.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    }
});

export default authSlice.reducer;