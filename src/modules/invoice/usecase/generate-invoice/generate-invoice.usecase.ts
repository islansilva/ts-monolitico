import Id from "../../../@shared/domain/value-object/id.value-object";
import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import InvoiceItems from "../../domain/invoice-items.entity";
import Invoice from "../../domain/invoice.entity";
import { InvoiceGateway } from "../../gateway/invoice.gateway";
import Address from "../../value-object/address";
import { GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto } from "./generate-invoice.dto";

export default class GenerateInvoiceUseCase implements UseCaseInterface {

    constructor(private invoiceRepository: InvoiceGateway) {}

    async execute(input: GenerateInvoiceUseCaseInputDto): Promise<GenerateInvoiceUseCaseOutputDto> {
        const invoice = new Invoice({
                id: new Id(),
                name: input.name,
                document: input.document,
                address: new Address({
                    street: input.street,
                    number: input.number,
                    complement: input.complement,
                    zip: input.zipCode,
                    city: input.city,
                    state: input.state
                }),
                items: input.items.map(item => {
                    return new InvoiceItems({
                        id: new Id(item.id),
                        name: item.name,
                        price: item.price
                    })
                })
        })

        await this.invoiceRepository.generate(invoice);

        return {
                id: invoice.id.id,
                name: invoice.name,
                document: invoice.document,
                street: invoice.address.street,
                number: invoice.address.number,
                complement: invoice.address.complement,
                zipCode: invoice.address.zip,
                city: invoice.address.city,
                state: invoice.address.state,
                items: invoice.items.map(item => ({
                    id: item.id.id,
                    name: item.name,
                    price: item.price
                })),
                total: invoice.totalInvoice()
        }


    }
    
}