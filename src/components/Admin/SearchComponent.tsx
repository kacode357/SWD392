import React, { useState } from 'react';
import { Input, Button, Row, Col } from 'antd';

interface SearchComponentProps {
  onSearch: (keyword: string) => void;
  onReset: () => void;
}

const SearchComponent: React.FC<SearchComponentProps> = ({ onSearch, onReset }) => {
  const [keyword, setKeyword] = useState<string>('');

  const handleSearch = () => {
    onSearch(keyword);
  };

  const handleReset = () => {
    setKeyword('');
    onReset();
  };

  return (
    <Row gutter={16} style={{ marginBottom: '16px' }}>
      <Col>
        <Input
          placeholder="Search by name or email"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onPressEnter={handleSearch} // Trigger search when Enter is pressed
        />
      </Col>
      <Col>
        <Button type="primary" onClick={handleSearch}>
          Search
        </Button>
      </Col>
      <Col>
        <Button onClick={handleReset}>
          Reset
        </Button>
      </Col>
    </Row>
  );
};

export default SearchComponent;
