import React from 'react';
import { Col, Divider, Row } from 'antd';
import { AccountType, SetAccountType } from '../../utils/types';
import ConversationsNavigation from './navigation';
import Chat from './chat';

type ConversationsProps = {
  account: AccountType;
  setAccount: SetAccountType;
};

function Conversations({ account, setAccount }: ConversationsProps) {
  return (
    <Row>
      <Col span={6}>
        <ConversationsNavigation account={account} setAccount={setAccount} />
      </Col>
      <Col span={2}>
        <Divider type="vertical" style={{ height: '100%' }} />
      </Col>
      <Col span={16}>
        <Chat />
      </Col>
    </Row>
  );
}

export default Conversations;
