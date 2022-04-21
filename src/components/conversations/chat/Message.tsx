import { Row, Typography } from 'antd';
import React from 'react';
import InitialsAvatar from '../../common/InitialsAvatar';

type MessageProps = {
  message: string;
  sender: string;
  isOwnMessage: boolean;
};

function Message({ message, sender, isOwnMessage }: MessageProps) {
  if (isOwnMessage)
    return (
      <Row>
        <Typography.Text>{message}</Typography.Text>
        <InitialsAvatar name={sender} />
      </Row>
    );

  return (
    <Row>
      <InitialsAvatar name={sender} />
      <Typography.Text>{message}</Typography.Text>
    </Row>
  );
}

export default Message;
