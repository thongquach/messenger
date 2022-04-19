import React from 'react';
import useFetch from 'react-fetch-hook';
import { AccountType } from '../../utils/types';
import Loading from '../common/Loading';
import Account from './Account';

function AccountsSelection({ setAccountId }) {
  const { isLoading, data: accounts } = useFetch<AccountType[]>('/api/accounts');

  if (isLoading) return <Loading />;
  return (
    <div>
      <h1>Select an Account</h1>
      {accounts &&
        accounts.map(({ id, name }) => (
          <Account name={name} id={id} key={id} onClick={() => setAccountId(id)} />
        ))}
    </div>
  );
}

export default AccountsSelection;
