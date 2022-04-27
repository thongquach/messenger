import { Space, Typography } from 'antd';
import React from 'react';
import { MessageType } from '../../../utils/types';
import InitialsAvatar from '../../common/InitialsAvatar';

type MessageProps = {
  message: MessageType;
  isOwnMessage: boolean;
};

function Message({ message, isOwnMessage }: MessageProps) {
  const { text, sender, createdAt } = message;
  const date = new Date(createdAt);

  return (
    <Space style={{ width: '100%', flexDirection: isOwnMessage ? 'row-reverse' : 'row' }}>
      <InitialsAvatar name={sender.name} size="large" />
      <Typography.Text
        style={{
          padding: '8px',
          borderRadius: '20px',
          backgroundColor: isOwnMessage ? 'deepskyblue' : 'dimgray',
          color: 'white'
        }}>
        {text}
      </Typography.Text>
      <Typography.Text
        style={{ color: 'dimgray' }}>{`${date.getHours()}:${date.getMinutes()}`}</Typography.Text>
    </Space>
  );
}

export default Message;
