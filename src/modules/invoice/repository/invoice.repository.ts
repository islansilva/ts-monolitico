import Id from "../../@shared/domain/value-object/id.value-object";
import InvoiceItems from "../domain/invoice-items.entity";
import Invoice from "../domain/invoice.entity";
import { InvoiceGateway } from "../gateway/invoice.gateway";
import Address from "../value-object/address";
import InvoiceItemModel from "./invoice-item.model";
import InvoiceModel from "./invoice.model";

export default class InvoiceRepository implements InvoiceGateway {

    async generate(invoice: Invoice): Promise<void> {
        await InvoiceModel.create({
            id: invoice.id.id,
            name: invoice.name,
            document: invoice.document,
            street: invoice.address.street,
            number: invoice.address.number,
            complement: invoice.address.complement,
            city: invoice.address.city,
            state: invoice.address.state,
            zipCode: invoice.address.zip,
            items: invoice.items.map(item => ({
                id: item.id.id,
                name: item.name,
                price: item.price,
                createdAt: item.createdAt,
                updatedAt: item.updatedAt,
            })),
            createdAt: invoice.createdAt,
            updatedAt: invoice.updatedAt
        }, {
            include: [{model: InvoiceItemModel}]
        })
    }

    async find(id: string): Promise<Invoice> {

        const result = (await InvoiceModel.findOne({
            where: {
                id: id
            },
            include: [
                {
                    model: InvoiceItemModel,
                    as: "items",
                }
            ],
            rejectOnEmpty: true
        })).dataValues;

        const invoiceItems = result.items.map( (item: InvoiceItemModel) => {
            return new InvoiceItems({
                id: new Id(item.dataValues.id),
                name: item.dataValues.name,
                price: item.dataValues.price,
                createdAt: item.dataValues.createdAt,
                updatedAt: item.dataValues.updatedAt
            })
        })

        const address = new Address ({
            street: result.street,
            number: result.number,
            complement: result.complement,
            city: result.city,
            state: result.state,
            zip: result.zipCode
        })

        return new Invoice({
            id: new Id(result.id),
            name: result.name,
            document: result.document,
            address: address,
            items: invoiceItems,
            createdAt: result.createdAt,
            updatedAt: result.updatedAt

        })

        
        
    }

}