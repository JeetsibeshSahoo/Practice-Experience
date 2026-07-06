# Some Questions With Answer
## 1. httpOnly : true
#### Prevents JavaScript from accessing the cookie
#### ❌ document.cookie cannot read it
#### ✅ Protects against XSS attacks

## 2. secure
#### Cookie is only sent over HTTPS

#### Works like:

#### secure: true   // in production
#### secure: false  // in development

#### 👉 Why?

#### In development → you use http://localhost
#### In production → must use https://

## 3. sameSite: "strict"
#### Controls cross-site requests
#### "strict" means:
#### Cookie is NOT sent when request comes from another site
#### Only sent when user is on your own website

#### 👉 Protects against CSRF attacks

## 4. What happens if token is invalid?
#### If the token is invalid or expired, jwt.verify() throws an error. So we must handle it using try-catch.
#### If not handled → server crashes ❌
#### If handled → we return 401 Unauthorized ✅

## 5. Why do we use return in middleware?
#### We use return to stop further execution after sending a response.

#### Without return:-

#### Code continues running
#### May call next() again
#### Can cause multiple responses error (ERR_HTTP_HEADERS_SENT)

## 6. Why use httpOnly cookies?
#### httpOnly cookies cannot be accessed by JavaScript (document.cookie).

#### This protects against XSS attacks.

#### 👉 Without httpOnly:

#### document.cookie // attacker can steal token ❌

#### 👉 With httpOnly:

#### JS cannot read cookie ✅
#### Token is safe even if XSS happens

## One line answer
#### “Using httpOnly cookies + sameSite + secure makes authentication much safer compared to storing tokens in localStorage.”

## 7. Why not use authMiddleware in logout?
#### Because authMiddleware depends on accessToken, and if it's expired the user won't be able to logout. So logout should rely on token presence, not token validity.

## 8. How do you handle multiple sessions?
#### I store refresh tokens in the database. Each device has a unique token. On logout, I remove a specific token for single-device logout or clear all tokens for global logout.
## 9. How do you implement logout for multiple devices?
#### I store refresh tokens in the database. For single logout, I remove the current token using $pull. For global logout, I clear all tokens from the user document.
## 10. How do you handle logout securely?
#### I store refresh tokens in the database. For single logout, I remove the specific token using $pull and validate the result. For global logout, I clear all tokens using user ID from auth middleware.
## 11. How do you secure refresh tokens?
#### I hash refresh tokens before storing them in the database using SHA-256, so even if the database is compromised, tokens cannot be reused.

// const token = jwt.sign({
        //     id : user._id, email : user.email, role : user.role
        // }, process.env.JWT_SECRET, {expiresIn : "30m"});

        // res.cookie("token", token, {httpOnly : true, secure : process.env.NODE_ENV === "production", sameSite : "strict"});
        // const accessToken = jwt.sign(
        //     {id : user._id, email : user.email, role : user.role},
        //     process.env.JWT_SECRET,
        //     { expiresIn : "15m"}
        // );

        // const refreshToken = jwt.sign(
        //     {id : user._id},
        //     process.env.JWT_REFRESH_SECRET,
        //     { expiresIn : "7d"}
        // );