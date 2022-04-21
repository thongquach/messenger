import { Avatar, Button, Space, Typography } from 'antd';
import React from 'react';
import getInitials from '../../utils/getInitials';
import { StyledAccountInfo } from './\bStyledAccountsSelection';

type AccountProps = {
  name: string;
  subtitle: string;
  onClick: () => void;
};

function Account({ name, subtitle, onClick }: AccountProps) {
  return (
    <Button
      onClick={onClick}
      style={{ height: '4em', width: '12em', display: 'flex', flexDirection: 'row' }}>
      <Space>
        <Avatar size="large">{getInitials(name)}</Avatar>
        <StyledAccountInfo>
          <Typography.Text strong>{name}</Typography.Text>
          <Typography>{subtitle}</Typography>
        </StyledAccountInfo>
      </Space>
    </Button>
  );
}

export default Account;
