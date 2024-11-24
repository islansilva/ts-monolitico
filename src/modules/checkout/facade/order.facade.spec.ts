import { Sequelize } from "sequelize-typescript";
import OrderModel from "../repository/order.model";
import { OrderClientModel } from "../repository/order-client.model";
import OrderProductModel from "../repository/order-products.model";
import Id from "../../@shared/domain/value-object/id.value-object";
import Product from "../domain/product.entity";
import OrderRepository from "../repository/order.repository";
import { PlaceOrderFacadeInputDto } from "./order.facade.interface";
import PlaceOrderUseCase from "../usecase/place-order/place-order.usecase";
import OrderFacade from "./order.facade";


const clientProps = {
    id: "1c",
    name: "Client 0",
    document: "000",
    email: "client@user.com",
    street: "address 1",
    number: "1",
    complement: "",
    city: "City 1",
    state: "State 1",
    zipCode: "000"
};

const mockClientFacade = {
    find: jest.fn().mockResolvedValue(clientProps)
};


const mockPaymentFacade = {
    process: jest.fn().mockReturnValue({
        transactionId: "1t",
        orderId: "1o",
        amount: 100,
        status: "approved",
        createdAt: new Date(),
        updatedAt: new Date()
    })
};

const mockInvoiceFacade = {
    generate: jest.fn().mockResolvedValue({
        id: "1i"
    })
};



describe("Order facade tests", () => {
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

    it("should create a order", async() => {

        const orderRepository = new OrderRepository();

        const placeOrderUseCase = new PlaceOrderUseCase(
            mockClientFacade as any,
            null,
            null,
            orderRepository,
            mockInvoiceFacade as any,
            mockPaymentFacade
        );

        const products = {
            "1": new Product({
                id: new Id("1"),
                name: "Product 1",
                description: "Description 1",
                salesPrice: 40
            }),
            "2": new Product({
                id: new Id("2"),
                name: "Product 2",
                description: "Description 2",
                salesPrice: 30
            })
        };

        const mockValidateProducts = jest
        //@ts-expect-error - spy on private method
        .spyOn(placeOrderUseCase, "validateProducts").mockImplementation(async () => Promise.resolve(null));

        const mockGetProduct = jest
        //@ts-expect-error - spy on private method
        .spyOn(placeOrderUseCase, "getProduct").mockImplementation(async (productId: keyof typeof products) => {
            return Promise.resolve(products[productId]);
        })

        const orderFacade = new OrderFacade(placeOrderUseCase);

        const input: PlaceOrderFacadeInputDto = {
            clientId: "1c",
            products: [{productId: "1"}, {productId: "2"}]
        }

        const output = await orderFacade.generate(input);

        expect(output.invoiceId).toBe("1i");
        expect(output.total).toBe(70);
        expect(output.products).toStrictEqual([
            {productId: "1"},
            {productId: "2"}
        ]);
        expect(mockClientFacade.find).toHaveBeenCalledTimes(1);
        expect(mockClientFacade.find).toHaveBeenCalledWith({id: "1c"});
        expect(mockValidateProducts).toHaveBeenCalledTimes(1);
        expect(mockValidateProducts).toHaveBeenCalledWith(input);
        expect(mockGetProduct).toHaveBeenCalledTimes(2);
        expect(mockPaymentFacade.process).toHaveBeenCalledTimes(1);
        expect(mockPaymentFacade.process).toHaveBeenCalledWith({
            orderId: output.id,
            amount: output.total,
        });
        expect(mockInvoiceFacade.generate).toHaveBeenCalledTimes(1);

        expect(mockInvoiceFacade.generate).toHaveBeenCalledWith({
            name: clientProps.name,
            document: clientProps.document,
            street: clientProps.street,
            number: clientProps.number,
            complement: clientProps.complement,
            city: clientProps.city,
            state: clientProps.state,
            zipCode: clientProps.zipCode,
            items: [
                {
                    id: products["1"].id.id,
                    name: products["1"].name,
                    price: products["1"].salesPrice
                },
                {
                    id: products["2"].id.id,
                    name: products["2"].name,
                    price: products["2"].salesPrice
                }
            ]
        })
    })
})