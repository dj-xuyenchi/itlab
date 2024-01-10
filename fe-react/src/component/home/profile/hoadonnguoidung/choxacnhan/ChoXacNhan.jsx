import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Input,
  Menu,
  Modal,
  Row,
  Space,
  Table,
  notification,
  Col,
  Tag,
  Divider
} from "antd";
import { PiMagnifyingGlassBold } from "react-icons/pi";
import { selectLanguage } from "../../../../../language/selectLanguage";
import { fixMoney } from "../../../../../extensions/fixMoney";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { useHoaDonChoStore } from "./useHoaDonChoStore";
import ChiTietHoaDon from "../chitiethoadon/ChiTietHoaDon";
import { fixNgayThang } from "../../../../../extensions/fixNgayThang";
import sapXepTheoNgayTao from "../../../../../extensions/sapXepNgayTao";
import { useParams } from "react-router-dom";
import HoaDonChiTiet from "./HoaDonChiTiet";
function ChoXacNhan() {
  const param = useParams();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const showModal2 = () => {
    setIsModalOpen2(true);
  };
  const handleOk2 = () => {
    setIsModalOpen2(false);
  };
  const handleCancel2 = () => {
    setIsModalOpen2(false);
  };
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

  const language = useSelector(selectLanguage);
  const dispath = useDispatch();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const [data, setData] = useState([]);
  async function layDuLieu() {
    const ketQua = await useHoaDonChoStore.actions.fetchHoaDonCho(param.id);
    if (ketQua && ketQua.data) {
      setData(ketQua.data);
    }
  }

  useEffect(() => {
    layDuLieu();
  }, []);

  return (
    <>
      {contextHolder}
      <Divider />
      {data && data.map((item) => {
        return <>
          <Row>
          <Col span={24}>
              <p >
              <span className="favorite-tag">Yêu thích</span>
                <span className="red-text-h4">
                 {item.trangThai}
                </span>
              </p>
            </Col>
            
            <Col span={24} >
              <Row key={item.key} style={{ marginBottom: '5px' }}>
                <Col span={4}>
                  <img
                    src={item.hoaDonChiTietList[0].sanPhamChiTiet.hinhAnh}
                    alt="Product"
                    style={{ width: '75%' }}
                  />
                </Col>
                <Col span={18} style={{ paddingTop: '10px' }}>
                  <h3 >{item.hoaDonChiTietList[0].sanPhamChiTiet.tenSanPham}</h3>
                  <p style={{ paddingTop: '10px' }}>{item.hoaDonChiTietList[0].sanPhamChiTiet.kichThuoc.tenKichThuoc} - {item.hoaDonChiTietList[0].sanPhamChiTiet.mauSac.tenMau}</p>
                  <div  >Số lượng: {item.hoaDonChiTietList[0].soLuong}</div>
                </Col>
              </Row>
            </Col>
            <Divider />
            <Col span={24}>
              <p style={{ textAlign: 'right' }}>
                Thành tiền:
                <span className="red-text-h3">
                  {fixMoney(item.hoaDonChiTietList[0].soLuong * item.hoaDonChiTietList[0].donGia)}
                </span>
              </p>
            </Col>
            <Col span={24} style={{ paddingTop: '10px' }}>
            <p>
                Ngày mua: <Tag color="#2db7f5">
                  {fixNgayThang(item.ngayTao)}
                </Tag>
                
                  <Button type="primary" style={{marginLeft:'200px',marginRight: '8px'}}>Đánh Giá</Button>
                  <Button style={{ marginRight: '8px' }}>Liên Hệ Người Bán</Button>
                  <Button>Mua Lại</Button>
                  </p>
                  
            </Col>
          </Row>
          <Divider />
        </>
      })}
    </>
  );
}

export default ChoXacNhan;
