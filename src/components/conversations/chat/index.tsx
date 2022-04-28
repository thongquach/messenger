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

const MESSAGE_PAGE_SIZE = 10;

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

  function loadMore() {
    setShouldLoad(true);
  }

  const { loadMoreRef, containerRef } = useInfinityScroll(loadMore);

  const { data: messagesResponse } = useFetch<MessagesResponseType>(
    `/api/account/${account.id}/conversation/${
      conversation.id
    }/messages?pageSize=${MESSAGE_PAGE_SIZE}&sort=NEWEST_FIRST${
      prevCursor !== null ? `&cursor=${prevCursor}` : ''
    }`,
    { depends: [shouldLoad] }
  );

  useEffect(() => {
    setMessages([]);
  }, [receiver]);

  useEffect(() => {
    if (messagesResponse === undefined) return;
    setMessages([...(messagesResponse?.rows.reverse() || []), ...messages]);
    setPrevCursor(messagesResponse?.cursor_prev || null);
    setShouldLoad(false);
  }, [messagesResponse]);

  return (
    <>
      <div ref={containerRef as any} style={{ height: '1000px', overflow: 'auto' }}>
        {/* <Card title={<ChatTitle sender={account.name} receiver={receiver.name}  />}> */}
        {/* <Space direction="vertical" style={{ width: '100%' }}> */}
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
        {/* </Space> */}
        {/* </Card> */}
      </div>
      <Input.Group compact style={{ marginTop: '10px' }}>
        <Input
          style={{ width: 'calc(100% - 65px)' }}
          onChange={(e) => setCurrMessage(e.target.value)}
          value={currMessage}
        />
        <Button type="primary">Send</Button>
      </Input.Group>
    </>
  );
}

export default Chat;
