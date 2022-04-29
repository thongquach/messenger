import React from 'react';
import { Col, Row } from 'antd';
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
  conversation?: ConversationType;
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
      <Col span={8}>
        <ConversationsNavigation
          account={account}
          conversation={conversation}
          setCurrAccount={setCurrAccount}
          setCurrConversation={setCurrConversation}
        />
      </Col>
      <Col span={16}>
        <Chat account={account} conversation={conversation} />
      </Col>
    </Row>
  );
}

export default Conversations;
