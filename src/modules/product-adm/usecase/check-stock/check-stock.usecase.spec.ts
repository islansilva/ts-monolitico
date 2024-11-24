import Id from "../../../@shared/domain/value-object/id.value-object";
import CheckStockUseCase from "./check-stock.usecase";

const checkStockByProduct = {
    id: new Id("1"),
    name: "Product 1",
    description: "Product 1 Description",
    purchasePrice: 10,
    stock: 10
}

const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn().mockImplementation((productId) => {
            return productId === "1" ? Promise.resolve(checkStockByProduct) : Promise.reject(new Error(`Product with id ${productId} not found`));
        })
    };
};

describe("CheckStock usecase unit tests", () => {

    it("should search for product balance by id", async() => {

    const productRepository = MockRepository();
    const checkStockUseCase = new CheckStockUseCase(productRepository);

    const result = await checkStockUseCase.execute({
        productId: "1"
    });

    expect(productRepository.find).toHaveBeenCalled();
    expect(result.productId).toEqual("1");
    expect(result.stock).toEqual(10);

    });


    it("should not check the balance of a non existent product", async() => {

        const productRepository = MockRepository();
        const checkStockUseCase = new CheckStockUseCase(productRepository);
    

        await expect(checkStockUseCase.execute({productId: '2'}))
        .rejects
        .toThrowError(`Product with id 2 not found`);

        });

        

})