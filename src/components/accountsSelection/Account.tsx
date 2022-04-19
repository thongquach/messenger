import React from 'react';
import { AccountType } from '../../utils/types';

type AccountProps = {
  account: AccountType;
  onClick: () => void;
};

function Account({ account, onClick }: AccountProps) {
  return (
    <button onClick={onClick}>
      <h4>{account.name}</h4>
      <p>{account.id}</p>
    </button>
  );
}

export default Account;
