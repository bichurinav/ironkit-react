import { Router } from 'express';
import BuilderController from './controllers/BuilderController.js';
const builderRouter = Router();

builderRouter.post('/create', BuilderController.create);
builderRouter.get('/:user/:id', BuilderController.getDetailBuilder);
builderRouter.delete('/:user/:id', BuilderController.removeBuilder);
builderRouter.get('/', BuilderController.get);

export default builderRouter;
