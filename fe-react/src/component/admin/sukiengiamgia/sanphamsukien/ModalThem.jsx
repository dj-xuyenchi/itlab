import { selectLanguage } from "../../../../language/selectLanguage";
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
  Select,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useSanPhamStore } from "../../product/useSanPhamStore";
import { IoEyeSharp } from "react-icons/io5";
import dayjs from "dayjs";
import { fixMoney } from "../../../../extensions/fixMoney";
import { useSuKienGiamGiaStore } from "../useSuKienGiamGiaStore";
import { useSelector } from "react-redux";
import axiosIns from "../../../../plugins/axios";
import { useSanPhamSuKienStore } from "./useSanPhamSuKienStore";
import ModalThemNhom from "./ModalThemNhom";
const { Option } = Select;
function ModalView({ id }) {
  const language = useSelector(selectLanguage);
  const [sanPham, setSanPham] = useState({
    id: id,
    tenSanPham: "",
    ngayTao: "",
    ngayCapNhat: "",
    chatLieu: {},
    nhomSanPham: {},
    thietKe: {},
  });
  const [dataSuKienGiamGia, setDataSuKienGiamGia] = useState([]);
  const [selectedSuKienGiamGiaId, setSelectedSuKienGiamGiaId] = useState(null);

  async function layDuLieuGiamGia() {
    try {
      const response = await useSanPhamSuKienStore.actions.fetchSuKienGiamGia();
      if (response && response.data && Array.isArray(response.data)) {
        setDataSuKienGiamGia(response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    layDuLieuGiamGia();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    async function layDuLieu() {
      try {
        const data = await useSanPhamStore.actions.laySanPhamById(id);
        setSanPham(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    if (isModalOpen) {
      layDuLieu();
    }
  }, [isModalOpen]);
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
  const handleAdd = async () => {
    try {
      const response = await axiosIns.post("/api/sanphamsukien/add", null, {
        params: {
          id: sanPham.id,
          idSuKien: selectedSuKienGiamGiaId,
        },
      });

      openNotification(
        "success",
        "Hệ thống",
        "Thêm sản phẩm vào sự kiện thành công",
        "bottomRight"
      );
      handleCancel();
      console.log("Thêm thành công:", response.data);
      // Thực hiện cập nhật state hoặc hiển thị thông báo thành công tùy theo yêu cầu
    } catch (error) {
      console.error("Lỗi khi thêm:", error);
      // Xử lý khi gọi API thất bại, hiển thị thông báo lỗi hoặc xử lý khác tùy theo yêu cầu
    }
  };

  return (
    <>
      {contextHolder}
      <Tooltip title="Xem" onClick={showModal}>
        <Button type="primary">Thêm vào sự kiện</Button>
      </Tooltip>
      <Modal
        cancelButtonProps={{ style: { display: "none" } }}
        title="Sản phẩm"
        open={isModalOpen}
        onCancel={handleCancel}
        centered
        width={768}
        footer={[
          <Button type="primary" htmlType="submit" onClick={handleAdd}>
            Thêm
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
            label="Mã sản phẩm"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input disabled value={sanPham.maSanPham} />
          </Form.Item>
          <Form.Item
            label="Tên sản phẩm"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input disabled value={sanPham.tenSanPham} />
          </Form.Item>
          <Form.Item
            label="Giảm giá"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              onChange={(value) => {
                setSelectedSuKienGiamGiaId(value);
                // Xử lý khi người dùng chọn giảm giánpm
                // Cập nhật state, thông tin sản phẩm, hoặc thực hiện các hành động khác theo yêu cầu của bạn
              }}
              style={{ width: "100%" }}
            >
              {dataSuKienGiamGia.map((option) => (
                <Select.Option key={option.id} value={option.id}>
                  Sự kiện: {option.tenSuKien} - giá trị giảm:{" "}
                  {option.giaTriGiam}%
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          
        </Form>
      </Modal>
    </>
  );
}

export default ModalView;
