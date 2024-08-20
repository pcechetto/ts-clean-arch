import express, { Request, Response } from "express";
import CustomerRepository from "../../customer/repository/sequelize/customer.repository";
import CreateCustomerUsecase from "../../../usecase/customer/create/create.customer.usecase";

export const customerRoute = express.Router();

customerRoute.post("/", async (req: Request, res: Response) => {
  const usecase = new CreateCustomerUsecase(new CustomerRepository());
  try {
    const customerDto = {
      name: req.body.name,
      address: {
        street: req.body.address.street,
        number: req.body.address.number,
        city: req.body.address.city,
        zipcode: req.body.address.zipcode,
      },
    };

    const output = await usecase.execute(customerDto);
    res.send(output);
  } catch (error) {
    res.status(500).send(error);
  }
});
