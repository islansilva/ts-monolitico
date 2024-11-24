import Id from "../../@shared/domain/value-object/id.value-object"
import Address from "../value-object/address"
import InvoiceItems from "./invoice-items.entity"
import Invoice from "./invoice.entity"

const itemInvoice1 = new InvoiceItems({
    id: new Id("100"),
    name: "Item 1",
    price: 100
})

const itemInvoice2 = new InvoiceItems({
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


describe("Invoice unit test", () => {
    
    it("should create a invoice", () => {
        const invoice = new Invoice({
            id: new Id("1"),
            name: "Invoice 1",
            document: "Doc 1",
            address: address,
            items: [itemInvoice1, itemInvoice2]
        })

        expect(invoice.id.id).toBe("1");
        expect(invoice.name).toBe("Invoice 1");
        expect(invoice.document).toBe("Doc 1")
        expect(invoice.address).toBe(address);
        expect(invoice.items).toStrictEqual([itemInvoice1, itemInvoice2]);
        expect(invoice.items.length).toBe(2);
    })

    it("should not create a invoice", () => {

        expect(() => {
            new Invoice({
                id: new Id("1"),
                name: "",
                document: "Doc 1",
                address: address,
                items: [itemInvoice1, itemInvoice2]
            })
        }).toThrowError("Name is required");

        expect(() => {
            new Invoice({
                id: new Id("1"),
                address: undefined,
                name: "Invoice 1",
                document: "Doc 1",
                items: [itemInvoice1, itemInvoice2]
            })
        }).toThrowError("Address is required");

        expect(() => {
            new Invoice({
                id: new Id("1"),
                address: address,
                name: "Invoice 1",
                document: "Doc 1",
                items: []
            })
        }).toThrowError("Item is required");

        expect(() => {
            new Invoice({
                id: new Id("1"),
                address: address,
                name: "Invoice 1",
                document: "",
                items: []
            })
        }).toThrowError("Document is required");



    })
})