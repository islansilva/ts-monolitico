import express, {Request, Response} from 'express'; 
import ProductAdmFacadeFactory from '../../../modules/product-adm/factory/facade.factory';

export const productRoute = express.Router();

productRoute.post("/", async (req: Request, res: Response) => {
    const productFacade = ProductAdmFacadeFactory.create();

    try {
        const input = {
            name: req.body.name,
            description: req.body.description,
            purchasePrice: req.body.purchasePrice,
            stock: req.body.stock
        }

        const result = await productFacade.addProduct(input);
        res.send(result);
    } catch (err) {
        res.status(500).send(err);
    }

})