import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import ProductAdmFacadeInterface, { AddProductFacadeInputDto, CheckStockFacadeInputDto, CheckStockFacadeOutputDto } from "./product-adm.facade.interface";

export interface UseCasesProps {
    addProductUseCase: UseCaseInterface;
    stockUseCase: UseCaseInterface;
}

export default class ProductAdmFacade implements ProductAdmFacadeInterface {

    private _addProductUseCase: UseCaseInterface;
    private _checkStockUseCase: UseCaseInterface;

    constructor(useCaseProps: UseCasesProps) {
        this._addProductUseCase = useCaseProps.addProductUseCase;
        this._checkStockUseCase = useCaseProps.stockUseCase;
    }
    
    addProduct(input: AddProductFacadeInputDto): Promise<void> {
        //Só é possível passar o input porque o Dto da facade é igual do caso de uso. Caso contrário, é necessário fazer a transformação.
        return this._addProductUseCase.execute(input);
    }

    checkStock(input: CheckStockFacadeInputDto): Promise<CheckStockFacadeOutputDto> {
        return this._checkStockUseCase.execute(input);
    }
    
}