import {Request, Response, NextFunction } from 'express';

import {JwtPayload, verify, VerifyErrors} from 'jsonwebtoken';
require("dotenv").config();

export const checkToken = (request: Request, response: Response, next: NextFunction) => {
  try {
    const header = request.headers["authorization"];
    
    if (typeof header !== "undefined") {
      const bearer = header.split(" ");
      const token = bearer[1];
      
      verify(token, process.env.SECRET_KEY, (error: VerifyErrors, decode: JwtPayload) => {
        // If the token is invalid send a Forbidden 413
        if (error) {
          return next(error);
        }
        response.locals.user = decode;
        return next();
      });
    }
  } catch (error) {
   next(error);
  }
};
