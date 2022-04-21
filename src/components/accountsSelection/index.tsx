import { Typography } from 'antd';
import React from 'react';
import useFetch from 'react-fetch-hook';
import { AccountType, SetAccountType } from '../../utils/types';
import Loading from '../common/Loading';
import { StyledAccountsContainer } from './\bStyledAccountsSelection';
import Account from './Account';

type AccountsSelectionProps = {
  setAccount: SetAccountType;
};

function AccountsSelection({ setAccount }: AccountsSelectionProps) {
  const { isLoading, data: accounts } = useFetch<AccountType[]>('/api/accounts');

  if (isLoading) return <Loading />;
  return (
    <StyledAccountsContainer>
      <Typography.Title>Select an Account</Typography.Title>
      {accounts &&
        accounts.map((account) => {
          const { name, id } = account;
          return <Account name={name} subtitle={id} key={id} onClick={() => setAccount(account)} />;
        })}
    </StyledAccountsContainer>
  );
}

export default AccountsSelection;
