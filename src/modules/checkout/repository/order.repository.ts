import Id from "../../@shared/domain/value-object/id.value-object";
import Client from "../domain/client.entity";
import Order from "../domain/order.entity";
import Product from "../domain/product.entity";
import CheckoutGateway from "../gateway/checkout.gateway";
import { OrderClientModel } from "./order-client.model";
import OrderProductModel from "./order-products.model";
import OrderModel from "./order.model";

export default class OrderRepository implements CheckoutGateway {

    async addOrder(order: Order): Promise<void> {
        await OrderModel.create({
            id: order.id.id,
            client: {
                id: order.client.id.id,
                name: order.client.name,
                email: order.client.email,
                document: order.client.document,
                street: order.client.street,
                number: order.client.number,
                complement: order.client.complement,
                city: order.client.city,
                state: order.client.state,
                zipCode: order.client.zipCode,
                createdAt: order.client.createdAt,
                updatedAt: order.client.updatedAt
            },
            products: order.products.map((p) => ({
                id: p.id.id,
                name: p.name,
                description: p.description,
                salesPrice: p.salesPrice
            })),
            status: order.status,
            createdAt: order.createdAt,
            updatedAt: order.updatedAt
        }, {
            include: [{model: OrderProductModel}, {model: OrderClientModel}]
        })
    }

    async findOrder(id: string): Promise<Order | null> {
        try {
            const result = (await OrderModel.findOne({
                where: {
                    id: "o1"
                },
                include: [
                    {
                        model: OrderProductModel,
                        as: "products",
                    },
                    {
                        model: OrderClientModel,
                        as: "client",
                    }
                ],
                rejectOnEmpty: true
            })).dataValues;

            const resultClient = result.client.dataValues;
            const client = new Client({
                id: new Id(resultClient.id),
                name: resultClient.name,
                email: resultClient.email,
                document: resultClient.document,
                street: resultClient.street,
                number: resultClient.number,
                complement: resultClient.complement,
                city: resultClient.city,
                state: resultClient.state,
                zipCode: resultClient.zipCode
            })

            const order = new Order({
                id: new Id(result.id),
                client: client,
                status: result.status,
                products: result.products.map((p: OrderProductModel) => {
                    return new Product({
                        id: new Id(p.dataValues.id),
                        name: p.dataValues.name,
                        description: p.dataValues.description,
                        salesPrice: p.dataValues.salesPrice
                    })
                }),
                createdAt: result.createdAt,
                updatedAt: result.updatedAt
            });

            return order;
        } catch (ex) {
            console.log(ex);
            return null;
        }
    }
    
}