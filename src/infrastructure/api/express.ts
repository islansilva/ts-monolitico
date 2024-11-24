import express, { Express } from "express";
import { productRoute } from "./routes/product.route";
import { clientRoute } from "./routes/client.route";
import { orderRoute } from "./routes/checkout.route";
import { invoiceRoute } from "./routes/invoice.route";
import { Sequelize } from "sequelize-typescript"
import ProductModel from "../../modules/product-adm/repository/product.model"
import CatalogProductModel from "../../modules/store-catalog/repository/product.model"
import { ClientModel } from "../../modules/client-adm/repository/client.model"
import InvoiceModel from "../../modules/invoice/repository/invoice.model"
import OrderModel from "../../modules/checkout/repository/order.model"
import InvoiceItemModel from "../../modules/invoice/repository/invoice-item.model"
import { OrderClientModel } from "../../modules/checkout/repository/order-client.model"
import OrderProductModel from "../../modules/checkout/repository/order-products.model"
import TransactionModel from "../../modules/payment/repository/transaction.model"

export const app: Express = express();
app.use(express.json());
app.use("/products", productRoute);
app.use("/clients", clientRoute);
app.use("/checkout", orderRoute);
app.use("/invoice", invoiceRoute);


export let sequelize: Sequelize

async function setUpDb() {
    sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
    });
    await sequelize.addModels([OrderModel, OrderProductModel, OrderClientModel, ClientModel, InvoiceModel, InvoiceItemModel, TransactionModel, ProductModel, CatalogProductModel]);
    await sequelize.sync();
}

setUpDb();