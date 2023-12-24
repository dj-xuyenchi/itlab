import { useDispatch, useSelector } from "react-redux";
import { selectLanguage } from "../../../language/selectLanguage";
import "./style.css";
import Header from "../layout/header/Header";
import MenuAdmin from "../layout/menu/MenuAdmin";
import {
  Form,
  Modal,
  Row,
  Table,
  Tag,
  notification,
  Upload,
  message,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import React, { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { Button, Input, Space, Image } from "antd";
import { useSuKienGiamGiaStore } from "./useSuKienGiamGiaStore";
import ModalCapNhat from "./ModalCapNhat";
import ModalXoa from "./ModalXoa";
import ModalView from "./ModalView";
import { useForm } from "antd/es/form/Form";
import { PlusOutlined } from "@ant-design/icons";
import { DatePicker } from "antd";
import axiosIns from "../../../plugins/axios";
import moment from "moment";
import { fixNgayThang } from "../../../extensions/fixNgayThang";
function SuKienGiamGia() {
  const [form] = useForm();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [suKienGiamGia, setSuKienGiamGia] = useState({});
  const [data, setData] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [hinhAnh, setHinhAnh] = useState([]);
  const props = {
    beforeUpload: (file) => {
      return false;
    },
    onChange: (file) => {
      setFileList(file.fileList);
      if (file.fileList.length == 0) {
        return;
      }
      if (file.fileList[0]) {
        setHinhAnh([file.fileList[0].originFileObj]);
      } else {
        setHinhAnh([file.fileList[0].originFileObj]);
      }
    },
  };

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
      title: "Tên sự kiện",
      dataIndex: "tenSuKien",
      key: "tenSuKien",
      width: "15%",
      ...getColumnSearchProps("tenSuKien"),
      render: (maNhom) => (
        <>
          <Tag color="success"> {maNhom}</Tag>
        </>
      ),
    },
    {
      title: "Logo sự kiện",
      dataIndex: "logoSuKien",
      key: "logoSuKien",
      width: "10%",
      render: (logoSuKien) => (
        <Image src={logoSuKien} style={{ width: "80px", height: "80px" }} />
      ),
    },
    {
      title: "Giá trị giảm(%)",
      dataIndex: "giaTriGiam",
      key: "giaTriGiam",
      width: "10%",
      // ...getColumnSearchProps("giaTriGiam"),
    },
    {
      title: "Mô tả",
      dataIndex: "moTa",
      key: "moTa",
      width: "15%",
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "ngayBatDau",
      key: "ngayBatDau",
      width: "20%",
      ...getColumnSearchProps("ngayBatDau"),
      render: (ngayBatDau) => <>{ngayBatDau ? fixNgayThang(ngayBatDau) : ""}</>,
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "ngayKetThuc",
      key: "ngayKetThuc",
      width: "15%",
      render: (ngayKetThuc) => (
        <>{ngayKetThuc ? fixNgayThang(ngayKetThuc) : ""}</>
      ),
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "ngayCapNhat",
      key: "ngayCapNhat",
      width: "15%",
      render: (ngayCapNhat) => (
        <>
          {ngayCapNhat ? (
            fixNgayThang(ngayCapNhat)
          ) : (
            <Tag color="processing">Mới</Tag>
          )}
        </>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "trangThai",
      key: "trangThai",
      width: "20%",
      render: (text) => {
        if (text === "HOATDONG") {
          return <span style={{ color: "green" }}>Hoạt động</span>;
        } else {
          return <span style={{ color: "red" }}>Chưa diễn ra</span>;
        }
      },
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
          <ModalCapNhat id={id} setData={setSuKienGiamGia} />
          <ModalXoa id={id} setData={setSuKienGiamGia} />
        </div>
      ),
    },
  ];

  async function layDuLieu() {
    try {
      const response = await useSuKienGiamGiaStore.actions.fetchSuKienGiamGia();
      if (response && response.data && Array.isArray(response.data)) {
        setData(response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
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
  const handleThemSuKienGiamGia = async () => {
    if (
      !suKienGiamGia.tenSuKien ||
      !suKienGiamGia.giaTriGiam ||
      !suKienGiamGia.ngayBatDau ||
      !suKienGiamGia.ngayKetThuc ||
      !suKienGiamGia.moTa
    ) {
      openNotification(
        "error",
        "Hệ thống",
        "Vui lòng điền đầy đủ thông tin",
        "bottomRight"
      );
      return;
    }
    const currentDate = new Date().toISOString().split("T")[0];
    if (
      suKienGiamGia.ngayBatDau < currentDate 
  
    ) {
      openNotification(
        "error",
        "Hệ thống",
        "Ngày bắt đầu nhỏ hơn ngày hiện tại",
        "bottomRight"
      );
      return; // Không gửi yêu cầu nếu dữ liệu không hợp lệ
    }
    if (
      suKienGiamGia.ngayKetThuc <= suKienGiamGia.ngayBatDau
    ) {
      openNotification(
        "error",
        "Hệ thống",
        "Ngày kết thúc nhỏ hơn ngày bắt đầu ",
        "bottomRight"
      );
      return; 
    }

    if (fileList.length === 0 || !fileList[0].originFileObj) {
      openNotification("error", "Hệ thống", "Vui lòng chọn ảnh", "bottomRight");
      return;
    }

    const formattedStartDate = moment(suKienGiamGia.ngayBatDau).toISOString();
    const formattedEndDate = moment(suKienGiamGia.ngayKetThuc).toISOString();

    const formData = new FormData();
    formData.append("logoSuKien", fileList[0].originFileObj);

    const suKienData = {
      tenSuKien: suKienGiamGia.tenSuKien,
      giaTriGiam: suKienGiamGia.giaTriGiam,
      ngayBatDau: formattedStartDate,
      ngayKetThuc: formattedEndDate,
      moTa: suKienGiamGia.moTa,
    };

    formData.append("data", JSON.stringify(suKienData));

    try {
      const response = await fetch(
        "http://localhost:8089/api/sukiengiamgia/themsukiengg",
        {
          method: "POST",
          body: formData,
        }
      );

      const responseData = await response.json();
      setIsModalOpen(false);
      layDuLieu();
      if (response.ok) {
        form.resetFields();
        openNotification(
          "success",
          "Hệ thống",
          "Thêm sự kiện thành công",
          "bottomRight"
        );
      
      } else {
        throw new Error(
          responseData.message || "Có lỗi xảy ra khi thêm sự kiện giảm giá"
        );
      }
    } catch (error) {
      console.error("Lỗi khi thêm sự kiện giảm giá:", error);
      openNotification(
        "error",
        "Hệ thống",
        error.message || "Có lỗi xảy ra khi thêm sự kiện giảm giá",
        "bottomRight"
      );
    }
  };
  const formattedDate = moment(
    suKienGiamGia.ngayBatDau,
    "YYYY-MM-DDTHH:mm"
  ).format("YYYY-MM-DDTHH:mm");
  const formattedDateEnd = moment(
    suKienGiamGia.ngayKetThuc,
    "YYYY-MM-DDTHH:mm"
  ).format("YYYY-MM-DDTHH:mm");
  const handleDateChange = (date, dateString, field) => {
    setSuKienGiamGia({
      ...suKienGiamGia,
      [field]: date, // Chuyển đổi ngày tháng thành chuỗi đúng định dạng
    });
  };

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
                title="Thêm sự kiện giảm giá"
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
                    label="Tên sự kiện"
                    name="tenSuKien"
                    rules={[
                      { required: true, message: "Vui lòng nhập tên sự kiện" },
                    ]}
                  >
                    <Input
                      onChange={(e) =>
                        setSuKienGiamGia({
                          ...suKienGiamGia,
                          tenSuKien: e.target.value,
                        })
                      }
                    />
                  </Form.Item>
                  <Form.Item label="Upload">
                    <Upload
                      listType="picture-card"
                      maxCount={1}
                      fileList={fileList}
                      {...props}
                    >
                      {fileList.length >= 1 ? null : ( // Hiển thị nút Upload nếu chưa chọn ảnh hoặc đã chọn đủ số lượng
                        <div>
                          <PlusOutlined />
                          <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                      )}
                    </Upload>
                  </Form.Item>
                  <Form.Item
                    label="Giá trị giảm"
                    name="giaTriGiam"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập giá trị giảm ",
                      },
                    ]}
                  >
                    <Input
                      onChange={(e) =>
                        setSuKienGiamGia({
                          ...suKienGiamGia,
                          giaTriGiam: e.target.value,
                        })
                      }
                    />
                  </Form.Item>
                  <Form.Item
                    label="Ngày bắt đầu"
                    rules={[
                      { required: true, message: "Vui lòng chọn ngày bắt đầu" },
                    ]}
                  >
                    <Input
                      type="datetime-local"
                      value={formattedDate}
                      onChange={(e) => {
                        setSuKienGiamGia({
                          ...suKienGiamGia,
                          ngayBatDau: e.target.value,
                        });
                      }}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Ngày kết thúc"
                    rules={[
                      { required: true, message: "Vui lòng chọn ngày bắt đầu" },
                    ]}
                  >
                    <Input
                      type="datetime-local"
                      value={formattedDateEnd}
                      onChange={(e) =>
                        setSuKienGiamGia({
                          ...suKienGiamGia,
                          ngayKetThuc: e.target.value, // Cập nhật giá trị ngày tháng khi thay đổi
                        })
                      }
                    />
                  </Form.Item>

                  <Form.Item
                    label="Mô tả"
                    name="Mô tả"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input
                      onChange={(e) => {
                        setSuKienGiamGia({
                          ...suKienGiamGia,
                          moTa: e.target.value,
                        });
                      }}
                    />
                  </Form.Item>
                  <Form.Item label=" ">
                    <Button
                      type="primary"
                      htmlType="submit"
                      onClick={handleThemSuKienGiamGia}
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
                rowKey="id"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SuKienGiamGia;
