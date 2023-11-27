import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Image,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Space,
  Table,
  Tag,
  Tooltip,
  notification,
} from "antd";
import { RiRefundLine } from "react-icons/ri";
import TextArea from "antd/es/input/TextArea";

function YeuCauDoiTra({ hoaDonId }) {
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (type, title, des, placement) => {
    if (type === "error") {
      api.error({
        message: title,
        description: des,
        placement,
      });
    } else {
      api.success({
        message: title,
        description: des,
        placement,
      });
    }
  };

  const dispath = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const columns = [
    {
      title: "Sản phẩm",
      dataIndex: "tenSanPham",
      render: (text) => <a>{text}</a>,
      width: "25%",
    },
    {
      title: "Số lượng",
      dataIndex: "soLuong",
      width: "10%",
    },
    {
      title: "Đơn giá",
      dataIndex: "donGia",
      width: "10%",
    },
    {
      title: "Tổng tiền",
      dataIndex: "tongTien",
      width: "10%",
    },
    {
      title: "Ghi chú",
      dataIndex: "ghiChu",
      render: () => <TextArea rows={4} />,
      width: "20%",
    },
    {
      title: "Hiện trạng sản phẩm",
      dataIndex: "hienTrangSanPham",
      render: () => (
        <Select
          defaultValue="lucy"
        
          onChange={null}
          options={[
            {
              value: "jack",
              label: "Sản phẩm lỗi",
            },
            {
              value: "lucy",
              label: "Sản phẩm đổi trả",
            },
          ]}
        />
      ),
      width: "10%",
    },
    {
      title: "Hình thức đổi trả",
      dataIndex: "action",
      render: () => (
        <>
          <Select
            defaultValue="lucy"
          
            onChange={null}
            options={[
              {
                value: "jack",
                label: "Đổi trả",
              },
              {
                value: "lucy",
                label: "Hoàn tiền",
              },
            ]}
          />
          <Button
            style={{
              marginLeft: "4px",
            }}
            type="primary"
          >
            Chọn sản phẩm
          </Button>
        </>
      ),
      width: "15%",
    },
  ];
  const data = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
    },
  ];
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      // Column configuration not to be checked
      name: record.name,
    }),
  };
  async function handleDoiTra() {}
  return (
    <>
      {contextHolder}
      <Tooltip title="Đổi trả">
        <Button
          style={{
            color: "blue",
            marginLeft: "4px",
          }}
          shape="circle"
          icon={<RiRefundLine />}
          onClick={() => {
            setIsModalOpen(true);
          }}
        />
      </Tooltip>
      <Modal
        width={"100vw"}
        open={isModalOpen}
        onOk={handleDoiTra}
        onCancel={() => {
          setIsModalOpen(false);
        }}
      >
        <Row>
          <h6>Thông tin sản phẩm</h6>
        </Row>
        <Row
          style={{
            marginTop: "24px",
          }}
        >
          <Col span={24}>
            <Table
              rowSelection={{
                type: "checkbox",
                ...rowSelection,
              }}
              columns={columns}
              dataSource={data}
            />
          </Col>
        </Row>
      </Modal>
    </>
  );
}

export default YeuCauDoiTra;
