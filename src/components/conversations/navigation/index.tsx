import { Button, Col } from 'antd';
import React from 'react';
import useFetch from 'react-fetch-hook';
import { AccountType, ConversationType, SetAccountType } from '../../../utils/types';
import Loading from '../../common/Loading';

type ConversationsNavigationProps = {
  account: AccountType;
  setAccount: SetAccountType;
};

export default function ConversationsNavigation({
  account,
  setAccount
}: ConversationsNavigationProps) {
  const { isLoading, data: conversations } = useFetch<ConversationType[]>(
    `/api/account/${account.id}/conversations`
  );

  if (isLoading) return <Loading />;
  return (
    <>
      <Button onClick={() => setAccount(undefined)}>Back</Button>
      <h2>Hello {account.name}</h2>
      <div>{JSON.stringify(conversations, undefined, 2)}</div>
    </>
  );
}
