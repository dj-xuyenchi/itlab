import "./style.css";
import MenuAdmin from "../layout/menu/MenuAdmin";
import Header from "../layout/header/Header";
import ThongKeBar from "./chart/ThongKeBar";
import { Col, Row, Select } from "antd";
import BanhDonut from "./chart/BanhDonut";
import BanhDonut2 from "./chart/BanhDonut2";
import NgayThang from "./chart/NgayThang";
// import React, { useRef, useState } from 'react';
import React, { useEffect, useState } from 'react';
import { Input, Space, Table } from 'antd';
import axios from 'axios';
import { } from '@ant-design/icons';

function DashBoard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedFilters, setSelectedFilters] = useState([]);


  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 6, // Adjust as needed
  });

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8089/api/thong-ke/san-pham-ban-chay1');
      console.log('API Response:', response.data);

      // Assuming response.data is an array of arrays
      setData(response.data.map(item => ({
        idCTSP: item[0],
        tenSanPham: item[1],
        image: item[2],
        tongSoLuong: item[3],
        giaNhap: item[4],
        giaBan: item[5],


        // Add more properties as needed
      })));

      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pagination]);

  const handleTableChange = (pagination, filters, sorter) => {
    // Handle other table change events if needed (filters, sorter)
    setPagination(pagination);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'idCTSP',
      key: 'idCTSP',
    },
    {
      title: 'Tên Sản Phẩm',
      dataIndex: 'tenSanPham',
      key: 'tenSanPham',
    },
    {
      title: 'Hình Ảnh',
      dataIndex: 'image',
      render: (image) => (
        <img src={image} style={{ width: '120px', height: '180px' }} alt="Product" />
      ),
      key: 'image',
    },
    {
      title: 'Tổng Số Lượng',
      dataIndex: 'tongSoLuong',
      key: 'tongSoLuong',
    },
    {
      title: 'Giá Nhập',
      dataIndex: 'giaNhap',
      key: 'giaNhap',
    },
    {
      title: 'Giá Bán',
      dataIndex: 'giaBan',
      key: 'giaBan',
    },
  ];
  // 
  


  return (
    <>
      <div>
        <Header />
        <MenuAdmin />
        <div className="body-container" >
          <div className="content">
            <Row style={{
              backgroundColor: "#ffffff",
              padding: "12px 12px"
            }}>
              <ThongKeBar />
            </Row>
            <Row style={{
              marginTop: "12px"
            }}>
              <div style={{
                width: "49%",
                backgroundColor: "#ffffff"
              }}>
                <BanhDonut />
              </div>

              <div style={{
                width: "49%",
                marginLeft: "2%", backgroundColor: "#ffffff"
              }}>

                <BanhDonut2 />
              </div>
            </Row>



            <div style={{
              marginTop: "12px",
              width: "100%",
              backgroundColor: "#ffffff",
              padding: "12px 12px"
            }}>
              <Row style={{
                marginBottom: "10px"
              }}>
                <Col span={12}>

                  {/* <Space
                    style={{
                      width: '100%',
                    }}
                    direction="horizontal"
                  >
                    Filter
                    <Select
                      mode="multiple"
                      size="large"
                      allowClear
                      style={{
                        width: '400px',
                      }}
                      placeholder="Cài đặt hiển thị"
                    // onChange={handleChange}
                    // options={options}
                    />
                  </Space> */}
                  {/* <Select
                    mode="multiple"
                    size="large"
                    allowClear
                    style={{ width: '400px' }}
                    placeholder="Cài đặt hiển thị"
                    value={selectedFilters}
                    onChange={value => setSelectedFilters(value)}
                  /> */}



                </Col>
                <Col span={2}></Col>
                <Col span={10}>
                  <Space
                    style={{
                      width: '100%',
                      display: "flex",
                      justifyContent: "flex-end"
                    }}
                    direction="horizontal"
                  >
                  </Space>
                </Col>
              </Row>



              <div>
                <div>
                  <div style={{ marginTop: '12px', width: '100%', backgroundColor: '#ffffff', padding: '12px 12px' }}>
                    <Table
                      pagination={{
                        ...pagination,
                        position: ['bottomCenter'],
                        showSizeChanger: true,
                        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                        pageSizeOptions: [6, 12, 18], // Customize available page sizes
                      }}
                      columns={columns}
                      dataSource={data}
                      loading={loading}
                      onChange={handleTableChange}
                    />
                  </div>
                </div>
              </div>

              <NgayThang />


            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashBoard;
