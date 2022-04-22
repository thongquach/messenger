import { Button, Card, Empty, Input, Space } from 'antd';
import React, { useReducer, useState } from 'react';
import useFetch from 'react-fetch-hook';
import { AccountType, ConversationType, MessageResponseType } from '../../../utils/types';
import Loading from '../../common/Loading';
import ChatTitle from './ChatTitle';
import Message from './Message';

/*
const ITEMS = [...Array(100)].map((_, index) => {
  return { id: `id-${index}`, displayName: `item ${index + 1}` };
});

function MyItem({ item }) {
  return <li className="item">{item.displayName}</li>;
}

function MyList({ items }) {
  return (
    <ul className="list">
      {items.map((item) => {
        return <MyItem key={item.id} item={item} />;
      })}
    </ul>
  );
}

function Chat() {
  const [items, appendItems] = useReducer((a, b) => a.concat(b), []);

  function wait(time) {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, time);
    });
  }

  async function loadMore() {
    const lastSeen = items[items.length - 1];
    const index = items.length === 0 ? -1 : ITEMS.findIndex((i) => i.id === lastSeen.id);

    const next = ITEMS.slice(index + 1, index + 10 + 1);
    await wait(1000);
    appendItems(next);
  }

  const { loadMoreRef, containerRef } = useInfinityScroll(loadMore);
  return (
    <div ref={containerRef}>
      <h1>loaded: {items.length} </h1>
      <MyList items={items} />
      {items.length < 1000 && (
        <em ref={loadMoreRef}>
          <Loading />
        </em>
      )}
    </div>
  );
}
*/

const MESSAGE_PAGE_SIZE = 3;

type ChatProps = {
  account: AccountType;
  conversation?: ConversationType;
};

function Chat({ account, conversation }: ChatProps) {
  if (conversation === undefined) return <Empty />;
  const receiver = conversation.participants.find((p) => p.id !== account.id);
  if (receiver === undefined) return <Empty />;

  const [currMessage, setCurrMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const requestOptions = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ text: currMessage })
  };
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

  useFetch(`/api/account/${account.id}/conversation/${conversation.id}/messages`, requestOptions, {
    depends: [isSubmitting]
  });

  const { isLoading, data: messagesResponse } = useFetch<MessageResponseType>(
    `/api/account/${account.id}/conversation/${conversation.id}/messages?pageSize=${MESSAGE_PAGE_SIZE}`,
    {
      depends: [!isSubmitting]
    }
  );
  if (isLoading) return <Loading />;

  return (
    <Card title={<ChatTitle sender={account.name} receiver={receiver.name} />}>
      <Space direction="vertical" style={{ width: '100%' }}>
        {messagesResponse !== undefined &&
          messagesResponse.rows.map((message) => (
            <Message
              message={message}
              key={message.id}
              isOwnMessage={account.id === message.sender.id}
            />
          ))}
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
