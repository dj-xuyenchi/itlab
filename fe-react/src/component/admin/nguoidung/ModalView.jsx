import { selectLanguage } from "../../../language/selectLanguage";
import "./style.css";
import {
  Button,
  Form,
  Input,
  Modal,
  Row,
  Table,
  Tooltip,
  notification,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useNguoiDungStore } from "./useNguoiDungStore";
import { useSelector } from "react-redux";
import { IoEyeSharp } from "react-icons/io5";

function ModalView({ id }) {
  const language = useSelector(selectLanguage);
  const [nguoiDung, setNguoiDung] = useState({
    id: id,
    anhDaiDien: {},
    ngayTao: {},
    ngayCapNhat: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    async function layDuLieu() {
      const data = await useNguoiDungStore.actions.layNguoiDungId(id);
      setNguoiDung(data.data);
    }
    if (isModalOpen) {
      layDuLieu();
    }
  }, [isModalOpen]);
  return (
    <>
      <Tooltip title="Xem" onClick={showModal}>
        <Button
          style={{
            color: "blue",
          }}
          shape="circle"
          icon={<IoEyeSharp />}
        />
      </Tooltip>
      <Modal
        cancelButtonProps={{ style: { display: "none" } }}
        title="Người Dùng"
        open={isModalOpen}
        onCancel={handleCancel}
        centered
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
          <Form.Item label="Ảnh Đại Diện" >
            <img
              src={nguoiDung.anhDaiDien} 
              style={{ width: '20%', height: '20%' }} 
            />
          </Form.Item>
          <Form.Item
            label="Mã Người Dùng"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input disabled value={nguoiDung.maNguoiDung} />
          </Form.Item>
          <Form.Item
            label="Họ"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input disabled value={nguoiDung.ho} />
          </Form.Item>
          <Form.Item
            label="Tên"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input disabled value={nguoiDung.ten} />
          </Form.Item>
          <Form.Item
            label="Email"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input disabled value={nguoiDung.email} />
          </Form.Item>
          <Form.Item
            label="Mật Khẩu"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input disabled value={nguoiDung.matKhau} />
          </Form.Item>
          <Form.Item
            label="Trạng Thái"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input disabled value={nguoiDung.trangThai} />
          </Form.Item>
          <Form.Item
            label="Rank Khách Hàng"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input disabled value={nguoiDung.rankKhachHang} />
          </Form.Item>
          <Form.Item
            label="Điểm"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input disabled value={nguoiDung.diem} />
          </Form.Item>
          <Form.Item
            label="Giới Tính"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input disabled value={nguoiDung.gioiTinh} />
          </Form.Item>
          <Form.Item
            label="Số Điện Thoại"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input disabled value={nguoiDung.soDienThoai} />
          </Form.Item>
          <Form.Item
            label="Ngày tạo"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input disabled value={nguoiDung.ngayTao} />
          </Form.Item>
          <Form.Item label="Ngày cập nhật">
            <Input disabled value={nguoiDung.ngayCapNhat ? nguoiDung.ngayCapNhat : "Mới"} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default ModalView;