import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Button, Select, notification } from "antd";
import { useNguoiDungStore } from "./useNguoiDungStore";
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useParams } from "react-router-dom";


function ModalThemDiaChi({ setData }) {
    const param = useParams();
    const nguoiDungId = useSelector(state => state.user.id);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const { Option } = Select;
    const [diaChi, setDiaChi] = useState({
        nguoiDungId: "1",
        nguoiNhan: "",
        hoNguoiNhan: "",
        xa: "",
        huyen: "",
        tinh: "",
        soDienThoai: "",
        chiTietDiaChi: "",
    });

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
      };
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
      async function handleLayDiaChi() {
        const data = await useNguoiDungStore.actions.layDiaChiNguoiDung(param.id)
        setDiaChi(data.data)
        setData(data.data.data);
        console.log(data.data);
    }
      const handleOk = async () => {
        try {
            const response = await useNguoiDungStore.actions.themDiaChiNguoiDung(diaChi);
            if (response.status === 200) {
              openNotification("success", "Hệ thống", "Thêm thành công", "bottomRight");
            setData(response.data);
            setDiaChi({
              nguoiDungId: nguoiDungId,
              nguoiNhan: "",
              hoNguoiNhan: "",
              xa: "",
              huyen: "",
              tinh: "",
              soDienThoai: "",
              chiTietDiaChi: "",
            });
            form.resetFields()
            setIsModalOpen(false);
            handleLayDiaChi();
          }
            
            if (response.error) {
            openNotification("error", "Lỗi", response.error, "bottomRight");
          } else {
            
          }
        } catch (error) {
          openNotification("error", "Hệ thống", error.message || "Có lỗi xảy ra khi thêm địa chỉ", "bottomRight");
        }
      };
      

    return (
        <>
            <Button type="primary" onClick={showModal}>
                Thêm Địa Chỉ
            </Button>
            <Modal
                title="Thêm Địa Chỉ Mới"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleOk}
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
                </Form>
            </Modal>
        </>
    );
}

export default ModalThemDiaChi;
