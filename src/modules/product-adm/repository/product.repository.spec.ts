import { Sequelize } from "sequelize-typescript"
import ProductModel from "./product.model";
import Product from "../domain/product.entity";
import Id from "../../@shared/domain/value-object/id.value-object";
import ProductRepository from "./product.repository";

describe("ProductRepository test", () => {

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

        const productRepository = new ProductRepository();

        const productProps = {
            id: new Id("1"),
            name: "Product 1",
            description:"Product 1 description",
            purchasePrice: 100,
            stock: 10,
            createdAt:new Date(),
            updatedAt: new Date()
        }

        const product = new Product(productProps);

        await productRepository.add(product)

        const productDb = await ProductModel.findOne({
            where: { id: productProps.id.id },
            raw: true
          });
      
        expect(product.id.id).toEqual(productDb.id);
        expect(product.name).toEqual(productDb.name);
        expect(product.description).toEqual(productDb.description);
        expect(product.purchasePrice).toEqual(productDb.purchasePrice);
        expect(product.stock).toEqual(productDb.stock);

    })


    it("should find a product", async () => {
        const productRepository = new ProductRepository();

        const productProps = {
            id: "1",
            name: "Product 1",
            description:"Product 1 description",
            purchasePrice: 100,
            stock: 10,
            createdAt:new Date(),
            updatedAt: new Date()
        }

        ProductModel.create(productProps);

        const result = await productRepository.find("1");
      
        expect(productProps.id).toEqual(result.id.id);
        expect(productProps.name).toEqual(result.name);
        expect(productProps.description).toEqual(result.description);
        expect(productProps.purchasePrice).toEqual(result.purchasePrice);
        expect(productProps.stock).toEqual(result.stock);
        
    })
})