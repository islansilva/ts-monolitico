import GenerateInvoiceUseCase from "./generate-invoice.usecase";


const MockRepository = () => {
    return {
        generate: jest.fn(),
        find: jest.fn()
    }
}

describe("GenerateInvoice UseCase unit test", () => {

    it("should generate a Invoice", async() => {
        const invoiceRepository = MockRepository();
        const generateUseCase = new GenerateInvoiceUseCase(invoiceRepository);

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

        const invoice = await generateUseCase.execute(input);

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
})