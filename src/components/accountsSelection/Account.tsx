import { Button } from 'antd';
import React from 'react';
import { AccountType } from '../../utils/types';

type AccountProps = {
  account: AccountType;
  onClick: () => void;
};

function Account({ account, onClick }: AccountProps) {
  return (
    <Button onClick={onClick}>
      <h4>{account.name}</h4>
      <p>{account.id}</p>
    </Button>
  );
}

export default Account;
