import React from 'react';
import { Col, Divider, Row } from 'antd';
import {
  AccountType,
  ConversationType,
  SetAccountType,
  SetConversationType
} from '../../utils/types';
import ConversationsNavigation from './navigation';
import Chat from './chat';

type ConversationsProps = {
  account: AccountType;
  setCurrAccount: SetAccountType;
  conversation: ConversationType;
  setCurrConversation: SetConversationType;
};

function Conversations({
  account,
  conversation,
  setCurrAccount,
  setCurrConversation
}: ConversationsProps) {
  return (
    <Row>
      <Col span={6}>
        <ConversationsNavigation
          account={account}
          setCurrAccount={setCurrAccount}
          setCurrConversation={setCurrConversation}
        />
      </Col>
      <Col span={2}>
        <Divider type="vertical" style={{ height: '100%' }} />
      </Col>
      <Col span={16}>
        <Chat account={account} conversation={conversation} />
      </Col>
    </Row>
  );
}

export default Conversations;
