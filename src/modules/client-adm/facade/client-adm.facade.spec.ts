import { Sequelize } from "sequelize-typescript";
import { ClientModel } from "../repository/client.model";
import ClientRepository from "../repository/client.repository";
import AddClientUseCase from "../usecase/add-client/add-client.usecase";
import ClientAdmFacade from "./client-adm.facade";
import FindClientUseCase from "../usecase/find-client/find-client.usecase";
import ClientAdmFacadeFactory from "../factory/client.facade.factory";

describe("ClientAdm Facade test", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: {force: true}
        });

        sequelize.addModels([ClientModel]);
        await sequelize.sync();
    });

    afterEach(async() => {
        await sequelize.close();
    });

    it("should create a client", async() => {

        const facade = ClientAdmFacadeFactory.create();

        const input = {
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

        await facade.add(input);

        const result = await ClientModel.findOne({
            where: {
                id: "1"
            },
            raw: true
        })

        expect(result.id).toEqual(input.id);
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


    it("should find a client", async() => {

        const facade = ClientAdmFacadeFactory.create();

        const client = {
            id: "1",
            name: "Client 1",
            email: "x@x.com",
            document: "Doc 1",
            street: "Street 1",
            number: 1,
            complement: "Comp 1",
            city: "City 1",
            state: "State 1",
            zipCode: "Zip 1",
            createdAt: new Date(),
            updatedAt: new Date()
        }

        await ClientModel.create(client);

        const input = {
            id: client.id
        }

        const result = await facade.find(input)

        expect(result.id).toEqual(client.id);
        expect(result.name).toEqual(client.name);
        expect(result.email).toEqual(client.email);
        expect(result.document).toEqual(client.document);
        expect(result.street).toEqual(client.street);
        expect(result.number).toEqual(client.number);
        expect(result.complement).toEqual(client.complement);
        expect(result.city).toEqual(client.city);
        expect(result.state).toEqual(client.state);
        expect(result.zipCode).toEqual(client.zipCode);
        expect(new Date(result.createdAt)).toStrictEqual(client.createdAt);
        expect(new Date(result.updatedAt)).toStrictEqual(client.updatedAt);

        
    })

})