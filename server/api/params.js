import { Router } from 'express';
import ParamsController from './controllers/ParamsController.js';
const paramsRouter = Router();

paramsRouter.get('/:component', ParamsController.getParams);

export default paramsRouter;
