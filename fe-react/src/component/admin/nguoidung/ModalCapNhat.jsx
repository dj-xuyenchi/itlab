import { useState, useEffect } from "react";
import {
  Button,
  Form,
  Input,
  Modal,
  Tooltip,
  notification,
  Checkbox,
  Radio,
  Select
} from "antd";
import { FaRegPenToSquare } from "react-icons/fa6";
import { useNguoiDungStore } from "./useNguoiDungStore";

function ModalThemSua({ id, setData }) {
  const { Option } = Select;
  const [nguoiDung, setNguoiDung] = useState({
    id: id,
    ten: "",
    ho: "",
    email: "",
    matKhau: "",
    trangThai: "",
    rankKhachHang: "",
    diem: "",
    gioiTinh: "",
    soDienThoai: "",
    anhDaiDien: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
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

  async function handleSuaNguoiDung() {
    if (nguoiDung.ten === "") {
      return;
    }

    const data = await useNguoiDungStore.actions.suaNguoiDung(nguoiDung);

    if (data.success) {
      openNotification(
        "success",
        "Hệ thống",
        "Sửa thông tin người dùng thành công",
        "bottomRight"
      );
      setData(data.data);

      setIsModalOpen(false);
    } else {
      openNotification("error", "Hệ thống", "Sửa thông tin người dùng thất bại", "bottomRight");
    }
  }

  useEffect(() => {
    async function layDuLieu() {
      const data = await useNguoiDungStore.actions.layNguoiDungId(id);
      setNguoiDung(data.data);
    }
    if (isModalOpen) {
      layDuLieu();
    }
  }, [id, isModalOpen]);

  return (
    <>
      {contextHolder}
      <Tooltip title="Cập nhật" onClick={showModal}>
        <Button
          style={{
            color: "green",
          }}
          shape="circle"
          icon={<FaRegPenToSquare />} 
        />
      </Tooltip>
      <Modal
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
        title="Sửa Người Dùng"
        visible={isModalOpen}
        onCancel={handleCancel}
        centered
        footer={[
          <Button key="submit" type="primary" onClick={handleSuaNguoiDung}>
            Sửa
          </Button>,
        ]}
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
            label="Họ"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input value={nguoiDung.ho} />
          </Form.Item>
          <Form.Item label="Tên">
            <Input
              value={nguoiDung.ten}
              onChange={(e) => {
                setNguoiDung({
                  ...nguoiDung,
                  ten: e.target.value,
                });
              }}
            />
          </Form.Item>
          <Form.Item
            label="Email"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input  value={nguoiDung.email} />
          </Form.Item>
          <Form.Item
                    label="Trạng Thái"
                    name="trangThai"
                    valuePropName="checked"
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng chọn trạng thái!'
                      },
                    ]}
                  >
                    <Checkbox
                      onChange={(e) => setNguoiDung({
                        ...nguoiDung,
                        trangThai: e.target.checked ? "HOATDONG" : "BIKHOA",
                      })}
                    >Hoạt động</Checkbox>
                  </Form.Item>
                  <Form.Item
                    label="Điểm"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input  value={nguoiDung.diem} />
                  </Form.Item>
                  <Form.Item
                    label="Số Điện Thoại"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input  value={nguoiDung.soDienThoai} />
                  </Form.Item>
                  <Form.Item
                    label="Giới Tính"
                    name="gioiTinh"
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng chọn giới tính!'
                      },
                    ]}
                  >
                    <Radio.Group 
                      onChange={(e) => setNguoiDung({...nguoiDung, gioiTinh: e.target.value === "Nam"})} 
                    >
                      <Radio value="Nam">Nam</Radio>
                      <Radio value="Nữ">Nữ</Radio>
                    </Radio.Group>
                  </Form.Item>
                  <Form.Item
                        label="Rank Khách Hàng"
                        name="rankKhachHang"
                        rules={[{ required: true, message: 'Vui lòng chọn Rank Khách Hàng!' }]}
                      >
                        <Select
                          placeholder="Chọn Rank Khách Hàng"
                          onChange={(value) => setNguoiDung({ ...nguoiDung, rankKhachHang: value })}
                          value={nguoiDung.rankKhachHang}
                        >
                          {/* Lặp qua danh sách rank để tạo các Option */}
                          <Option value="bronze">Bronze</Option>
                          <Option value="silver">Silver</Option>
                          <Option value="gold">Gold</Option>
                          <Option value="platinum">Platinum</Option>
                          {/* Thêm các Option khác tùy theo nhu cầu */}
                        </Select>
                      </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default ModalThemSua;
