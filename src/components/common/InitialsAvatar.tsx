import { Avatar, AvatarProps } from 'antd';
import React from 'react';
import getInitials from '../../utils/getInitials';

type InitialsAvatarProps = AvatarProps & {
  name: string;
};

function InitialsAvatar({ name, ...avatarProps }: InitialsAvatarProps) {
  return <Avatar {...avatarProps}>{getInitials(name)}</Avatar>;
}

export default InitialsAvatar;
