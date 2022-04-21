import React from 'react';
import useFetch from 'react-fetch-hook';
import { AccountType, SetAccountType } from '../../../utils/types';
import Loading from '../../common/Loading';
import { StyledNavigationContainer } from './StyledNavigation';

type ConversationsNavigationProps = {
  account: AccountType;
  setAccount: SetAccountType;
};

export default function ConversationsNavigation({
  account,
  setAccount
}: ConversationsNavigationProps) {
  const { isLoading, data: conversations } = useFetch(`/api/account/${account.id}/conversations`);

  if (isLoading) return <Loading />;
  return (
    <StyledNavigationContainer>
      <button onClick={() => setAccount(undefined)}>Back</button>
      <h2>Hello {account.name}</h2>
      <p>{JSON.stringify(conversations, undefined, 2)}</p>
    </StyledNavigationContainer>
  );
}
