// types.ts
export interface Transaction {
  _id: string;
  amount: number;
  type: "deposit" | "withdraw" | "transfer";
  //   from: string;
  //   to: string;
  createdAt: string;
  updatedAt: string;
  //   __v: number;
}
