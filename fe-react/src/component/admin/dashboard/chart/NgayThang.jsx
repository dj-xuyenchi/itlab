import React from 'react';
import CountUp from 'react-countup';
import { Col, Row, Statistic } from 'antd';

const formatter = function(value) {
  return <CountUp end={value} separator="," />;
};

function NgayThang() {
  return (
    <Row gutter={16}>
      <Col span={8}>
        <Statistic title="Doanh số trong ngày" value={112893} formatter={formatter} />
      </Col>
      <Col span={8}>
        <Statistic title="Doanh số trong tháng" value={112893} formatter={formatter} />
      </Col>
      <Col span={8}>
        <Statistic title="Doanh số trong năm" value={112893} precision={2} formatter={formatter} />
      </Col>
    </Row>
  );
}

export default NgayThang;

