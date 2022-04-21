import React from 'react';
import { Button, Row, Col, Input, Tooltip } from 'antd';
import { SearchOutlined, ArrowLeftOutlined } from '@ant-design/icons';

type NavigationHeaderProps = {
  onBack?: () => void;
};

export default function ConversationsNavigation({ onBack }: NavigationHeaderProps) {
  return (
    <Row>
      <Col span={4}>
        <Tooltip title="Back">
          <Button shape="circle" icon={<ArrowLeftOutlined />} onClick={onBack} />
        </Tooltip>
      </Col>
      <Col span={20}>
        <Input placeholder="Search" prefix={<SearchOutlined />} />
      </Col>
    </Row>
  );
}
