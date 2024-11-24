import Id from "../../../@shared/domain/value-object/id.value-object";
import InvoiceItems from "../../domain/invoice-items.entity";
import Invoice from "../../domain/invoice.entity";
import Address from "../../value-object/address";
import FindInvoiceUseCase from "./find-invoice.usecase";

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

const invoice = new Invoice({
    id: new Id("1"),
    name: "Invoice 1",
    document: "Document 1",
    address: address,
    items: [itemInvoice1, itemInvoice2],
    createdAt: new Date(),
    updatedAt: new Date()
})

const MockRepository = () => {
    return {
        generate: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(invoice))
    }
}

describe("FindInvoice UseCase unit test", () => {

    it("should find a Invoice", async() => {
        const invoiceRepository = MockRepository();
        const findUseCase = new FindInvoiceUseCase(invoiceRepository);

        const input = {
            id: "1"
        }
        const result = await findUseCase.execute(input);

        expect(result.id).toBe("1");
        expect(result.name).toBe(invoice.name)
        expect(result.document).toBe(invoice.document)
        expect(result.address.street).toBe(invoice.address.street)
        expect(result.address.number).toBe(invoice.address.number)
        expect(result.address.complement).toBe(invoice.address.complement)
        expect(result.address.zipCode).toBe(invoice.address.zip)
        expect(result.address.city).toBe(invoice.address.city)
        expect(result.address.state).toBe(invoice.address.state)

        expect(result.items.length).toBe(2)

        expect(result.items[0].id).toBe(invoice.items[0].id.id)
        expect(result.items[0].name).toBe(invoice.items[0].name)
        expect(result.items[0].price).toBe(invoice.items[0].price)

        expect(result.items[1].id).toBe(invoice.items[1].id.id)
        expect(result.items[1].name).toBe(invoice.items[1].name)
        expect(result.items[1].price).toBe(invoice.items[1].price)

        expect(result.total).toBe(300)
        expect(result.createdAt).toBe(invoice.createdAt)

    })
})