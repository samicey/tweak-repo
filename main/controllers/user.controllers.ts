
import { User } from "../models/user.model";
import { Request, Response } from 'express';
import { hash, compareHash } from '../helpers/encrypt.helper';
import { responseHandlers } from "../helpers/response-handlers.helpers";
import { CustomError, RETURN_CODE } from "../helpers";
import { createToken } from "../helpers/create-token.helper";

export const createUser = async (request: Request, response: Response) => {
    const { email, name, password } = request.body;

    try {
    const hashedPassword = await hash(password);
    const user = await User.create({
        email,
        name,
        password: hashedPassword
    });

    return responseHandlers(response, RETURN_CODE.OK, user);
    } catch (error) {
    return responseHandlers(response, RETURN_CODE.InternalServerError, error)
    }
};

export const userLogin =  async (request: Request, response: Response) => {
    const { email, password } = request.body;

    try {
    const user = await User.findOne({
        email
    });

    if (!user) {
        throw new CustomError(RETURN_CODE.BadRequest, 'Incorrect email or password');
    }

    const match = compareHash(password, user.password)

    if(!match) {
        throw new CustomError(RETURN_CODE.BadRequest, 'Incorrect email or password');
    }

    const token = createToken({id: user.id, name: user.name, email: user.email}, 6000);

    return responseHandlers(response, RETURN_CODE.OK, {user: {id: user._id, name: user.name, email: user.email}, token});
    } catch (error) {
    return responseHandlers(response, RETURN_CODE.InternalServerError, error)
    }
};

export const listUsers =  async (request: Request, response: Response) => {

    try {
    const users = await User.find({});

    return responseHandlers(response, RETURN_CODE.OK, users);
    } catch (error) {
    return responseHandlers(response, RETURN_CODE.InternalServerError, error)
    }
};