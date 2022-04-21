import React, { useState } from 'react';
import { Col, Divider, Row, Input, Button } from 'antd';
import useFetch from 'react-fetch-hook';
import createTrigger from 'react-use-trigger';
import useTrigger from 'react-use-trigger/useTrigger';
import {
  AccountType,
  ConversationType,
  SetAccountType,
  SetConversationType
} from '../../utils/types';
import ConversationsNavigation from './navigation';
import Chat from './chat';

const requestTrigger = createTrigger();

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
  const [value, setValue] = useState('');
  const [submit, setSubmit] = useState(false);
  const requestTriggerValue = useTrigger(requestTrigger);
  const requestOptions = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ text: value })
  };
  const handleSubmit = () => {
    if (!value) {
      return;
    }
    setSubmit(true);

    setTimeout(() => {
      setSubmit(false);
      setValue('');
      requestTrigger();
    }, 1000);
  };
  if (conversation) {
    useFetch(
      `/api/account/${account.id}/conversation/${conversation.id}/messages`,
      requestOptions,
      {
        depends: [submit]
      }
    );
  }

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
        <Chat account={account} conversation={conversation} submit={requestTriggerValue} />
        <Input onChange={(e) => setValue(e.target.value)} value={value} />
        <Button onClick={handleSubmit}>Send</Button>
      </Col>
    </Row>
  );
}

export default Conversations;
