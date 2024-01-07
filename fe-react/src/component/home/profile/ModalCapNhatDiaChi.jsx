import { selectLanguage } from "../../../language/selectLanguage";
import "./style.css";
import { Modal, Form, Input, Button, Select, notification, Tooltip } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useNguoiDungStore } from "./useNguoiDungStore";
import { useSelector } from "react-redux";
import { FaRegPenToSquare } from "react-icons/fa6";
import axios from 'axios';

function ModalCapNhat({ id, setData }) {
  const { Option } = Select;
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
const [wards, setWards] = useState([]);
  const language = useSelector(selectLanguage);
  const [diaChi, setDiaChi] = useState({
    id: id,
    nguoiDungId: "3",
    nguoiNhan: "",
    hoNguoiNhan: "",
    xa: "",
    huyen: "",
    tinh: "",
    soDienThoai: "",
    chiTietDiaChi: "",
});
useEffect(() => {
    axios.get('https://provinces.open-api.vn/api/?depth=1')
      .then(response => {
        setProvinces(response.data);
      })
      .catch(error => {
        notification.error({
          message: 'Lỗi khi lấy dữ liệu tỉnh',
          description: error.message,
        });
      });
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
  const handleProvinceChange = value => {
    const provinceCode = provinces.find(province => province.name === value)?.code;
    setDiaChi({ ...diaChi, tinh: value });
    setDistricts([]);
    setWards([]);

    if (provinceCode) {
      axios.get(`https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`)
        .then(response => {
          setDistricts(response.data.districts);
        })
        .catch(error => {
          notification.error({
            message: 'Lỗi khi lấy dữ liệu huyện',
            description: error.message,
          });
        });
    }
  };

  const handleDistrictChange = value => {
    const districtCode = districts.find(district => district.name === value)?.code;
    setDiaChi({ ...diaChi, huyen: value });
    setWards([]);

    if (districtCode) {
      axios.get(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`)
        .then(response => {
          setWards(response.data.wards);
        })
        .catch(error => {
          notification.error({
            message: 'Lỗi khi lấy dữ liệu xã',
            description: error.message,
          });
        });
    }
  };

  const handleWardChange = value => {
    setDiaChi({ ...diaChi, xa: value });
  };
  const handleSuaDiaChi = async () => {
    try {
        const response = await useNguoiDungStore.actions.capNhatDiaChiNguoiDung(diaChi);
        openNotification("success", "Hệ thống", "Sửa thành công", "bottomRight");
        setData(response.data);
        setDiaChi({
          nguoiNhan: "",
          hoNguoiNhan: "",
          xa: "",
          huyen: "",
          tinh: "",
          soDienThoai: "",
          chiTietDiaChi: "",
        });
      
        setIsModalOpen(false);
        if (response.error) {
        openNotification("error", "Lỗi", response.error, "bottomRight");
      } else {
        
      }
    } catch (error) {
      openNotification("error", "Hệ thống", error.message || "Có lỗi xảy ra khi sửa địa chỉ", "bottomRight");
    }
  };
  return (
    <>
      {contextHolder}
      <div
        style={{
          marginLeft: "4px",
          marginRight: "4px",
        }}
      >
        <Tooltip title="Sửa địa chỉ" onClick={showModal}>
          <Button
            style={{
              color: "green",
            }}
            type="text"
          >
            Sửa địa chỉ
          </Button>
        </Tooltip>

        <Modal
          okButtonProps={{ style: { display: "none" } }}
          cancelButtonProps={{ style: { display: "none" } }}
          title="Sửa địa chỉ"
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
                        label="Họ người nhận"
                        name="hoNguoiNhan"
                        rules={[
                        {
                            required: true,
                        },
                        ]}
                    >
                        <Input
                        onChange={(e) => {
                            setDiaChi({
                            ...diaChi,
                            hoNguoiNhan: e.target.value,
                            });
                        }}
                        value={diaChi.hoNguoiNhan}
                        />
                  </Form.Item>

                    <Form.Item
                        label="Người nhận"
                        name="nguoiNhan"
                        rules={[
                        {
                            required: true,
                        },
                        ]}
                    >
                        <Input
                        onChange={(e) => {
                            setDiaChi({
                            ...diaChi,
                            nguoiNhan: e.target.value,
                            });
                        }}
                        value={diaChi.nguoiNhan}
                        />
                  </Form.Item>

                  <Form.Item
            label="Tỉnh"
            name="tinh"
            rules={[{ required: true }]}
          >
            <Select
              showSearch
              placeholder="Chọn tỉnh"
              onChange={handleProvinceChange}
            >
              {provinces.map(province => (
                <Option key={province.code} value={province.name}>
                  {province.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Huyện"
            name="huyen"
            rules={[{ required: true }]}
          >
            <Select
              showSearch
              placeholder="Chọn huyện"
              onChange={handleDistrictChange}
              disabled={!diaChi.tinh}
            >
              {districts.map(district => (
                <Option key={district.code} value={district.name}>
                  {district.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Xã"
            name="xa"
            rules={[{ required: true }]}
          >
            <Select
              showSearch
              placeholder="Chọn xã"
              onChange={handleWardChange}
              disabled={!diaChi.huyen}
            >
              {wards.map(ward => (
                <Option key={ward.code} value={ward.name}>
                  {ward.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
                <Form.Item
                        label="Địa chỉ chi tiết"
                        name="chiTietDiaChi"
                        rules={[
                        {
                            required: true,
                        },
                        ]}
                    >
                        <Input
                        onChange={(e) => {
                            setDiaChi({
                            ...diaChi,
                            chiTietDiaChi: e.target.value,
                            });
                        }}
                        value={diaChi.chiTietDiaChi}
                        />
                  </Form.Item>
                  <Form.Item
                        label="Số điện thoại"
                        name="soDienThoai"
                        rules={[
                        {
                            required: true,
                        },
                        ]}
                    >
                        <Input
                        onChange={(e) => {
                            setDiaChi({
                            ...diaChi,
                            soDienThoai: e.target.value,
                            });
                        }}
                        value={diaChi.soDienThoai}
                        />
                  </Form.Item>
            <Form.Item label=" ">
              <Button
                type="primary"
                htmlType="submit"
                onClick={handleSuaDiaChi}
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
