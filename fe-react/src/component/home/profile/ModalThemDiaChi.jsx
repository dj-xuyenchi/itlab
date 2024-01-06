import React, { useState } from "react";
import { Modal, Form, Input, Button, Switch, notification } from "antd";
import { useNguoiDungStore } from "./useNguoiDungStore";
import { useSelector } from 'react-redux';

function ModalThemDiaChi({ setData }) {
    const nguoiDungId = useSelector(state => state.user.id);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [diaChi, setDiaChi] = useState({
        nguoiDungId: "3",
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

    const handleOk = async () => {
          const data = await useNguoiDungStore.actions.themDiaChiNguoiDung(diaChi);
          openNotification("success", "Hệ thống", "Thêm thành công", "bottomRight");
          setData(data.data.data);
          setDiaChi({
            ...diaChi,
            nguoiNhan: "",
          });
          setIsModalOpen(false);
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

                    <Form.Item>
                        {/* <Button type="primary" htmlType="submit">
              Thêm
            </Button> */}
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}

export default ModalThemDiaChi;
