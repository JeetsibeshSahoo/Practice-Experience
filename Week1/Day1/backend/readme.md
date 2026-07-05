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