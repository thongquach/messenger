import React from 'react';
import useFetch from 'react-fetch-hook';
import { AccountType } from '../../utils/types';
import Loading from '../common/Loading';
import Account from './Account';

type AccountsSelectionProps = {
  setCurrAccount: (account: AccountType) => void;
};

function AccountsSelection({ setCurrAccount }: AccountsSelectionProps) {
  const { isLoading, data: accounts } = useFetch<AccountType[]>('/api/accounts');

  if (isLoading) return <Loading />;
  return (
    <div>
      <h1>Select an Account</h1>
      {accounts &&
        accounts.map((account) => (
          <Account account={account} key={account.id} onClick={() => setCurrAccount(account)} />
        ))}
    </div>
  );
}

export default AccountsSelection;
