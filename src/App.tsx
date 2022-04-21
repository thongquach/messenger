import React, { useState } from 'react';
import './App.css';
import AccountsSelection from './components/accountsSelection';
import Conversations from './components/conversations';
import { AccountType } from './utils/types';

function App() {
  const [currAccount, setAccount] = useState<AccountType | undefined>();

  if (currAccount === undefined) return <AccountsSelection setAccount={setAccount} />;
  return <Conversations account={currAccount} setAccount={setAccount} />;
}

export default App;
