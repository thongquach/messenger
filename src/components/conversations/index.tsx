import React from 'react';
import { AccountType, SetAccountType } from '../../utils/types';
import ConversationsNavigation from './navigation';
import Chat from './chat';
import { StyledConversationsContainer } from './StyledConversations';

type ConversationsProps = {
  account: AccountType;
  setAccount: SetAccountType;
};

function Conversations({ account, setAccount }: ConversationsProps) {
  return (
    <StyledConversationsContainer>
      <ConversationsNavigation account={account} setAccount={setAccount} />
      <Chat />
    </StyledConversationsContainer>
  );
}

export default Conversations;
