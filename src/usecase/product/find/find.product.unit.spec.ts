import Product from "../../../domain/product/entity/product";
import FindProductUseCase from "./find.product.usecase";

const product = new Product("123", "Product 1", 10);

const MockProductRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit test find product use case", () => {
  it("should find a product", async () => {
    const productRepository = MockProductRepository();
    const usecase = new FindProductUseCase(productRepository);
    const output = await usecase.execute({ id: "123" });
    expect(output).toEqual({
      id: product.id,
      name: product.name,
      price: product.price,
    });
  });
});
