import express, {Request, Response} from 'express';
import OrderFacade from '../../../modules/checkout/facade/order.facade';
import OrderFacadeFactory from '../../../modules/checkout/factory/order.facade.factory';


export const orderRoute = express.Router();

orderRoute.post("/", async(req: Request, res: Response) => {
    const orderFacade = OrderFacadeFactory.create();

    try {
        const input = {
            clientId: req.body.clientId,
            products: req.body.products
        }

        const result = await orderFacade.generate(input);
        res.send(result);
    }  catch (err) {
        res.status(500).send(err);
    }


})