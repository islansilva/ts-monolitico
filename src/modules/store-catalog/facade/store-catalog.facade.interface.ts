export interface FindStoreCatalogFacadeInputDto {
    id: string;
}

export interface FindStoreCatalogFacadeOutDto {
    id: string;
    name: string;
    description: string;
    salesPrice: number;
}

export interface FindAllStoreCatalogFacadeOutputDto {
    products: {
        id: string;
        name: string;
        description: string;
        salesPrice: number;
    }[];
}

export default interface StoreCatalogFacadeInterface {
    find(id: FindStoreCatalogFacadeInputDto): Promise<FindStoreCatalogFacadeOutDto>;
    findAll(): Promise<FindAllStoreCatalogFacadeOutputDto>;
}