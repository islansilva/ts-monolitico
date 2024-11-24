export interface FindAllProdutsDto {
    products: {
        id: string;
        name: string;
        description: string;
        salesPrice: number;
    }[];
}