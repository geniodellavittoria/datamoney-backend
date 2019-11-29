export interface Offer {
  id: string;
  expireDate: Date;
  price: number;
  ownerId: string;
  offeredData: string[];
  description: string;
}
