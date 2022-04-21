import { Button } from 'antd';
import React, { useEffect } from 'react';
import useFetch from 'react-fetch-hook';
import {
  AccountType,
  ConversationsResponseType,
  SetAccountType,
  SetConversationType
} from '../../../utils/types';
import Loading from '../../common/Loading';

type ConversationsNavigationProps = {
  account: AccountType;
  setCurrAccount: SetAccountType;
  setCurrConversation: SetConversationType;
};

export default function ConversationsNavigation({
  account,
  setCurrAccount,
  setCurrConversation
}: ConversationsNavigationProps) {
  const { isLoading, data: conversationsResponse } = useFetch<ConversationsResponseType>(
    `/api/account/${account.id}/conversations`
  );

  useEffect(() => {
    if (conversationsResponse !== undefined) {
      setCurrConversation(conversationsResponse.rows[0]);
    }
  }, [conversationsResponse]);

  if (isLoading) return <Loading />;
  return (
    <>
      <Button onClick={() => setCurrAccount(undefined)}>Back</Button>
      <h2>Hello {account.name}</h2>
      <div>{JSON.stringify(conversationsResponse, undefined, 2)}</div>
    </>
  );
}
