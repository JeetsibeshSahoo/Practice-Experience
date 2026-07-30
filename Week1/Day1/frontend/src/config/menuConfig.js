import { LayoutDashboard, User, Settings } from "lucide-react";

export const menuConfig = [
    {
        name : "Dashboard",
        path : "/dashboard",
        icon : LayoutDashboard,
        roles : ["user", "admin"]
    },
    {
        name : "Profile",
        path : "/profile",
        icon : User,
        roles : ["user", "admin"]
    },
    {
        name : "Settings",
        path : "/settings",
        icon : Settings,
        roles : ["user", "admin"]
    },
    {
        name : "User",
        path : "/user",
        icon : User,
        roles : ["admin"]
    }
];