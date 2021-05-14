import { Router } from 'express';
import ComponentController from './controllers/ComponentController.js';
import checkAdmin from './middleware/checkAdmin.js';
const componentRouter = Router();

componentRouter.post('/add', ComponentController.addComponent);
componentRouter.get('/:component/:id', ComponentController.getNeededComponent);
componentRouter.get('/:component', ComponentController.getComponent);
componentRouter.delete(
    '/:component/:id',
    checkAdmin,
    ComponentController.removeComponent
);
componentRouter.put(
    '/update-image',
    checkAdmin,
    ComponentController.updateImage
);
componentRouter.put(
    '/price/:component/:id',
    checkAdmin,
    ComponentController.updatePrice
);

// componentRouter.put(
//     '/count/:component/:id',
//     checkAdmin,
//     ComponentController.updateCount
// );

export default componentRouter;
