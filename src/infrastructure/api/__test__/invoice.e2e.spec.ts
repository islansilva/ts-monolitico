import { Sequelize } from "sequelize-typescript";
import { app } from "../express";
import { Umzug } from "umzug";
import { migrator } from "./config-migrations/migrator";
import request from 'supertest';
import InvoiceModel from "../../../modules/invoice/repository/invoice.model";
import InvoiceFacadeFactory from "../../../modules/invoice/factory/invoice.facade.factory";
import InvoiceItemModel from "../../../modules/invoice/repository/invoice-item.model";

describe("E2E test for invoice", () => {
    let sequelize: Sequelize

    let migration: Umzug<any>

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ":memory:",
            logging: false
        })
          
        sequelize.addModels([InvoiceModel, InvoiceItemModel])
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

    it("should find a invoice", async() => {
        const invoiceFacade = InvoiceFacadeFactory.create();

        const input = {
            name: "Invoice 1",
            document: "Document 1",
            street: "Street 1",
            number: "100",
            complement: "Compl 1",
            zipCode: "Zip 1",
            city: "City 1",
            state: "State",
            items: [{
                        id: "100",
                        name: "Item 1",
                        price: 100
                    }, {
                        id: "200",
                        name: "Item 2",
                        price: 200
                    }]
        }

        const invoice = await invoiceFacade.generate(input);

        const response = await request(app)
            .get(`/invoice/${invoice.id}`)
            .send()

        expect(response.status).toBe(200)
        expect(response.body.id).toBeDefined();
        expect(response.body.name).toBe(input.name)
        expect(response.body.document).toBe(input.document)
        expect(response.body.address.street).toBe(input.street)
        expect(response.body.address.number).toBe(input.number)
        expect(response.body.address.complement).toBe(input.complement)
        expect(response.body.address.zipCode).toBe(input.zipCode)
        expect(response.body.address.city).toBe(input.city)
        expect(response.body.address.state).toBe(input.state)

        expect(response.body.items.length).toBe(2)

        expect(response.body.items[0].id).toBe(input.items[0].id)
        expect(response.body.items[0].name).toBe(input.items[0].name)
        expect(response.body.items[0].price).toBe(input.items[0].price)

        expect(response.body.items[1].id).toBe(input.items[1].id)
        expect(response.body.items[1].name).toBe(input.items[1].name)
        expect(response.body.items[1].price).toBe(input.items[1].price)

        expect(response.body.total).toBe(300)
    })
})