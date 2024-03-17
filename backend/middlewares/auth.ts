import { NextFunction, Request, Response } from "express";
const jwt = require("jsonwebtoken");
// Define the type for the payload of the JWT token
interface TokenPayload {
  email: string;
  id: string;
}

// Define a new interface by extending Request from express
interface AuthenticatedRequest extends Request {
  userId?: string; // Define the custom property userId
}

// Define the middleware function
function authMiddleware(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader: string | undefined = req.headers.authorization;

  // Check if the authorization header is missing or invalid
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({ error: "Unauthorized" });
  }

  // Extract the token from the authorization header
  const token = authHeader.split(" ")[1];

  try {
    // Verify the token and decode its payload
    const decode = jwt.verify(token, "secret") as TokenPayload;

    // Attach the decoded userId to the request object for further use
    req.userId = decode.id;

    // Call the next middleware or route handler
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: "Invalid token" });
  }
}

module.exports = { authMiddleware };
