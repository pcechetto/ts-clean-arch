import ListProductUseCase from "./list.product.usecase";

const product1 = {
  id: "1",
  name: "Product 1",
  price: 10,
};
const product2 = {
  id: "2",
  name: "Product 2",
  price: 20,
};
const product3 = {
  id: "3",
  name: "Product 3",
  price: 30,
};

const MockProductRepository = () => {
  return {
    findAll: jest
      .fn()
      .mockReturnValue(Promise.resolve([product1, product2, product3])),
    find: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("unit test for product list", () => {
  it("should list all products", async () => {
    const productRepository = MockProductRepository();
    const usecase = new ListProductUseCase(productRepository);
    const output = await usecase.execute();
    expect(output.products.length).toBe(3);
    expect(output.products[0].id).toBe(product1.id);
    expect(output.products[1].id).toBe(product2.id);
    expect(output.products[2].id).toBe(product3.id);
    expect(output.products[0].name).toBe(product1.name);
    expect(output.products[1].name).toBe(product2.name);
    expect(output.products[2].name).toBe(product3.name);
    expect(output.products[0].price).toBe(product1.price);
    expect(output.products[1].price).toBe(product2.price);
    expect(output.products[2].price).toBe(product3.price);
  });
});
