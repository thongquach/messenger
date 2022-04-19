import React, { useState } from 'react';
import AccountsSelection from './components/accountsSelection';
import Conversations from './components/conversations';
import { AccountType } from './utils/types';

function App() {
  const [currAccount, setCurrAccount] = useState<AccountType | undefined>();

  if (currAccount === undefined) return <AccountsSelection setCurrAccount={setCurrAccount} />;
  return <Conversations account={currAccount} setCurrAccount={setCurrAccount} />;
}

export default App;
