import { Button, Col, Row, Space, Typography } from 'antd';
import React from 'react';
import InitialsAvatar from '../common/InitialsAvatar';

type AccountProps = {
  name: string;
  subtitle: string;
  onClick: () => void;
};

function Account({ name, subtitle, onClick }: AccountProps) {
  return (
    <Button onClick={onClick} style={{ height: '4em', width: '12em' }}>
      <Space style={{ display: 'flex', flexDirection: 'row' }}>
        <InitialsAvatar size="large" name={name} />
        <Col style={{ textAlign: 'left' }}>
          <Row>
            <Typography.Text strong>{name}</Typography.Text>
          </Row>
          <Row>
            <Typography.Text>{subtitle}</Typography.Text>
          </Row>
        </Col>
      </Space>
    </Button>
  );
}

export default Account;
