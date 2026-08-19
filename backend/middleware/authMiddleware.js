// const jwt = require("jsonwebtoken");


// const authMiddleware = (req, res, next) => {
//     const token = req.cookies.token;

//     // Check if token exists
//     if (!token) {
//         return res.status(401).json({
//             status: false,
//             message: "Please login first",
//         });
//     }

//     // Verify token
//     try {
//         const decoded = jwt.verify(
//             token,
//             process.env.JWT_SECRET
//         );

//         // Store decoded user information
//         req.user = decoded;

//         // Continue to next middleware/controller
//         next();

//     } catch (error) {
//         return res.status(401).json({
//             status: false,
//             message: "Invalid or expired token",
//         });
//     }
// };

// module.exports = authMiddleware;

