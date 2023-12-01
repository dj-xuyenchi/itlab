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
import { useDoiTra } from "./useDoiTra";
import { fixMoney } from "../../../extensions/fixMoney";
import DoiSanPham from "./DoiSanPham";

function YeuCauDoiTra({ hoaDonId }) {
  const [api, contextHolder] = notification.useNotification();
  const [selectedChiTietHoaDon, setSelectedChiTietHoaDon] = useState(undefined);
  const [dataThayDoi, setDataThayDoi] = useState([])
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const columns = [
    {
      title: "Sản phẩm",
      dataIndex: "sanPhamChiTiet",
      render: (sanPhamChiTiet) => <>
        <div style={{
          display: 'flex'
        }}>

          <Image src={sanPhamChiTiet.hinhAnh} style={{
            width: "80px",
            height: "120px"

          }} />
          <span style={{
            marginLeft: "4px"
          }}>{sanPhamChiTiet.tenSanPham}</span>
        </div>
      </>
      ,
      width: "25%",
    },
    {
      title: "Số lượng",
      dataIndex: "soLuong",
      width: "15%",
      render: (soLuong, record, number) => <>
        <InputNumber min={1} max={soLuong} onChange={(e) => {
          dataThayDoi[number] = {
            ...dataThayDoi[number],
            soLuongDoi: e
          }
          setDataThayDoi([...dataThayDoi])
        }} />/{soLuong}
      </>,
    },
    {
      title: "Đơn giá",
      dataIndex: "donGia",
      width: "10%",
      render: (donGia) => <a>{fixMoney(donGia)}</a>,
    },
    {
      title: "Tổng tiền",
      dataIndex: "donGia",
      width: "10%",
      render: (donGia, record) => <a>{fixMoney(donGia * record.soLuong)}</a>,
    },
    {
      title: "Ghi chú",
      dataIndex: "ghiChu",
      render: (ghiChu, record, number) => <TextArea placeholder="Ghi chú" rows={4} onChange={(e) => {
        dataThayDoi[number] = {
          ...dataThayDoi[number],
          ghiChu: e.target.value
        }
        setDataThayDoi([...dataThayDoi])

      }} />,
      width: "20%",
    },
    {
      title: "Hiện trạng sản phẩm",
      dataIndex: "hienTrangSanPham",
      render: (ghiChu, record, number) =>
      (
        Array(dataThayDoi[number]?.soLuongDoi).fill().map((item) => {
          return <>
            <Select
              defaultValue="Hiện trạng sản phẩm"
              style={{
                width: "100%"
              }}
              onChange={(e) => {
                dataThayDoi[number] = { ...dataThayDoi[number], hienTrang: e }
                setDataThayDoi(dataThayDoi)
              }}
              options={[{ value: "1", label: "Sản phẩm lỗi", }, { value: "2", label: "Sản phẩm đổi trả", },]} />
          </>;
        })
      )
      ,
      width: "10%",
    },
    {
      title: "Hình thức đổi trả",
      dataIndex: "action",
      render: (ghiChu, record, number) => (
        <Select
          defaultValue="Hình thức đổi trả"
          style={{
            width: "100%"
          }}
          onChange={(e) => {
            dataThayDoi[number] = {
              ...dataThayDoi[number],
              hinhThuc: e
            }
            setDataThayDoi(dataThayDoi)
          }}
          options={[
            {
              value: "1",
              label: "Đổi sản phẩm",
            },
            {
              value: "2",
              label: "Hoàn tiền",
            },
          ]}
        />
      ),
      width: "10%",
    },
    {
      title: "Action",
      dataIndex: "ghiChu",
      render: (ghiChu, record, number) => (
        Array(dataThayDoi[number]?.soLuongDoi).fill().map((item) => {
          return <>
            <Row style={{
              height: '32px',
              display: 'flex',
              alignItems: 'center'
            }}>
              <DoiSanPham />
            </Row>
          </>;
        })
      ),
      width: "10%",
    },
  ];
  const [data, setData] = useState(undefined)
  async function handleLayChiTiet() {
    const data = await useDoiTra.actions.layChiTiet(hoaDonId)
    setData(data.data)
  }
  useEffect(() => {
    handleLayChiTiet()
  }, [])
  const rowSelection = {
    onChange: (selectedRowKeys) => {
      setSelectedChiTietHoaDon(selectedRowKeys)
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User',
      name: record.name,
    }),
  };
  async function handleDoiTra() {
    console.log(dataThayDoi);
  }
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
                type: 'checkbox',
                ...rowSelection,
              }}
              columns={columns}
              dataSource={data && data.map((item) => {
                return {
                  ...item,
                  key: item.id
                }
              })}
            />
          </Col>
        </Row>
      </Modal>
    </>
  );
}

export default YeuCauDoiTra;
