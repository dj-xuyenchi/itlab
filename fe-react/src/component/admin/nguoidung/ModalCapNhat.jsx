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
import { FaRegPenToSquare } from "react-icons/fa6";
function ModalCapNhat({ id, setData }) {
  const language = useSelector(selectLanguage);
  const [nguoiDung, setNguoiDung] = useState({
    id: id,
    ten: "",
    anhDaiDien: "",
    ho: "",
    email: "",
    gioiTinh: "",
    soDienThoai: "",
    matKhau: "",
    diem: "",
    trangThai: "",
    rankKhachHang: "",
    
  });
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
  async function handleSuaNguoiDung() {
    if (nguoiDung.ten == "" ) {
      return;
    }
    const data = await useNguoiDungStore.actions.suaNguoiDung(nguoiDung);
    openNotification("success", "Hệ thống", "Sửa thành công", "bottomRight");
    setNguoiDung({
      ...nguoiDung,
      ten: "",
      ho: "",
      matKhau: "",
      email: "",
      soDienThoai: "",
      gioiTinh: "",
      anhDaiDien: "",
      diem: "",
      trangThai: "",
      rankKhachHang: "",

      
    });
    setData(data.data.data);
    setIsModalOpen(false);
  }
  return (
    <>
      {contextHolder}
      <div
        style={{
          marginLeft: "4px",
          marginRight: "4px",
        }}
      >
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
            
            <Form.Item
              label="Tên Người Dùng"
              name="Tên Người Dùng"
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
              label="Họ "
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
              label="Giới Tính"
              name="Giới Tính"
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
                onClick={handleSuaNguoiDung}
              >
                Sửa
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  );
}

export default ModalCapNhat;