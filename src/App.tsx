import React, { useState } from 'react';
import './App.css';
import AccountsSelection from './components/accountsSelection';
import Conversations from './components/conversations';
import { AccountType, ConversationType } from './utils/types';

function App() {
  const [currAccount, setCurrAccount] = useState<AccountType | undefined>();
  const [currConversation, setCurrConversation] = useState<ConversationType | undefined>();

  if (currAccount === undefined) return <AccountsSelection setCurrAccount={setCurrAccount} />;
  return (
    <Conversations
      account={currAccount}
      conversation={currConversation}
      setCurrAccount={setCurrAccount}
      setCurrConversation={setCurrConversation}
    />
  );
}

export default App;
