import { Sequelize } from "sequelize-typescript";
import { app } from "../express";
import request from 'supertest';
import { Umzug } from "umzug";
import ProductModel from "../../../modules/product-adm/repository/product.model";
import { migrator } from "./config-migrations/migrator";


describe("E2E test for product", () => {


    let sequelize: Sequelize

    let migration: Umzug<any>

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ":memory:",
            logging: false
        })
          
        sequelize.addModels([ProductModel])
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

    it("should create a product", async() => {
        const input = {
            name: "Product A",
            description: "Description Product A",
            purchasePrice: 200,
            stock: 3
        }
        const response = await request(app)
            .post("/products")
            .send(input);
        
        expect(response.status).toBe(200);
        expect(response.body.id).toBeDefined();
        expect(response.body.name).toBe("Product A");
        expect(response.body.description).toBe("Description Product A");
        expect(response.body.purchasePrice).toBe(200);
        expect(response.body.stock).toBe(3);
        

        

    })
})