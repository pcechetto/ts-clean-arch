import { toXML } from "jstoxml";
import { OutputListCustomerDto } from "../../../usecase/customer/list/list.customer.dto";

export default class CustomerPresenter {
  static listXML(data: OutputListCustomerDto): string {
    const xmlOptions = {
      header: true,
      indent: "  ",
      newLine: "\n",
      allowEmpty: true,
    };

    return toXML(
      {
        customers: data.customers.map((customer) => ({
          customer: {
            id: customer.id,
            name: customer.name,
            address: {
              street: customer.address.street,
              city: customer.address.city,
              number: customer.address.number,
              zipcode: customer.address.zip,
            },
          },
        })),
      },
      xmlOptions
    );
  }
}
