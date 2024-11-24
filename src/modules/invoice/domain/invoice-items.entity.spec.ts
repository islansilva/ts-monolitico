import Id from "../../@shared/domain/value-object/id.value-object"
import InvoiceItems from "./invoice-items.entity"

describe("InvoiceItems unit test", () => {

    it("should create a Invoice Item", () => {
        
        const invoiceItem = new InvoiceItems( {
            id: new Id("1"),
            name: "Name 1",
            price: 100
        });

        expect(invoiceItem.id.id).toBe("1");
        expect(invoiceItem.name).toBe("Name 1");
        expect(invoiceItem.price).toBe(100);
    })

    it("should not create a invoice item", () => {

        expect(() => {
            new InvoiceItems( {
                id: new Id("1"),
                name: "",
                price: 100
            })
        }).toThrowError("Name is required")

        expect(() => {
            new InvoiceItems( {
                id: new Id("1"),
                name: "Name 1",
                price: -1
            })
        }).toThrowError("Price must be greater than 0")

        expect(() => {
            new InvoiceItems( {
                id: new Id("1"),
                name: "Name 1",
                price: 0
            })
        }).toThrowError("Price must be greater than 0")

    })
})