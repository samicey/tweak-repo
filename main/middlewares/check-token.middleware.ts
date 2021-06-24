import {Request, Response, NextFunction } from 'express';

import { verify } from 'jsonwebtoken';
import { RETURN_CODE } from '../helpers';
import { responseHandlers } from '../helpers/response-handlers.helpers';
require("dotenv").config();

export const checkToken = (request: Request, response: Response, next: NextFunction) => { 
  request.headers["authorization"] = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obiBEb2UiLCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJpYXQiOjE2MjQ0OTg0MzgsImV4cCI6MTYyNDUwNDQzOH0.D-ZfhRhcGVkmdZpE25538vt12WaVTIWLVNw-5afD8yQ'
  try {
    const header = request.headers["authorization"];
    const { SECRET_KEY } = process.env;
    
    if (typeof header !== "undefined" && SECRET_KEY) {
      const bearer = header.split(" ");
      const token = bearer[1];
      
      verify(token, SECRET_KEY, (error, decode) => {
        // If the token is invalid send a Forbidden 413
        if (error) {
          return responseHandlers(response, RETURN_CODE.Forbidden, undefined);
        }
        response.locals.user = decode;
        return next();
      });
    }
  } catch (error) {
    return responseHandlers(response, RETURN_CODE.Forbidden, undefined);
  }
};