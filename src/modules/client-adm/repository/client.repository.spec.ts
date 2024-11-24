import { Sequelize } from "sequelize-typescript";
import { ClientModel } from "./client.model";
import ClientRepository from "./client.repository";
import Client from "../domain/client.entity";
import Id from "../../@shared/domain/value-object/id.value-object";

describe("Client Repository test", () => {

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

        const repository = new ClientRepository();

        const client = new Client({
                id: new Id("1"),
                name: "Client 1",
                email: "x@x.com",
                document: "Doc 1",
                street: "Street 1",
                number: 1,
                complement: "Comp 1",
                city: "City 1",
                state: "State 1",
                zipCode: "Zip 1"
        })

        await repository.add(client);

        const result = await ClientModel.findOne({
            where: {
                id: "1"
            },
            raw: true
        })

        expect(result.id).toEqual(client.id.id);
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


    it("should find a client", async() => {

        const repository = new ClientRepository();

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

        const result = await repository.find(client.id)

        expect(result.id.id).toEqual(client.id);
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