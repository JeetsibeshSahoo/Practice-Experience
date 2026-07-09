import { axiosInstance } from "../../utils/axiosInstance"


export const registerUser = async(data) => {
    const response = await axiosInstance.post("/user", data);
    return response.data;
}

export const loginUser = async(data) => {
    const response = await axiosInstance.post("/login", data);
    return response.data;
}

export const getProfile = async() => {
    const response = await axiosInstance.get("/profile");
    return response.data;
}

export const logoutUser = async() => {
    const response = await axiosInstance.post("/logout");
    return response.data;
}

export const logoutAllDevices = async() => {
    const response = await axiosInstance.post("/logout-all");
    return response.data;
}