import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
    try {
        const token = req.cookies?.token;
    
        if(!token) {
            return res.status(401).json({
                success : false,
                message : "Unauthorized User"
            });
        }
    
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
    
        return next();
    } catch (error) {
        return res.status(401).json({
            success : false,
            message : "Invalid or Expired token"
        });
    }
}

export const isAdmin = (req, res, next) => {
    if(req.user.role !== "admin") {
        return res.status(403).json({
            success : false,
            message : "Access denied"
        });
    }
    return next();
}