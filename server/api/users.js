import { Router } from 'express';
import UsersController from './controllers/UsersController.js';
const usersRouter = Router();

usersRouter.post('/', UsersController.getUser);
usersRouter.post('/add', UsersController.addUser);

export default usersRouter;
