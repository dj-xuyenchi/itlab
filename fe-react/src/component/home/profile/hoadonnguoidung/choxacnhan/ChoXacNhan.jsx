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
function ChoGiaoHang() {
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
  const hasSelected = selectedRowKeys.length > 0;
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Tìm kiếm ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const columns = [
    {
      title: "Mã HĐ",
      dataIndex: "maHoaDon",
      width: "10%",
      ...getColumnSearchProps("maHoaDon"),
    },
    {
      title: "Tên khách hàng",
      dataIndex: "tenKhachHang",
      width: "20%",
      ...getColumnSearchProps("tenKhachHang"),
    },
    {
      title: "Số điện thoại",
      dataIndex: "soDienThoai",
      width: "15%",
      ...getColumnSearchProps("soDienThoai"),
    },
    {
      title: "Giá trị HĐ",
      dataIndex: "hoaDonChiTietList",
      width: "15%",
      render: (hoaDonChiTietList) => <span>
        {fixMoney(hoaDonChiTietList ?
          hoaDonChiTietList.reduce((pre, cur) => {
            return pre + (cur.soLuong * cur.donGia)
          }, 0) : 0)
        }
      </span>,
    },
    {
      title: "Ngày tạo",
      dataIndex: "ngayTao",
      width: "20%",
      sorter: (a, b) => a - b,
      render: (item) => <span>{fixNgayThang(item)}</span>,
    },
    {
      title: "Trạng thái",
      dataIndex: "trangThai",
      width: "15%",
    },
 
  ];
  const [data, setData] = useState([]);
  async function layDuLieu() {
    const ketQua = await useHoaDonChoStore.actions.fetchHoaDonCho(param.id);
    console.log("kết quả chờ xác nhận", ketQua)
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
      <div className="choxacnhan">
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={sapXepTheoNgayTao(data)}
        />
        <Row
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >


        </Row>
      </div>
    </>
  );
}

export default ChoGiaoHang;
