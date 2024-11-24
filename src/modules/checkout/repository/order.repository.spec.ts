import { Sequelize } from "sequelize-typescript";
import OrderRepository from "./order.repository";
import Id from "../../@shared/domain/value-object/id.value-object";
import Order from "../domain/order.entity";
import Product from "../domain/product.entity";
import Client from "../domain/client.entity";
import OrderModel from "./order.model";
import OrderProductModel from "./order-products.model";
import { OrderClientModel } from "./order-client.model";

describe("OrderRepository test", () => {

    
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: {force: true}
        });

        sequelize.addModels([OrderModel, OrderClientModel, OrderProductModel]);
        await sequelize.sync();
    });

    afterEach(async() => {
        await sequelize.close();
    });

    it("should create a order", async() => {

        const product1 = new Product({
            id: new Id("p1"),
            name: "Product 1",
            description: "Product description 1",
            salesPrice: 100
        });

        const product2 = new Product({
            id: new Id("p2"),
            name: "Product 2",
            description: "Product description 2",
            salesPrice: 200
        });

        const client = new Client({
                id: new Id("c1"),
                name: "Client 1",
                email: "x@x.com",
                document: "Doc 1",
                street: "Street 1",
                number: 1,
                complement: "Comp 1",
                city: "City 1",
                state: "State 1",
                zipCode: "Zip 1"
            })

        const order = new Order({
            id: new Id("o1"),
            client: client,
            products: [product1, product2]
        });

        const orderRepository = new OrderRepository();
        
        await orderRepository.addOrder(order)

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

        expect(result.id).toBe("o1");
        expect(result.status).toBe("pending")
        expect(new Date(result.createdAt)).toStrictEqual(order.createdAt);
        expect(new Date(result.updatedAt)).toStrictEqual(order.updatedAt);


        const resultClient = result.client.dataValues
        expect(resultClient.id).toBe("c1");
        expect(resultClient.name).toBe("Client 1");
        expect(resultClient.email).toBe("x@x.com");
        expect(resultClient.document).toBe("Doc 1");
        expect(resultClient.street).toBe("Street 1");
        expect(resultClient.number).toBe(1);
        expect(resultClient.complement).toBe("Comp 1");
        expect(resultClient.city).toBe("City 1");
        expect(resultClient.state).toBe("State 1");
        expect(resultClient.zipCode).toBe("Zip 1");

        expect(result.products).toHaveLength(2);

        const firstProduct = result.products[0].dataValues;
        expect(firstProduct.id).toBe("p1");
        expect(firstProduct.name).toBe("Product 1");
        expect(firstProduct.description).toBe("Product description 1")
        expect(firstProduct.salesPrice).toBe(100);
        
        const secondProduct = result.products[1].dataValues;
        expect(secondProduct.id).toBe("p2");
        expect(secondProduct.name).toBe("Product 2");
        expect(secondProduct.salesPrice).toBe(200);
        expect(secondProduct.description).toBe("Product description 2")
        
    })

    it("should find a order", async() => {
        const product1 = new Product({
            id: new Id("p1"),
            name: "Product 1",
            description: "Product description 1",
            salesPrice: 100
        });

        const product2 = new Product({
            id: new Id("p2"),
            name: "Product 2",
            description: "Product description 2",
            salesPrice: 200
        });

        const client = new Client({
                id: new Id("c1"),
                name: "Client 1",
                email: "x@x.com",
                document: "Doc 1",
                street: "Street 1",
                number: 1,
                complement: "Comp 1",
                city: "City 1",
                state: "State 1",
                zipCode: "Zip 1"
            })

        const order = new Order({
            id: new Id("o1"),
            client: client,
            products: [product1, product2]
        });

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
        });

        const orderRepository = new OrderRepository();
        const result = await orderRepository.findOrder("o1");

        expect(result.id.id).toBe("o1");
        expect(result.status).toBe("pending")
        expect(new Date(result.createdAt)).toStrictEqual(order.createdAt);
        expect(new Date(result.updatedAt)).toStrictEqual(order.updatedAt);

        const resultClient = result.client
        expect(resultClient.id.id).toBe("c1");
        expect(resultClient.name).toBe("Client 1");
        expect(resultClient.email).toBe("x@x.com");
        expect(resultClient.document).toBe("Doc 1");
        expect(resultClient.street).toBe("Street 1");
        expect(resultClient.number).toBe(1);
        expect(resultClient.complement).toBe("Comp 1");
        expect(resultClient.city).toBe("City 1");
        expect(resultClient.state).toBe("State 1");
        expect(resultClient.zipCode).toBe("Zip 1");

        expect(result.products).toHaveLength(2);

        const firstProduct = result.products[0];
        expect(firstProduct.id.id).toBe("p1");
        expect(firstProduct.name).toBe("Product 1");
        expect(firstProduct.description).toBe("Product description 1")
        expect(firstProduct.salesPrice).toBe(100);
        
        const secondProduct = result.products[1];
        expect(secondProduct.id.id).toBe("p2");
        expect(secondProduct.name).toBe("Product 2");
        expect(secondProduct.salesPrice).toBe(200);
        expect(secondProduct.description).toBe("Product description 2")
    })
})