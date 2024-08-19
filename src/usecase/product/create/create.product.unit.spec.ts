import CreateProductUseCase from "./create.product.usecase";

const input = {
  name: "Product 1",
  price: 10,
};

const MockProductRepository = () => {
  return {
    create: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn(),
    update: jest.fn(),
  };
};

describe("unit test for product create", () => {
  it("should create a product", async () => {
    const productRepository = MockProductRepository();
    const usecase = new CreateProductUseCase(productRepository);
    const output = await usecase.execute(input);
    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price,
    });
  });

  it("should throw an error when name is missing", async () => {
    const productRepository = MockProductRepository();
    const usecase = new CreateProductUseCase(productRepository);
    input.name = "";
    await expect(usecase.execute(input)).rejects.toThrow("Name is required");
  });
});
