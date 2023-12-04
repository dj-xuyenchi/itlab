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
  const [sanPhamDoi, setSanPhamDoi] = useState([])
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
  const [ghiChu, setGhiChu] = useState([])
  const [thongTinDoiTra, setThongTinDoiTra] = useState([])
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
          thongTinDoiTra[number] = {
            soLuong: e
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
      render: (_, record, number) => <TextArea placeholder="Ghi chú" rows={4} onChange={(e) => {
        ghiChu[number] = e.target.value
        setGhiChu([
          ...ghiChu
        ])

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
        <>
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
          <DoiSanPham dataDoi={sanPhamDoi} setSanPhamDoi={setSanPhamDoi} number={number} />
        </>
      ),
      width: "10%",
    }
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
    selectedChiTietHoaDon
  };
  async function handleDoiTra() {
    if (!selectedChiTietHoaDon) {
      openNotification(
        "error",
        "Hệ thống",
        "Vui lòng chọn 1 sản phẩm",
        "bottomRight"
      );
      return
    }
    if (selectedChiTietHoaDon.length === 0) {
      openNotification(
        "error",
        "Hệ thống",
        "Vui lòng chọn 1 sản phẩm",
        "bottomRight"
      );
      return
    }

    var duLieuDoiTra = []
    for (var item of selectedChiTietHoaDon) {

      if (!ghiChu[item] || ghiChu[item] === '') {
        openNotification(
          "error",
          "Hệ thống",
          "Vui lòng nhập ghi chú cho lựa chọn thứ " + (Number(item) + 1),
          "bottomRight"
        );
        return
      }
      duLieuDoiTra[item] = {
        chiTietId: data[item].id,
        duLieuMoi: sanPhamDoi[item],
        ghiChu: ghiChu[item]
      }
    }
    var tienDoi = data.reduce((pre, next) => {
      return pre + (next.soLuong + next.donGia)
    }, 0)
    console.log(duLieuDoiTra);
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
              dataSource={data && data.map((item, index) => {
                return {
                  ...item,
                  key: index
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
