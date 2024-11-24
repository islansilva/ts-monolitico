import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import { InvoiceGateway } from "../../gateway/invoice.gateway";
import { FindInvoiceUseCaseInputDTO, FindInvoiceUseCaseOutputDTO } from "./find-invoice.dto";

export default class FindInvoiceUseCase implements UseCaseInterface {

    constructor(private invoiceGateway: InvoiceGateway) {}

    async execute(input: FindInvoiceUseCaseInputDTO): Promise<FindInvoiceUseCaseOutputDTO> {
        const result = await this.invoiceGateway.find(input.id);

        return {
            id: result.id.id,
            name: result.name,
            document: result.document,
            address: {
                street: result.address.street,
                number: result.address.number,
                complement: result.address.complement,
                zipCode: result.address.zip,
                city: result.address.city,
                state: result.address.state,
            },
            items: result.items.map(item => ({
                id: item.id.id,
                name: item.name,
                price: item.price
            })),
            total: result.totalInvoice(),
            createdAt: result.createdAt
        }
    }
    
}