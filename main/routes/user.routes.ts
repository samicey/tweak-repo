import { Router } from 'express';
import { createUser, listUsers, userLogin} from '../controllers/user.controllers';

export const userRoute = Router();

userRoute.post('/', createUser)
         .post('/login', userLogin)
         .get('/', listUsers)