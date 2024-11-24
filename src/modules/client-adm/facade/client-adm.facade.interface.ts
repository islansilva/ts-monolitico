export interface AddClientFacadeInputDto {
    id?: string;
    name: string;
    email: string;
    document: string;
    street: string;
    number: number;
    complement: string;
    city: string;
    state: string;
    zipCode: string;
}


export interface FindClientFacadeInputDto {
    id: string;
}

export interface FindClientFacadeOutputDto {
    id: string;
    name: string;
    email: string;
    document: string;
    street: string;
    number: number;
    complement: string;
    city: string;
    state: string;
    zipCode: string;
    createdAt: Date;
    updatedAt: Date;
}

export default interface ClientAdmFacadeInterface {
    add(client: AddClientFacadeInputDto): Promise<void>;
    find(id: FindClientFacadeInputDto): Promise<FindClientFacadeOutputDto>;
}