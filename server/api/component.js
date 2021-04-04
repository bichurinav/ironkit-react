import { Router } from 'express';
import ComponentController from './controllers/ComponentController.js';
const componentRouter = Router();

componentRouter.post('/add', ComponentController.addComponent);

export default componentRouter;
