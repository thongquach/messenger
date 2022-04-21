import { Button, Card, Space } from 'antd';

import React, { useEffect } from 'react';

import useFetch from 'react-fetch-hook';
import {
  AccountType,
  ConversationsResponseType,
  ConversationType,
  SetAccountType,
  SetConversationType
} from '../../../utils/types';
import Account from '../../accountsSelection/Account';
import Loading from '../../common/Loading';
import Header from './Header';

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

  const getConversationDisplayName = (conversation: ConversationType): string => {
    const targetAccount = conversation?.participants.find(
      (participant) => participant.id !== account.id
    );
    return targetAccount?.name || '';
  };

  if (isLoading) return <Loading />;
  return (
    <Card
      title={
        <Header
          onBack={() => {
            setCurrAccount(undefined);
          }}
        />
      }>
      <Space direction="vertical">
        {conversationsResponse?.rows.map((conversation) => (
          <Account
            key={conversation.id}
            name={getConversationDisplayName(conversation)}
            subtitle={conversation.lastMessage.text}
            onClick={() => setCurrConversation(conversation)}
          />
        ))}
      </Space>
    </Card>
  );
}
