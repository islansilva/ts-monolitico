import { Sequelize } from "sequelize-typescript";
import ProductModel from "../repository/product.model";
import ProductAdmFacadeFactory from "../factory/facade.factory";


describe("ProductAdmFacade test", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: {force: true}
        });

        sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async() => {
        await sequelize.close();
    });


    it("should create a product", async() => {
        const productFacade = ProductAdmFacadeFactory.create();

        const input = {
            id: "1",
            name: "Product 1",
            description: "Product 1 description",
            purchasePrice: 10,
            stock: 10
        }

        await productFacade.addProduct(input);

        const product = await ProductModel.findOne({
            where: {id: "1"},
            raw: true
        });

        expect(product).toBeDefined();
        expect(product.id).toEqual(input.id);
        expect(product.name).toEqual(input.name);
        expect(product.description).toEqual(input.description);
        expect(product.purchasePrice).toEqual(input.purchasePrice);
        expect(product.stock).toEqual(input.stock);
    })

    it("should check balance of product", async() => {
        const productFacade = ProductAdmFacadeFactory.create();

        const inputCreateProduct = {
            id: "2",
            name: "Product 1",
            description: "Product 1 description",
            purchasePrice: 10,
            stock: 10
        }

        const inputCheckStock = {
            productId: "2",
        }

        await productFacade.addProduct(inputCreateProduct);
        const checkStock = await productFacade.checkStock(inputCheckStock)

        expect(checkStock.productId).toEqual("2");
        expect(checkStock.stock).toEqual(10);
    })

    it("should not check the balance of a non existent product", async() => {
        const productFacade = ProductAdmFacadeFactory.create();

        const inputCreateProduct = {
            id: "3",
            name: "Product 1",
            description: "Product 1 description",
            purchasePrice: 10,
            stock: 10
        }

        const inputCheckStock = {
            productId: "4",
        }

        await productFacade.addProduct(inputCreateProduct);


        await expect(productFacade.checkStock(inputCheckStock))
        .rejects
        .toThrowError(`Product with id ${inputCheckStock.productId} not found`);

    })

});