export type AccountType = {
  name: string;
  id: string;
};

export type SetAccountType = (account: AccountType) => void;
