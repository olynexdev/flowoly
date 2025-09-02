export interface TPayment {
  transactionId: string;
  email: string;
  name: string;
  amount: number;
  currency: string;
  status: string;
  slug: string;
  template: string;
}
