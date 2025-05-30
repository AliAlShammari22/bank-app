export interface Transaction {
  _id: string;
  date: string;
  amount: number;
  type: "deposit" | "withdraw" | "transfer";
  createdAt: string;
  updatedAt: string;
}
