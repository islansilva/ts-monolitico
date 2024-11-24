import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import InvoiceFacadeInterface, { FindInvoiceFacadeInputDto, FindInvoiceFacadeOutputDto, GenerateInvoiceFacadeInputDto, GenerateInvoiceFacadeOutputDto } from "./invoice.facade.interface";

export default class InvoiceFacade implements InvoiceFacadeInterface {

    constructor(private _generateUseCase: UseCaseInterface,
        private _findUseCase: UseCaseInterface
    ) {}


    async generate(input: GenerateInvoiceFacadeInputDto): Promise<GenerateInvoiceFacadeOutputDto> {
        const generateUseCase = await this._generateUseCase.execute(input);

        return {
            id: generateUseCase.id,
            name: generateUseCase.name,
            document: generateUseCase.document,
            street: generateUseCase.street,
            number: generateUseCase.number,
            complement: generateUseCase.complement,
            zipCode: generateUseCase.zipCode,
            city: generateUseCase.city,
            state: generateUseCase.state,
            items: generateUseCase.items.map((item: any) => ({
                id: item.id,
                name: item.name,
                price: item.price
            })),
            total: generateUseCase.total
    }
    }

    async find(input: FindInvoiceFacadeInputDto): Promise<FindInvoiceFacadeOutputDto> {
        const findUseCase = await this._findUseCase.execute(input);

        return {
            id: findUseCase.id,
            name: findUseCase.name,
            document: findUseCase.document,
            address: {
                street: findUseCase.address.street,
                number: findUseCase.address.number,
                complement: findUseCase.address.complement,
                zipCode: findUseCase.address.zipCode,
                city: findUseCase.address.city,
                state: findUseCase.address.state,
            },
            items: findUseCase.items.map((item: any) => ({
                id: item.id,
                name: item.name,
                price: item.price
            })),
            total: findUseCase.total,
            createdAt: findUseCase.createdAt
    }
    }

}