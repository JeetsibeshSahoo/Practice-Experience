import { axiosInstance } from "../../utils/axiosInstance"


export const registerUser = async(data) => {
    try {
        const response = await axiosInstance.post("/user", data);
        return response.data;
    } catch (error) {
        throw error.response?.data || {message : "Something went wrong"}
    }
}

export const loginUser = async(data) => {
    try {
        const response = await axiosInstance.post("/login", data);
        return response.data;
    } catch (error) {
        throw error.response?.data || {message : "Something went wrong"}
    }
}

export const getProfile = async() => {
    try {
        const response = await axiosInstance.get("/profile");
        return response.data;
    } catch (error) {
        throw error.response?.data || {message : "Something went wrong"}
    }
}

export const logoutUser = async() => {
    try {
        const response = await axiosInstance.post("/logout");
        return response.data;
    } catch (error) {
        throw error.response?.data || {message : "Something went wrong"}
    }
}

export const logoutAllDevices = async() => {
    try {
        const response = await axiosInstance.post("/logout-all");
        return response.data;
    } catch (error) {
        throw error.response?.data || {message : "Something went wrong"}
    }
}