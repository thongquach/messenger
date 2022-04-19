import React, { useState } from 'react';
import AccountsSelection from './components/accountsSelection';
import Conversations from './components/conversations';

function App() {
  const [accountId, setAccountId] = useState<string>();

  if (accountId === undefined) return <AccountsSelection setAccountId={setAccountId} />;
  return <Conversations />;
}

export default App;
