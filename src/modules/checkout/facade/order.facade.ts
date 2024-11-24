import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import OrderFacadeInterface, { PlaceOrderFacadeInputDto, PlaceOrderFacadeOutputDto } from "./order.facade.interface";

export default class OrderFacade implements OrderFacadeInterface {
    
    constructor(
        private _placeOrderUseCase: UseCaseInterface
    ) {}

    async generate(input: PlaceOrderFacadeInputDto): Promise<PlaceOrderFacadeOutputDto> {
        const placeOrderUseCase = await this._placeOrderUseCase.execute(input);
        return placeOrderUseCase;
    }

}