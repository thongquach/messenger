import { Button } from 'antd';
import React, { useEffect } from 'react';
import useFetch from 'react-fetch-hook';
import {
  AccountType,
  ConversationsType,
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
  const { isLoading, data: conversations } = useFetch<ConversationsType>(
    `/api/account/${account.id}/conversations`
  );

  useEffect(() => {
    if (conversations !== undefined) {
      setCurrConversation(conversations.rows[0]);
    }
  }, [conversations]);

  if (isLoading) return <Loading />;
  return (
    <>
      <Button onClick={() => setCurrAccount(undefined)}>Back</Button>
      <h2>Hello {account.name}</h2>
      <div>{JSON.stringify(conversations, undefined, 2)}</div>
    </>
  );
}
