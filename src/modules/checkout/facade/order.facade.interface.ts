export interface PlaceOrderFacadeInputDto {
    clientId: string;
    products: {
        productId: string;
    } [];
}

export interface PlaceOrderFacadeOutputDto {
    id: string;
    invoiceId: string;
    status: string;
    total: number;
    products: {
        productId: string;
    } [];
}


export default interface OrderFacadeInterface {
    generate(input: PlaceOrderFacadeInputDto): Promise<PlaceOrderFacadeOutputDto>;
}