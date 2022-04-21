import { List } from 'antd';
import React from 'react';
import formatTime from '../../../utils/timeFormat';
import InitialsAvatar from '../../common/InitialsAvatar';

type ConversationProps = {
  name: string;
  text: string;
  createdAt: string;
  active?: boolean;
  onClick: () => void;
};

export default function Conversation({
  name,
  text,
  createdAt,
  onClick,
  active
}: ConversationProps) {
  return (
    <List.Item
      onClick={onClick}
      extra={formatTime(createdAt)}
      style={{ cursor: 'pointer', background: active ? '#f0f0f0' : 'transparent' }}>
      <List.Item.Meta avatar={<InitialsAvatar name={name} />} title={name} description={text} />
    </List.Item>
  );
}
