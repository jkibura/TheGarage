import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

dotenv.config();

interface AuthRequest extends Request {
  user?: JwtPayload | string;
}

export const authMiddleware = (roles: string[] = []) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.cookies.token;

    if (!token) {
      console.log("Unauthorized: No token provided");
      return res.status(401).json({ message: "No token provided" });
    }

    try {
      const decoded = jwt.verify(
        token,
        process.env.TOKEN_SECRET as string
      ) as JwtPayload;
      console.log("Decoded token:", decoded);

      if (roles.length && !roles.includes(decoded.role as string)) {
        console.log(
          `Forbidden: User role not authorized. Expected roles: ${roles}, User role: ${decoded.role}`
        );
        return res.status(403).json({ message: "Forbidden" });
      }

      req.user = decoded;
      next();
    } catch (err: any) {
      console.log("Invalid token:", err.message);
      return res.status(401).json({ message: "Invalid token" });
    }
  };
};
