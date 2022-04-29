import { Button, Card, Empty, Input, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import useFetch from 'react-fetch-hook';

import {
  AccountType,
  ConversationType,
  MessagesResponseType,
  MessageType
} from '../../../utils/types';
import Loading from '../../common/Loading';
import Message from './Message';
import useInfinityScroll from '../../../utils/useInfinityScroll';
import ChatTitle from './ChatTitle';

type ChatProps = {
  account: AccountType;
  conversation?: ConversationType;
};

function Chat({ account, conversation }: ChatProps) {
  if (conversation === undefined) return <Empty />;
  const receiver = conversation.participants.find((p) => p.id !== account.id);
  if (receiver === undefined) return <Empty />;

  const [messages, setMessages] = useState<MessageType[]>([]);
  const [prevCursor, setPrevCursor] = useState<string | null>(null);

  const [currMessage, setCurrMessage] = useState('');
  const [shouldLoad, setShouldLoad] = useState(false);
  const [shouldSendMessage, setShouldSendMessage] = useState(false);

  const { data: messagesResponse } = useFetch<MessagesResponseType>(
    `/api/account/${account.id}/conversation/${conversation.id}/messages${
      prevCursor !== null ? `?cursor=${prevCursor}` : ''
    }`,
    { depends: [shouldLoad] }
  );

  const { data: sentMessage } = useFetch<MessageType>(
    `/api/account/${account.id}/conversation/${conversation.id}/messages`,
    {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: currMessage })
    },
    {
      depends: [shouldSendMessage]
    }
  );

  async function loadMore() {
    setShouldLoad(true);
  }

  const sendMessage = () => {
    if (!currMessage) {
      return;
    }
    setShouldSendMessage(true);
  };

  useEffect(() => {
    if (messagesResponse === undefined) return;
    setMessages([...messages, ...messagesResponse.rows]);
    setPrevCursor(messagesResponse.cursor_prev || null);
    setShouldLoad(false);
  }, [messagesResponse]);

  useEffect(() => {
    if (sentMessage === undefined) return;
    setMessages([sentMessage, ...messages]);
    setCurrMessage('');
    setShouldSendMessage(false);
  }, [sentMessage]);

  useEffect(() => {
    setMessages([]);
  }, [receiver]);

  const { loadMoreRef, containerRef } = useInfinityScroll(loadMore);

  return (
    <Card title={<ChatTitle sender={account.name} receiver={receiver.name} />}>
      <Space direction="vertical" style={{ width: '100%' }}>
        <div ref={containerRef} style={{ height: `calc(100vh - 200px)`, overflow: 'auto' }}>
          {messages.map((message) => {
            return (
              <Message
                message={message}
                key={message.id}
                isOwnMessage={account.id === message.sender.id}
              />
            );
          })}
          <em ref={loadMoreRef}>
            <Loading />
          </em>
        </div>
        <Input.Group compact style={{ marginTop: '10px' }}>
          <Input
            style={{ width: 'calc(100% - 65px)' }}
            onChange={(e) => setCurrMessage(e.target.value)}
            value={currMessage}
          />
          <Button type="primary" onClick={sendMessage}>
            Send
          </Button>
        </Input.Group>
      </Space>
    </Card>
  );
}

export default Chat;
