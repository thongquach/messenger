import { List } from 'antd';

import React, { useEffect, useCallback, useState } from 'react';

import useFetch from 'react-fetch-hook';
import {
  AccountType,
  ConversationsResponseType,
  ConversationType,
  SetAccountType,
  SetConversationType
} from '../../../utils/types';
import Loading from '../../common/Loading';
import Conversation from './Conversation';
import Header from './Header';

type ConversationsNavigationProps = {
  account: AccountType;
  setCurrAccount: SetAccountType;
  conversation?: ConversationType;
  setCurrConversation: SetConversationType;
};

const getConversationDisplayName =
  (partnerId: string) =>
  (item: ConversationType): string => {
    const targetAccount = item?.participants.find((participant) => participant.id !== partnerId);
    return targetAccount?.name || '';
  };

export default function ConversationsNavigation({
  account,
  conversation,
  setCurrAccount,
  setCurrConversation
}: ConversationsNavigationProps) {
  const { isLoading, data: conversationsResponse } = useFetch<ConversationsResponseType>(
    `/api/account/${account.id}/conversations`
  );

  const [searchText, setSearchText] = useState<string>('');

  const getDisplayName = useCallback(getConversationDisplayName(account.id), [account]);

  const getSearchedConversations = () => {
    if (!searchText) return conversationsResponse?.rows;
    return (conversationsResponse?.rows || []).filter((item) => {
      return getDisplayName(item).toLowerCase().includes(searchText.toLowerCase());
    });
  };

  useEffect(() => {
    if (conversationsResponse !== undefined) {
      setCurrConversation(conversationsResponse.rows[0]);
    }
  }, [conversationsResponse]);

  if (isLoading) return <Loading />;
  return (
    <div>
      <List
        header={
          <Header
            onBack={() => {
              setCurrAccount(undefined);
            }}
            onSearch={setSearchText}
            searchText={searchText}
          />
        }
        rowKey={(item) => item.id}
        bordered
        split
        dataSource={getSearchedConversations()}
        renderItem={(item) => (
          <Conversation
            key={item.id}
            name={getDisplayName(item)}
            text={item?.lastMessage?.text}
            onClick={() => setCurrConversation(item)}
            createdAt={item?.lastMessage?.createdAt}
            active={item.id === conversation?.id}
          />
        )}
      />
    </div>
  );
}
