import React, { ChangeEvent } from 'react';
import { Button, Row, Col, Input, Tooltip } from 'antd';
import { SearchOutlined, ArrowLeftOutlined } from '@ant-design/icons';

type NavigationHeaderProps = {
  onBack?: () => void;
  onSearch: (searchText: string) => void;
  searchText: string;
};

function Header({ onBack, onSearch, searchText }: NavigationHeaderProps) {
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };
  return (
    <Row>
      <Col span={4}>
        <Tooltip title="Back">
          <Button shape="circle" icon={<ArrowLeftOutlined />} onClick={onBack} />
        </Tooltip>
      </Col>
      <Col span={20}>
        <Input
          placeholder="Search"
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={onInputChange}
        />
      </Col>
    </Row>
  );
}

export default Header;
