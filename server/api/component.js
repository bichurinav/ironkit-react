import { Router } from 'express';
import ComponentController from './controllers/ComponentController.js';
const componentRouter = Router();

componentRouter.post('/add', ComponentController.addComponent);
componentRouter.get('/:component', ComponentController.getComponent);

export default componentRouter;
