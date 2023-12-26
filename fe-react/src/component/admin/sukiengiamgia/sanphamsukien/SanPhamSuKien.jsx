import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import Header from "../../layout/header/Header";
import MenuAdmin from "../../layout/menu/MenuAdmin";
import { selectLanguage } from "../../../../language/selectLanguage";
import { SearchOutlined } from "@ant-design/icons";
import React, { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { Button, Image, Input, Space, Table, Tag, Col, Modal } from "antd";
import { useSanPhamSuKienStore } from "./useSanPhamSuKienStore";
import { FaRegPenToSquare } from "react-icons/fa6";
import axiosIns from "../../../../plugins/axios";
import { Form, Row, Tooltip, notification } from "antd";
import { Link } from "react-router-dom";
import ModalThemNhom from "./ModalThemNhom";
import ModalView from "./ModalThemNhom";
import DungNhomSanPham from "./DungNhomSanPham";
import { fixNgayThang } from "../../../../extensions/fixNgayThang";
import Modalxoa from "./Modalxoa";
function Product() {
  const [sanPham, setSanPhamSuKien] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex.join(".")}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex[0]][dataIndex[1]]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    render: (text, record) =>
      searchedColumn === dataIndex.join(".") ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={record[dataIndex[0]][dataIndex[1]].toString()}
        />
      ) : (
        text
      ),
  });
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const columns = [
    {
      title: "Mã Sản Phẩm",
      dataIndex: ["sanPham", "maSanPham"],
      key: "maSanPham",
      width: "10%",
      ...getColumnSearchProps(["sanPham", "maSanPham"]),
      render: (maSanPham) => (
        <>
          <Tag color="success"> {maSanPham}</Tag>
        </>
      ),
    },
    {
      title: "Hình Ảnh",
      dataIndex: ["sanPham", "hinhAnh1"],
      key: "hinhAnh",
      width: "20%",
      render: (hinhAnh) => (
        <Image src={hinhAnh} style={{ width: "100px", height: "100px" }} />
      ),
    },
    {
      title: "Tên Sản Phẩm",
      dataIndex: ["sanPham", "tenSanPham"],
      key: "tenSanPham",
      width: "20%",
      render: (tenSanPham) => <span>{tenSanPham}</span>,
    },
    {
      title: "Nhóm Sản Phẩm",
      dataIndex: ["sanPham", "nhomSanPham"],
      key: "tenNhom",
      width: "15%",
      render: (nhomSanPham) => <span>{nhomSanPham}</span>,
    },
    {
      title: "Tên sự kiện",
      dataIndex: ["suKienGiamGia", "tenSuKien"],
      key: "tenSuKien",
      width: "15%",
    },
    {
      title: "Giá trị giảm",
      dataIndex: ["suKienGiamGia", "giaTriGiam"],
      key: "giaTriGiam",
      width: "5%",
      render: (giaTriGiam) => <span>{giaTriGiam}%</span>,
    },
    {
      title: "Ngày Cập Nhật",
      dataIndex: "ngayCapNhat",
      key: "ngayCapNhat",
      width: "20%",
      render: (ngayCapNhat) => (
        <>{ngayCapNhat ? fixNgayThang(ngayCapNhat) : <Tag color="processing">Mới</Tag>}</>
      ),
    },
    {
      title: "Trạng Thái",
      dataIndex: "trangThai",
      key: "trangThai",
      width: "15%",
      render: (text) => {
        if (text === "CHAY_SU_KIEN") {
          return <span style={{ color: "green" }}>Chạy sự kiện</span>;
        } else {
          return <span style={{ color: "red" }}>Ngừng sự kiện</span>;
        }
      },
  
    },
    {
      title: "Thao tác",
      dataIndex: "id", // Sử dụng dataIndex là 'id' vì chúng ta muốn truy cập 'id' của mỗi hàng
      key: "action",
      width: "10%",
      render: (id) => (
        <Modalxoa id={id}/>
      ),
    },
  ];
  // thông báo
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
  // update
  const handleUpdate = async (id) => {
    try {
      const response = await axiosIns.put(`/api/sanphamsukien/update/${id}`);
      fetchData();
      openNotification("success", "Hệ thống", "Sửa thành công", "bottomRight");
      console.log("Cập nhật thành công:", response.data);

      // Cập nhật lại dữ liệu trên giao diện hoặc thực hiện các hành động cần thiết khi cập nhật thành công
    } catch (error) {
      alert("Error: " + error.message);
      console.error("Lỗi khi cập nhật:", error);

      // Xử lý lỗi nếu có
    }
  };
  // getall
  const fetchData = async () => {
    try {
      const { data } = await useSanPhamSuKienStore.actions.fetchSanPhamSuKien();
      // Kiểm tra dữ liệu nhận được từ API
      console.log(data);

      if (Array.isArray(data) && data.length > 0) {
        const formattedData = data.map((item) => ({
          key: item.id.toString(),
          id: item.id,
          ngayTao: item.ngayTao,
          ngayCapNhat: item.ngayCapNhat,
          sanPham: {
            maSanPham: item.sanPham?.maSanPham || "", // Sử dụng Optional Chaining (?.) để tránh lỗi nếu 'maSanPham' không tồn tại
            tenSanPham: item.sanPham?.tenSanPham || "", // Sử dụng Optional Chaining (?.) để tránh lỗi nếu 'maSanPham' không tồn tại
            hinhAnh1: item.sanPham?.hinhAnh1 || "", // Tương tự với 'hinhAnh1'
            nhomSanPham: item.sanPham?.nhomSanPham.tenNhom || "",
            //Thêm các trường khác của 'sanPham' tương tự ở đây
          },

          suKienGiamGia: {
            tenSuKien: item.suKienGiamGia?.tenSuKien,
            giaTriGiam: item.suKienGiamGia?.giaTriGiam,
          },
          trangThai: item.trangThai,
        }));
        setSanPhamSuKien(formattedData);
      }
    } catch (error) {
      console.error("Lỗi data error:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      {contextHolder}
      <div>
        <Header />
        <MenuAdmin />
        <div className="body-container">
          <div className="content">
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Link to="/admin/sukiengiamgia/sanphamsukien/themsanphamsukien">
                  <Button type="primary" block>
                    Thêm Sản Phẩm Sự Kiện
                  </Button>
                </Link>
              </Col>
              <Col span={12}>
                {<ModalThemNhom />}
                {isModalVisible && (
                  <ModalView setIsModalVisible={setIsModalVisible} />
                )}
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col
                span={24}
                style={{ marginTop: "16px" }}
                className="red-button"
              >
                {" "}
                {/* Thêm margin-top */}
                {<DungNhomSanPham />}
                {isModalVisible && (
                  <ModalView setIsModalVisible={setIsModalVisible} />
                )}
              </Col>
            </Row>

            <div className="table-sanpham background-color">
              <Table
                columns={columns}
                dataSource={sanPham}
                pagination={{
                  position: ["bottomRight"],
                }}
                rowKey="id" // Sử dụng thuộc tính 'id' làm key cho mỗi hàng trong Table
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Product;
