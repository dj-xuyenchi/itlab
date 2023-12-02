import { useDispatch, useSelector } from "react-redux";
import { selectLanguage } from "../../../language/selectLanguage";
import "./style.css";
import Header from "../layout/header/Header";
import MenuAdmin from "../layout/menu/MenuAdmin";
import { Form, Modal, Row, Table, Tag, notification } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import React, { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { Button, Input, Space ,Image} from "antd";
import { useNguoiDungStore } from "./useNguoiDungStore";
import ModalCapNhat from "./ModalCapNhat";
import ModalXoa from "./ModalXoa";
import ModalView from "./ModalView";
import { useForm } from "antd/es/form/Form";
function NguoiDung() {
  const [form] = useForm()
  const language = useSelector(selectLanguage);
  const dispath = useDispatch();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [nguoiDung, setNguoiDung] = useState({
    ten: "",
  });
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
          placeholder={`Search ${dataIndex}`}
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
        title: "Ảnh đại diện",
        dataIndex: "anhDaiDien",
        key: "anhDaiDien",
        width: "15%",
        render: (anhDaiDien) => (
          <Image src={anhDaiDien} style={{ width: "80px", height: "80px" }} />
        ),
      },

      {
        title: "Số Điện Thoại ",
        dataIndex: "soDienThoai",
        key: "soDienThoai",
        width: "15%",
        ...getColumnSearchProps("soDienThoai"),
      },

      {
        title: "Tên Người Dùng ",
        dataIndex: "ten",
        key: "ten",
        width: "15%",
        ...getColumnSearchProps("ten"),
      },

    {
        title: "Ngày tạo",
        dataIndex: "ngayTao",
        key: "ngayTao",
        width: "15%",
        ...getColumnSearchProps("ngayTao"),
      },
    {
      title: "Ngày cập nhật",
      dataIndex: "ngayCapNhat",
      key: "ngayCapNhat",
      width: "15%",
      render: (ngayCapNhat) => (
        <>{ngayCapNhat ? ngayCapNhat : <Tag color="processing">Mới</Tag>}</>
      ),
    },
    {
        title: "Trạng thái",
        dataIndex: "trangThai",
        key: "trangThai",
        width: "15%",
        ...getColumnSearchProps("trangThai"),
      },
    
      {
        title: "Thao tác",
        dataIndex: "id",
        key: "id",
        align: "center",
        width: "15%",
        render: (id) => (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <ModalView id={id} />
            <ModalCapNhat id={id} setData={setData} />
            <ModalXoa id={id} setData={setData} />
          </div>
        ),
      },
  ];

  const [data, setData] = useState([]);
  async function layDuLieu() {
    const data = await useNguoiDungStore.actions.fetchNguoiDung();
    setData(data.data.data);
  }

  useEffect(() => {
    layDuLieu();
  }, []);
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
  async function handleThemNguoiDung() {
    if (nguoiDung.ten == "" ) {
      return;
    }
    const data = await useNguoiDungStore.actions.themNguoiDung(nguoiDung);
    openNotification("success", "Hệ thống", "Thêm thành công", "bottomRight");
    setData(data.data.data);
    setNguoiDung({
      ...nguoiDung,
      ten: "",
      anhDaiDien: "",
      ho: "",
      email: "",
      soDienThoai: "",
      matKhau: "",
      gioiTinh: "",
      diem: "",
      trangThai: "",
      ngayTao: "",
      ngayCapNhat: "",
      rankKhachHang: "",
    });
    form.resetFields()
    setIsModalOpen(false);
  }
  return (
    <>
      {contextHolder}
      <div>
        <Header />
        <MenuAdmin />
        <div className="body-container">
          <div className="content">
            <div
              style={{
                backgroundColor: "#ffffff",
                padding: "12px 12px",
              }}
            >
              <Row
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginBottom: "10px",
                }}
              >
                <Button type="primary" size="large" onClick={showModal}>
                  Thêm dữ liệu
                </Button>
              </Row>
              <Modal
                okButtonProps={{ style: { display: "none" } }}
                cancelButtonProps={{ style: { display: "none" } }}
                title="Thêm Người Dùng"
                open={isModalOpen}
                onCancel={handleCancel}
                centered
              >
                <Form
                  form={form}
                  name="wrap"
                  labelCol={{
                    flex: "110px",
                  }}
                  labelAlign="left"
                  labelWrap
                  wrapperCol={{
                    flex: 1,
                  }}
                  colon={false}
                  style={{
                    maxWidth: 600,
                  }}
                >
                  <Form.Item
                    label="Tên"
                    name="Tên "
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input
                      onChange={(e) => {
                        setNguoiDung({
                          ...nguoiDung,
                          ten: e.target.value,
                        });
                      }}
                      value={nguoiDung.ten}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Ảnh Đại Diện"
                    name="Ảnh Đại Diện"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input
                      onChange={(e) => {
                        setNguoiDung({
                          ...nguoiDung,
                          anhDaiDien: e.target.value,
                        });
                      }}
                      value={nguoiDung.anhDaiDien}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Họ"
                    name="Họ"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input
                      onChange={(e) => {
                        setNguoiDung({
                          ...nguoiDung,
                          ho: e.target.value,
                        });
                      }}
                      value={nguoiDung.ho}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Email"
                    name="Email"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input
                      onChange={(e) => {
                        setNguoiDung({
                          ...nguoiDung,
                          email: e.target.value,
                        });
                      }}
                      value={nguoiDung.email}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Mật Khẩu"
                    name="Mật Khẩu"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input
                      onChange={(e) => {
                        setNguoiDung({
                          ...nguoiDung,
                          matKhau: e.target.value,
                        });
                      }}
                      value={nguoiDung.matKhau}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Số Điện Thoại"
                    name="Số Điện Thoại"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input
                      onChange={(e) => {
                        setNguoiDung({
                          ...nguoiDung,
                          soDienThoai: e.target.value,
                        });
                      }}
                      value={nguoiDung.soDienThoai}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Giơi Tính"
                    name="Giới Tính"
                    rules={[
                      {
                        required: true == "Nam",
                      },
                    ]}
                  >
                    <Input
                      onChange={(e) => {
                        setNguoiDung({
                          ...nguoiDung,
                          gioiTinh: e.target.value,
                        });
                      }}
                      value={nguoiDung.gioiTinh}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Điểm"
                    name="Điểm"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input
                      onChange={(e) => {
                        setNguoiDung({
                          ...nguoiDung,
                          diem: e.target.value,
                        });
                      }}
                      value={nguoiDung.diem}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Trạng Thái"
                    name="Trạng Thái"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input
                      onChange={(e) => {
                        setNguoiDung({
                          ...nguoiDung,
                          trangThai: e.target.value,
                        });
                      }}
                      value={nguoiDung.trangThai}
                    />
                  </Form.Item>
                  {/* <Form.Item
                    label="Ngày Tạo"
                    name="Ngày Tạo"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input
                      onChange={(e) => {
                        setNguoiDung({
                          ...nguoiDung,
                          ngayTao: e.target.value,
                        });
                      }}
                      value={nguoiDung.ngayTao}
                    />
                  </Form.Item> */}
                  {/* <Form.Item
                    label="Ngày Cập Nhật"
                    name="Ngày Cập Nhật"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input
                      onChange={(e) => {
                        setNguoiDung({
                          ...nguoiDung,
                          ngayCapNhat: e.target.value,
                        });
                      }}
                      value={nguoiDung.ngayCapNhat}
                    />
                  </Form.Item> */}
                  {/* <Form.Item
                    label="Rank Khách Hàng"
                    name="Rank Khách Hàng"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input
                      onChange={(e) => {
                        setNguoiDung({
                          ...nguoiDung,
                          rankKhachHang: e.target.value,
                        });
                      }}
                      value={nguoiDung.rankKhachHang}
                    />
                  </Form.Item> */}
                  <Form.Item label=" ">
                    <Button
                      type="primary"
                      htmlType="submit"
                      onClick={handleThemNguoiDung}
                    >
                      Thêm mới
                    </Button>
                  </Form.Item>
                </Form>
              </Modal>
              <Table
                columns={columns}
                dataSource={data}
                pagination={{ pageSize: 10 }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NguoiDung;