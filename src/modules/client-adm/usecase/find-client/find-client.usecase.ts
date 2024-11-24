import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import ClientGateway from "../../gateway/client.gateway";
import { FindClientInputDto, FindClientOutputDto } from "./find-cliente.usecase.dto";

export default class FindClientUseCase implements UseCaseInterface {

    private _clientRepository: ClientGateway;

    constructor(clientRepository: ClientGateway) {
        this._clientRepository = clientRepository;
    }


    async execute(input: FindClientInputDto): Promise<FindClientOutputDto> {
        
        const result = await this._clientRepository.find(input.id);

        return {
            id: result.id.id,
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