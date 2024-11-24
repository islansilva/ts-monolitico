import { Sequelize } from "sequelize-typescript";
import TransactionModel from "../repository/transaction.model";
import PaymentFacadeFactory from "../factory/payment.facade.factory";

describe("Payment Facade test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: {force: true}
        });

        sequelize.addModels([TransactionModel]);
        await sequelize.sync();
    });

    afterEach(async() => {
        await sequelize.close();
    });

    it("should save a Transaction", async() => {
        const facade = PaymentFacadeFactory.create();

        const input ={
            amount: 100,
            orderId: "1"
        };

        const result = await facade.process(input);

        expect(result.transactionId).toBeDefined();
        expect(result.status).toBe("approved");
        expect(result.amount).toBe(input.amount);
        expect(result.orderId).toBe(input.orderId);

    })


})