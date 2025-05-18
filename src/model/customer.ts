export class Customer {

  customer_id: string;
  name: string;
  address: string;
  cell: string;


  constructor(
    customer_id: string,
    name: string,
    addredd: string,
    cell: string,
    ) {
    this.customer_id = customer_id;
    this.name = name;
    this.address = addredd;
    this.cell = cell;
  }
}
