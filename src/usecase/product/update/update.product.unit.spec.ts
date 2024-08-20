import Product from "../../../domain/product/entity/product";
import UpdateProductUsecase from "./update.product.usecase";

const product = new Product("123", "Product 1", 10);

const input = {
  id: product.id,
  name: "Product 1 updated",
  price: 20,
};

const MockProductRepository = () => {
  return {
    update: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
  };
};

describe("unit test for product update", () => {
  it("should update a product", async () => {
    const productRepository = MockProductRepository();
    const usecase = new UpdateProductUsecase(productRepository);
    const output = await usecase.execute(input);
    expect(output).toEqual(input);
  });
});
