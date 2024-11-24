import { Sequelize } from "sequelize-typescript"
import { Umzug } from "umzug"
import ProductModel from "../../../modules/product-adm/repository/product.model"
import CatalogProductModel from "../../../modules/store-catalog/repository/product.model"
import { ClientModel } from "../../../modules/client-adm/repository/client.model"
import InvoiceModel from "../../../modules/invoice/repository/invoice.model"
import OrderModel from "../../../modules/checkout/repository/order.model"
import InvoiceItemModel from "../../../modules/invoice/repository/invoice-item.model"
import { OrderClientModel } from "../../../modules/checkout/repository/order-client.model"
import OrderProductModel from "../../../modules/checkout/repository/order-products.model"
import TransactionModel from "../../../modules/payment/repository/transaction.model"
import { migrator } from "./config-migrations/migrator"
import ProductAdmFacadeFactory from "../../../modules/product-adm/factory/facade.factory"
import ClientAdmFacadeFactory from "../../../modules/client-adm/factory/client.facade.factory"
import request from 'supertest';
import { app } from "../express";

describe("E2E test for checkout", () => {


    let sequelize: Sequelize

    let migration: Umzug<any>

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ":memory:",
            logging: false
        })
          
        sequelize.addModels([ProductModel, CatalogProductModel, ClientModel, InvoiceModel, InvoiceItemModel, OrderModel, OrderClientModel, OrderProductModel, TransactionModel])
        migration = migrator(sequelize)
        await migration.up()
		await sequelize.sync();
    })

    afterEach(async () => {
        if (!migration || !sequelize) {
        	return 
        }
        migration = migrator(sequelize)
        await migration.down()
        await sequelize.close()
		
    })

    it("should create a order", async() => {
        const productFacade = ProductAdmFacadeFactory.create();
        const productInput1 = {
            id: "1",
            name: "Product 1",
            description: "Product 1 description",
            purchasePrice: 40,
            stock: 10
        }
        await productFacade.addProduct(productInput1);

        CatalogProductModel.update(
			{ 
                name: productInput1.name,
                description: productInput1.description,
                salesPrice: productInput1.purchasePrice },
			{ where: { id: productInput1.id } }
		);

        const productInput2 = {
            id: "2",
            name: "Product 2",
            description: "Product 2 description",
            purchasePrice: 90,
            stock: 2
        }
        await productFacade.addProduct(productInput2);

        CatalogProductModel.update(
			{ 
                name: productInput2.name,
                description: productInput2.description,
                salesPrice: productInput2.purchasePrice },
			{ where: { id: productInput2.id } }
		);

        const clienteAdmFacade = ClientAdmFacadeFactory.create();
        const clientInput = {
            id: "1",
            name: "Cliente 1",
            email: "x@x.com",
            document: "Doc 1",
            street: "Street 1",
            number: 1,
            complement: "Comp 1",
            city: "City 1",
            state: "State 1",
            zipCode: "Zip 1"
        }
        await clienteAdmFacade.add(clientInput);
        
        const input = {
            clientId: clientInput.id,
            products: [productInput1, productInput2].map(p => ({ productId: p.id }))
        }

        const response = await request(app)
            .post("/checkout")
            .send(input);

        expect(response.status).toBe(200);
        expect(response.body.id).toBeDefined();
        expect(response.body.status).toBe("approved");
        expect(response.body.invoiceId).toBeDefined();
        expect(response.body.total).toBe(130);
        expect(response.body.products.length).toBe(2);
    })
})