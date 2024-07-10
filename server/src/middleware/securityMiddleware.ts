import { Request, Response, NextFunction } from "express";
import helmet from "helmet";

export const setCspHeaders = () => {
  return helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "maxcdn.bootstrapcdn.com"],
      scriptSrc: ["'self'", "cdnjs.cloudflare.com"],
    },
  });
};
