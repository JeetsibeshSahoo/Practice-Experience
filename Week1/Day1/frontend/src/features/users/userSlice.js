import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as authService from "../auth/authService.js";

const initialState = {
    users: [],
    isLoading: false,
    error: null,
    currentPage: 1,
    totalPages: 1
};

export const fetchUsers = createAsyncThunk(
    "users/fetch",
    async (params, thunkAPI) => {
        try {
            return await authService.getAllUsers(params);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const removeUser = createAsyncThunk(
    "users/delete",
    async (id, thunkAPI) => {
        try {
            await authService.deleteUser(id);
            return id;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

const userSlice = createSlice({
    name : "user",
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
            state.isLoading = true;
            state.error = null
            }).addCase(fetchUsers.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.users = action.payload.users;
            state.currentPage = action.payload.currentPage;
            state.totalPages = action.payload.totalPages;
            }).addCase(fetchUsers.rejected, (state, action) => {
            state.users = [];
            state.isLoading = false;
            state.error = action.payload;
            }).addCase(removeUser.pending, (state) => {
            state.isLoading = true;
            state.error = null
            }).addCase(removeUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.users = state.users.filter(
                (user) => user._id !== action.payload
                );
            }).addCase(removeUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
});

export default userSlice.reducer;