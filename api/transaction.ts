import instance from ".";

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

const transfer = async (amount: number, username: string) => {
  const { data } = await instance.put(
    "/mini-project/api/transactions/transfer/<username>",
    {
      amount,
      username,
    }
  );
  return data;
};

export { depositMyAcccount, getMyTransaction, transfer, withdraw };
