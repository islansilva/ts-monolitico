import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import ClientAdmFacadeInterface, { AddClientFacadeInputDto, FindClientFacadeInputDto, FindClientFacadeOutputDto } from "./client-adm.facade.interface";

export interface UseCaseFacadeProps {
    findUseCase: UseCaseInterface;
    addUseCase: UseCaseInterface;
}

export default class ClientAdmFacade implements ClientAdmFacadeInterface {

    private _addUseCase: UseCaseInterface;
    private _findUseCase: UseCaseInterface;

    constructor(useCaseProps: UseCaseFacadeProps) {
        this._addUseCase = useCaseProps.addUseCase;
        this._findUseCase = useCaseProps.findUseCase;
    }


    async add(client: AddClientFacadeInputDto): Promise<void> {
        const input = {
            id: client.id,
            name: client.name,
            email: client.email,
            document: client.document,
            street: client.street,
            number: client.number,
            complement: client.complement,
            city: client.city,
            state: client.state,
            zipCode: client.zipCode,
        }
        return await this._addUseCase.execute(input);
    }

    async find(id: FindClientFacadeInputDto): Promise<FindClientFacadeOutputDto> {
        const result = await this._findUseCase.execute({
            id: id.id
        });

        return {
            id: result.id,
            name: result.name,
            email: result.email,
            document: result.document,
            street: result.street,
            number: result.number,
            complement: result.complement,
            city: result.city,
            state: result.state,
            zipCode: result.zipCode,
            createdAt: result.createdAt,
            updatedAt: result.updatedAt
        }
    }

}