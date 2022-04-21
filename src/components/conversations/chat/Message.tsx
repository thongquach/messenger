import { Col, Row, Space, Typography } from 'antd';
import React from 'react';
import InitialsAvatar from '../../common/InitialsAvatar';

type MessageProps = {
  message: string;
  sender: string;
  isOwnMessage: boolean;
};

function Message({ message, sender, isOwnMessage }: MessageProps) {
  const avatar = <InitialsAvatar name={sender} size="large" />;
  const messageContent = (
    <Typography.Text
      style={{
        padding: '8px',
        borderRadius: '20px',
        backgroundColor: isOwnMessage ? 'blue' : 'gray',
        color: 'white'
      }}>
      {message}
    </Typography.Text>
  );

  return (
    <Row>
      <Space>
        {isOwnMessage ? (
          <>
            {messageContent}
            {avatar}
          </>
        ) : (
          <>
            {avatar}
            {messageContent}
          </>
        )}
      </Space>
    </Row>
  );
}

export default Message;
