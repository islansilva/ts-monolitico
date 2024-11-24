import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import StoreCatalogFacadeInterface, { FindAllStoreCatalogFacadeOutputDto, FindStoreCatalogFacadeInputDto, FindStoreCatalogFacadeOutDto } from "./store-catalog.facade.interface";

export interface UseCaseProps {
    findUseCase: UseCaseInterface,
    findAllUseCase: UseCaseInterface
}

export default class StoreCatalogFacade implements StoreCatalogFacadeInterface {
    private _findUseCase: UseCaseInterface;
    private _findAllUseCase: UseCaseInterface;
    
    constructor(props: UseCaseProps) {
        this._findUseCase = props.findUseCase
        this._findAllUseCase = props.findAllUseCase
    }


    async find(id: FindStoreCatalogFacadeInputDto): Promise<FindStoreCatalogFacadeOutDto> {
        return await this._findUseCase.execute({productId: id.id});
    }

    async findAll(): Promise<FindAllStoreCatalogFacadeOutputDto> {
        return await this._findAllUseCase.execute({});
    }
    
}