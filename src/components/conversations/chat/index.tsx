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

/* send message
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sendMessage = () => {
    if (!currMessage) {
      return;
    }
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setCurrMessage('');
    }, 1000);
  };

  useFetch(
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
      depends: [isSubmitting]
    }
  );
*/

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
  // const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [currMessage, setCurrMessage] = useState('');
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    setMessages([]);
  }, [receiver]);

  async function loadMore() {
    setShouldLoad(true);
  }

  const { data: messagesResponse } = useFetch<MessagesResponseType>(
    `/api/account/${account.id}/conversation/${conversation.id}/messages${
      prevCursor !== null ? `?cursor=${prevCursor}` : ''
    }`,
    { depends: [shouldLoad] }
  );

  useEffect(() => {
    if (messagesResponse === undefined) return;
    setMessages([...messages, ...messagesResponse.rows]);
    setPrevCursor(messagesResponse.cursor_prev || null);
    // setNextCursor(messagesResponse.cursor_next || null);
    setShouldLoad(false);
  }, [messagesResponse]);

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
          <Button type="primary">Send</Button>
        </Input.Group>
      </Space>
    </Card>
  );
}

export default Chat;
