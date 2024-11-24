import AddClientUseCase from "./add-client.usecase";

const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn()
    };
};

describe("Add Client Usecase unit test", () => {

    it("should add a client", async() => {
        const repository = MockRepository();
        const useCase = new AddClientUseCase(repository);

        const input = {
            name: "Client 1",
            email: "c1@test.com",
            document: "Doc 1",
            street: "Street 1",
            number: 1,
            complement: "Comp 1",
            city: "City 1",
            state: "State 1",
            zipCode: "Zip 1",
        };
        
        const result = await useCase.execute(input);

        expect(repository.add).toHaveBeenCalled();
        expect(result.id).toBeDefined();
        expect(result.name).toEqual(input.name);
        expect(result.email).toEqual(input.email);
        expect(result.document).toEqual(input.document);
        expect(result.street).toEqual(input.street);
        expect(result.number).toEqual(input.number);
        expect(result.complement).toEqual(input.complement);
        expect(result.city).toEqual(input.city);
        expect(result.state).toEqual(input.state);
        expect(result.zipCode).toEqual(input.zipCode);

    })
})