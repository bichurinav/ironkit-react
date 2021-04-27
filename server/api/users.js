import { Router } from 'express';
import UsersController from './controllers/UsersController.js';
const usersRouter = Router();

usersRouter.post('/login', UsersController.getUser);
usersRouter.post('/add', UsersController.addUser);
usersRouter.get('/auth', UsersController.checkAuth);
usersRouter.get('/auth-exit', UsersController.removeAuth);

export default usersRouter;
