import { Sequelize } from "sequelize-typescript";
import { app } from "../express";
import request from 'supertest';
import { Umzug } from "umzug";
import { migrator } from "./config-migrations/migrator";
import { ClientModel } from "../../../modules/client-adm/repository/client.model";


describe("E2E test for client", () => {


    let sequelize: Sequelize

    let migration: Umzug<any>

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ":memory:",
            logging: false
        })
          
        sequelize.addModels([ClientModel])
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

    it("should create a client", async() => {
        const input = {
            id: "1",
            name: "Name 1",
            email: "Email 1",
            document: "Document 1",
            street: "Street 1",
            number: 100,
            complement: "Complement 1",
            city: "City 1",
            state: "State 1",
            zipCode: "Zip 1"
        }

        const response = await request(app)
            .post("/clients")
            .send(input);
        

        expect(response.status).toBe(200);
        expect(response.body.id).toBeDefined();
        expect(response.body.name).toBe("Name 1");
        expect(response.body.email).toBe("Email 1");
        expect(response.body.document).toBe("Document 1");
        expect(response.body.street).toBe("Street 1");
        expect(response.body.number).toBe(100);
        expect(response.body.complement).toBe("Complement 1");
        expect(response.body.city).toBe("City 1");
        expect(response.body.state).toBe("State 1");
        expect(response.body.zipCode).toBe("Zip 1");

    })
})