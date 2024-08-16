import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import UpdateCustomerUseCase from "./update.customer.usecase";

const customer = CustomerFactory.createWithAddress(
  "Customer 1",
  new Address("Street 1", 1, "Zipcode 1", "City 1")
);

const input = {
  id: customer.id,
  name: "Customer 1 updated",
  address: {
    street: "Street 1 updated",
    number: 1999999,
    zipcode: "Zipcode 1 updated",
    city: "City 1 updated",
  },
};

const MockCustomerRepository = () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
  };
};

describe("unit test for customer update", () => {
  it("should update a customer", async () => {
    const customerRepository = MockCustomerRepository();
    const usecase = new UpdateCustomerUseCase(customerRepository);
    const output = await usecase.execute(input);
    expect(output).toEqual(input);
  });
});
