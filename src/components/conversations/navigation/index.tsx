import { Card } from 'antd';

import React, { useEffect } from 'react';

import useFetch from 'react-fetch-hook';
import {
  AccountType,
  ConversationsResponseType,
  ConversationType,
  SetAccountType,
  SetConversationType
} from '../../../utils/types';
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

  const getConversationDisplayName = (conversation: ConversationType): string | undefined => {
    const targetAccount = conversation?.participants.find(
      (participant) => participant.id !== account.id
    );
    return targetAccount?.name;
  };

  useEffect(() => {
    if (conversationsResponse !== undefined) {
      setCurrConversation(conversationsResponse.rows[0]);
    }
  }, [conversationsResponse]);

  if (isLoading) return <Loading />;
  return (
    <div>
      <Card
        title={
          <Header
            onBack={() => {
              setCurrAccount(undefined);
            }}
          />
        }>
        {conversationsResponse?.rows.map((conversation) => (
          <p key={conversation.id}>{getConversationDisplayName(conversation)}</p>
        ))}
      </Card>
    </div>
  );
}
