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
  Upload,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useSuKienGiamGiaStore } from "./useSuKienGiamGiaStore";
import { useSelector } from "react-redux";
import { FaRegPenToSquare } from "react-icons/fa6";
import { DatePicker } from "antd";
import axiosIns from "../../../plugins/axios";
import moment from "moment";
import { PlusOutlined } from "@ant-design/icons";
import SuKienGiamGia from "./SuKienGiamGia";
function ModalCapNhat({ id, setData }) {
  const [suKienGiamGia, setSuKienGiamGia] = useState({
    id: id,
    tenSuKien: "",
    giaTriGiam: "",
    ngayBatDau: "",
    ngayKetThuc: "",
    moTa: "",
    logoSuKien: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
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
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleDateChange = (date, dateString) => {
    setNgayBatDau(dateString); // Lưu giá trị ngày tháng vào state khi DatePicker thay đổi
  };
  const [ngayBatDau, setNgayBatDau] = useState(null);
  useEffect(() => {
    async function layDuLieu() {
      const data = await useSuKienGiamGiaStore.actions.laySuKienGiamGiaById(id);
      setSuKienGiamGia(data.data);
    }
    if (isModalOpen) {
      layDuLieu();
    }
  }, [isModalOpen]);
  const handleSubmit = async () => {
    try {
      // Kiểm tra giá trị của suKienGiamGia.ngayBatDau và suKienGiamGia.ngayKetThuc
      if (!suKienGiamGia || !suKienGiamGia.tenSuKien || !suKienGiamGia.moTa) {
        openNotification(
          "error",
          "Hệ thống",
          "Vui lòng điền đầy đủ thông tin",
          "bottomRight"
        );
        return; // Không gửi yêu cầu nếu dữ liệu không hợp lệ
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
        return; // Không gửi yêu cầu nếu dữ liệu không hợp lệ
      }
      const response = await axiosIns.put(
        `/api/sukiengiamgia/capnhatsukiengg/${id}`,
        suKienGiamGia
      );
      
      openNotification(
        "success",
        "Hệ thống",
        "Sửa sự kiện thành công",
        "bottomRight"
      );
      setData(response.data);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Lỗi khi sửa sự kiện:", error);
      openNotification(
        "error",
        "Hệ thống",
        error.message || "Có lỗi xảy ra khi sửa sự kiện",
        "bottomRight"
      );
    }
  };

  // Sử dụng Moment.js với định dạng đúng "YYYY-MM-DDTHH:mm:ss.SSSZ"
  const formattedDate = moment(
    suKienGiamGia.ngayBatDau,
    "YYYY-MM-DDTHH:mm"
  ).format("YYYY-MM-DDTHH:mm");
  const formattedDateEnd = moment(
    suKienGiamGia.ngayKetThuc,
    "YYYY-MM-DDTHH:mm"
  ).format("YYYY-MM-DDTHH:mm");
  const currentDate = new Date().toISOString().split("T")[0]; // Lấy ngày hiện tại và định dạng YYYY-MM-DD
  return (
    <>
      {contextHolder}
      <Tooltip title="Sửa" onClick={showModal}>
        <Button
          style={{
            color: "blue",
          }}
          shape="circle"
          icon={<FaRegPenToSquare />}
        />
      </Tooltip>
      <Modal
        cancelButtonProps={{ style: { display: "none" } }}
        title="Sự kiện giảm giá"
        open={isModalOpen}
        onCancel={handleCancel}
        centered
        footer={[
          <Button type="primary" htmlType="submit" onClick={handleSubmit}>
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
            label="Tên sự kiện"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              value={suKienGiamGia.tenSuKien}
              onChange={(e) =>
                setSuKienGiamGia({
                  ...suKienGiamGia,
                  tenSuKien: e.target.value,
                })
              }
            />
          </Form.Item>
          <Form.Item
            label="Giá trị giảm"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input type="number"
              value={suKienGiamGia.giaTriGiam}
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
            rules={[{ required: true, message: "Vui lòng chọn ngày bắt đầu" }]}
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
            rules={[{ required: true, message: "Vui lòng chọn ngày bắt đầu" }]}
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
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              value={suKienGiamGia.moTa}
              onChange={(e) =>
                setSuKienGiamGia({
                  ...suKienGiamGia,
                  moTa: e.target.value,
                })
              }
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default ModalCapNhat;
