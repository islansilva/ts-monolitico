import { Sequelize } from "sequelize-typescript";
import InvoiceModel from "../repository/invoice.model";
import InvoiceItemModel from "../repository/invoice-item.model";
import InvoiceFacadeFactory from "../factory/invoice.facade.factory";

describe("Invoice Facade test", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: {force: true}
        });

        sequelize.addModels([InvoiceModel, InvoiceItemModel]);
        await sequelize.sync();
    });

    afterEach(async() => {
        await sequelize.close();
    });

    it("should create a invoice", async() => {

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

        expect(invoice.id).toBeDefined();
        expect(invoice.name).toBe(input.name)
        expect(invoice.document).toBe(input.document)
        expect(invoice.street).toBe(input.street)
        expect(invoice.number).toBe(input.number)
        expect(invoice.complement).toBe(input.complement)
        expect(invoice.zipCode).toBe(input.zipCode)
        expect(invoice.city).toBe(input.city)
        expect(invoice.state).toBe(input.state)

        expect(invoice.items.length).toBe(2)

        expect(invoice.items[0].id).toBe(input.items[0].id)
        expect(invoice.items[0].name).toBe(input.items[0].name)
        expect(invoice.items[0].price).toBe(input.items[0].price)

        expect(invoice.items[1].id).toBe(input.items[1].id)
        expect(invoice.items[1].name).toBe(input.items[1].name)
        expect(invoice.items[1].price).toBe(input.items[1].price)

        expect(invoice.total).toBe(300)
    })

    it("should find a invoice", async() => {

        const invoiceFacade = InvoiceFacadeFactory.create();

        
        const inputGenerate = {
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

        const invoiceGenerate = await invoiceFacade.generate(inputGenerate);

        const inputFind ={
            id: invoiceGenerate.id
        }
        const invoice = await invoiceFacade.find(inputFind)

        expect(invoice.id).toBeDefined();
        expect(invoice.name).toBe(inputGenerate.name)
        expect(invoice.document).toBe(inputGenerate.document)
        expect(invoice.address.street).toBe(inputGenerate.street)
        expect(invoice.address.number).toBe(inputGenerate.number)
        expect(invoice.address.complement).toBe(inputGenerate.complement)
        expect(invoice.address.zipCode).toBe(inputGenerate.zipCode)
        expect(invoice.address.city).toBe(inputGenerate.city)
        expect(invoice.address.state).toBe(inputGenerate.state)

        expect(invoice.items.length).toBe(2)

        expect(invoice.items[0].id).toBe(inputGenerate.items[0].id)
        expect(invoice.items[0].name).toBe(inputGenerate.items[0].name)
        expect(invoice.items[0].price).toBe(inputGenerate.items[0].price)

        expect(invoice.items[1].id).toBe(inputGenerate.items[1].id)
        expect(invoice.items[1].name).toBe(inputGenerate.items[1].name)
        expect(invoice.items[1].price).toBe(inputGenerate.items[1].price)

        expect(invoice.total).toBe(300)
    })
})