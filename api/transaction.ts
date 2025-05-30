import instance from ".";

export interface Transaction {
  _id: string;
  date: string; // e.g. ISO string
  amount: number;
  type: "deposit" | "withdraw" | "transfer";
  createdAt: string; // if your backend returns these
  updatedAt: string;
  // …any other fields your server returns
}

const getMyTransaction = async () => {
  const { data } = await instance.get("/mini-project/api/transactions/my");
  return data;
};

const depositMyAcccount = async (amount: number) => {
  const { data } = await instance.put(
    "/mini-project/api/transactions/deposit",
    { amount }
  );
  return data;
};

const withdraw = async (amount: number) => {
  const { data } = await instance.put(
    "/mini-project/api/transactions/withdraw",
    { amount }
  );
  return data;
};

const transfer = async (username: string, amount: number) => {
  const { data } = await instance.put(
    `/mini-project/api/transactions/transfer/${username}`,
    {
      amount,
    }
  );
  return data;
};

export { depositMyAcccount, getMyTransaction, transfer, withdraw };
