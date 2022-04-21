import { Col, Space, Typography } from 'antd';
import React from 'react';
import useFetch from 'react-fetch-hook';
import { AccountType, SetAccountType } from '../../utils/types';
import Loading from '../common/Loading';
import Account from './Account';

type AccountsSelectionProps = {
  setAccount: SetAccountType;
};

function AccountsSelection({ setAccount }: AccountsSelectionProps) {
  const { isLoading, data: accounts } = useFetch<AccountType[]>('/api/accounts');

  return (
    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography.Title>Select an Account</Typography.Title>
      {isLoading && <Loading />}
      <Space style={{ display: 'flex', flexDirection: 'column' }}>
        {accounts &&
          accounts.map((account) => {
            const { name, id } = account;
            return (
              <Account name={name} subtitle={id} onClick={() => setAccount(account)} key={id} />
            );
          })}
      </Space>
    </Col>
  );
}

export default AccountsSelection;
