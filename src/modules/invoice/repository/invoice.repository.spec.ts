import { Sequelize } from "sequelize-typescript";
import InvoiceModel from "./invoice.model";
import InvoiceItemModel from "./invoice-item.model";
import InvoiceItems from "../domain/invoice-items.entity";
import Id from "../../@shared/domain/value-object/id.value-object";
import Address from "../value-object/address";
import Invoice from "../domain/invoice.entity";
import InvoiceRepository from "./invoice.repository";

describe("InvoiceRepository test", () => {

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
        
        const invoiceItem1 = new InvoiceItems({
            id: new Id("100"),
            name: "Item 1",
            price: 100
        })

        const invoiceItem2 = new InvoiceItems({
            id: new Id("200"),
            name: "Item 2",
            price: 200
        })

        const address = new Address({
            street: "Street 1",
            number: "100",
            complement: "Compl 1",
            zip: "Zip 1",
            city: "City 1",
            state: "State"
        })

        const invoice = new Invoice({
            id: new Id("1"),
            name: "Invoice 1",
            document: "Document 1",
            address: address,
            items: [invoiceItem1, invoiceItem2],
            createdAt: new Date(),
            updatedAt: new Date()
        })

        const invoiceRepository = new InvoiceRepository();

        await invoiceRepository.generate(invoice);

        const result = (await InvoiceModel.findOne({
            where: {
                id: "1"
            },
            include: [
                {
                    model: InvoiceItemModel,
                    as: "items",
                }
            ],
            rejectOnEmpty: true
        })).dataValues;
        
        expect(result.id).toBe("1");
        expect(result.name).toBe("Invoice 1");
        expect(result.document).toBe("Document 1");

        expect(result.street).toBe("Street 1");
        expect(result.number).toBe("100");
        expect(result.complement).toBe("Compl 1");
        expect(result.city).toBe("City 1");
        expect(result.state).toBe("State");
        expect(result.zipCode).toBe("Zip 1");

        expect(result.items).toHaveLength(2);

        const firstItem = result.items[0].dataValues;
        expect(firstItem.id).toBe("100");
        expect(firstItem.name).toBe("Item 1");
        expect(firstItem.price).toBe(100);
        expect(new Date(firstItem.createdAt)).toStrictEqual(invoiceItem1.createdAt);
        expect(new Date(firstItem.updatedAt)).toStrictEqual(invoiceItem1.updatedAt);

        const secondItem = result.items[1].dataValues;
        expect(secondItem.id).toBe("200");
        expect(secondItem.name).toBe("Item 2");
        expect(secondItem.price).toBe(200);
        expect(new Date(secondItem.createdAt)).toStrictEqual(invoiceItem2.createdAt);
        expect(new Date(secondItem.updatedAt)).toStrictEqual(invoiceItem2.updatedAt);
        
    })

    
    it("should find a invoice", async() => {
        
        const invoiceItem1 = new InvoiceItems({
            id: new Id("100"),
            name: "Item 1",
            price: 100
        })

        const invoiceItem2 = new InvoiceItems({
            id: new Id("200"),
            name: "Item 2",
            price: 200
        })

        await InvoiceModel.create({
            id: "1",
            name: "Invoice 1",
            document: "Document 1",
            street: "Street 1",
            number: "100",
            complement: "Compl 1",
            city: "City 1",
            state: "State",
            zipCode: "Zip 1",
            items: [{
                id: invoiceItem1.id.id,
                name: invoiceItem1.name,
                price: invoiceItem1.price,
                createdAt: invoiceItem1.createdAt,
                updatedAt: invoiceItem1.updatedAt
            },
            {
                id: invoiceItem2.id.id,
                name: invoiceItem2.name,
                price: invoiceItem2.price,
                createdAt: invoiceItem2.createdAt,
                updatedAt: invoiceItem2. updatedAt
            }],
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            include: [{model: InvoiceItemModel}]
        })

        const invoiceRepository = new InvoiceRepository();
        const result = await invoiceRepository.find("1");
        
        expect(result.id.id).toBe("1");
        expect(result.name).toBe("Invoice 1");
        expect(result.document).toBe("Document 1");

        expect(result.address.street).toBe("Street 1");
        expect(result.address.number).toBe("100");
        expect(result.address.complement).toBe("Compl 1");
        expect(result.address.city).toBe("City 1");
        expect(result.address.state).toBe("State");
        expect(result.address.zip).toBe("Zip 1");

        expect(result.items).toHaveLength(2);

        const firstItem = result.items[0];
        expect(firstItem.id.id).toBe("100");
        expect(firstItem.name).toBe("Item 1");
        expect(firstItem.price).toBe(100);
        expect(new Date(firstItem.createdAt)).toStrictEqual(invoiceItem1.createdAt);
        expect(new Date(firstItem.updatedAt)).toStrictEqual(invoiceItem1.updatedAt);

        const secondItem = result.items[1];
        expect(secondItem.id.id).toBe("200");
        expect(secondItem.name).toBe("Item 2");
        expect(secondItem.price).toBe(200);
        expect(new Date(secondItem.createdAt)).toStrictEqual(invoiceItem2.createdAt);
        expect(new Date(secondItem.updatedAt)).toStrictEqual(invoiceItem2.updatedAt);

        expect(result.totalInvoice()).toBe(300);
        
    })

})