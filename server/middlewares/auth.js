const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const authHeaders = req.headers.authorization;
    if (!authHeaders) {
        console.error("Authorization header missing");
        return res.status(401).json({ message: "Authorization header missing" });
    }

    const token = authHeaders.split(" ")[1];
    if (!token) {
        console.error("Token missing");
        return res.status(401).json({ message: "Token missing" });
    }

    jwt.verify(token, "scret-key", (error, result) => {
        if (error) {
            console.error("Token verification error:", error);
            return res.status(401).json({ message: "Invalid token" });
        }

        console.log("Token verification successful, payload:", result);
        req.uid = result.user_id; // Ensure this matches the token payload
        next();
    });
};

module.exports = verifyToken;