import { Router } from 'express';
import MenuController from './controllers/MenuController.js';
const menuRouter = Router();

menuRouter.get('/', MenuController.getMenu);

export default menuRouter;
