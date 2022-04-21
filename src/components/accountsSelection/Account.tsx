import { Avatar, Button, Col, Space, Typography } from 'antd';
import React from 'react';
import getInitials from '../../utils/getInitials';

type AccountProps = {
  name: string;
  subtitle: string;
  onClick: () => void;
};

function Account({ name, subtitle, onClick }: AccountProps) {
  return (
    <Button onClick={onClick} style={{ height: '4em', width: '12em' }}>
      <Space style={{ display: 'flex', flexDirection: 'row' }}>
        <Avatar size="large">{getInitials(name)}</Avatar>
        <Col style={{ textAlign: 'left' }}>
          <Typography.Text strong>{name}</Typography.Text>
          <Typography>{subtitle}</Typography>
        </Col>
      </Space>
    </Button>
  );
}

export default Account;
