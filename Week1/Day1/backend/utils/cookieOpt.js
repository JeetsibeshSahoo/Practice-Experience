export const cookieOptions = {
    httpOnly: true,
    secure: false,// process.env.NODE_ENV === "production",
    sameSite: "lax"
};