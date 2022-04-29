import { Avatar, Space, Typography } from 'antd';
import React from 'react';
import InitialsAvatar from '../../common/InitialsAvatar';

type ChatTitleProps = {
  sender: string;
  receiver: string;
};

function ChatTitle({ sender, receiver }: ChatTitleProps) {
  return (
    <Space>
      <Avatar.Group>
        <InitialsAvatar name={sender} />
        <InitialsAvatar name={receiver} />
      </Avatar.Group>
      <Typography.Text>conversation between You and {receiver}</Typography.Text>
    </Space>
  );
}

export default ChatTitle;
