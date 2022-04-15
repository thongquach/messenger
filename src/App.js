import { useState } from 'react';
import AccountsSelection from './components/accountsSelection';
import Conversations from './components/conversations';

function App() {
  const [accountId, setAccountId] = useState();

  if (accountId == null) return <AccountsSelection setAccountId={setAccountId} />;
  return <Conversations accountId={accountId} setAccountId={setAccountId} />;
}

export default App;
