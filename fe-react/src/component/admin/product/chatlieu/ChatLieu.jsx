import { useDispatch, useSelector } from "react-redux";
import { selectLanguage } from "../../../../language/selectLanguage";
import "./style.css";
import Header from "../../layout/header/Header";
import MenuAdmin from "../../layout/menu/MenuAdmin";
import { Form, Modal, Row, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import React, { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { Button, Input, Space } from "antd";
import { useChatLieuStore } from "./useChatLieuStore";
function ChatLieu() {
  const language = useSelector(selectLanguage);
  const dispath = useDispatch();
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
      title: "Mã chất liệu",
      dataIndex: "maChatLieu",
      key: "maChatLieu",
      width: "10%",
      ...getColumnSearchProps("maChatLieu"),
    },
    {
      title: "Tên chất liệu",
      dataIndex: "tenChatLieu",
      key: "tenChatLieu",
      width: "35%",
      ...getColumnSearchProps("tenChatLieu"),
    },
    {
      title: "Ngày tạo",
      dataIndex: "ngayTao",
      key: "ngayTao",
      width: "20%",
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "ngayCapNhat",
      key: "ngayCapNhat",
      width: "20%",
    },
    {
      title: "",
      dataIndex: "maChatLieu",
      key: "maChatLieu",
      width: "15%",
    },
  ];

  const [data, setData] = useState([]);
  async function layDuLieu() {
    const data = await useChatLieuStore.actions.fetchChatLieu();
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
  return (
    <>
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
                title="Thêm chất liệu"
                open={isModalOpen}
                onCancel={handleCancel}
              >
                <Form
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
                    label="Tên chất liệu"
                    name="username"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item label=" ">
                    <Button type="primary" htmlType="submit">
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

export default ChatLieu;
