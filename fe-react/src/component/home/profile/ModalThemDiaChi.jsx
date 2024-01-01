import "./style.css";
import {
    Button,
    Form,
    Input,
    Modal,
    Tooltip,
    notification,
} from "antd";
import React, { useState } from "react";
import { useChatLieuStore } from "./useChatLieuStore";
import { FaRegPenToSquare } from "react-icons/fa6";
function ModalThemDiaChi({ id, setData, handle }) {
    const [chatLieu, setChatLieu] = useState({
        id: id,
        tenChatLieu: "",
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
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

    return (
        <>
            {contextHolder}
            <div
                style={{
                    marginLeft: "4px",
                    marginRight: "4px",
                }}
            >
                <Tooltip title="Thêm địa chỉ nhận hàng" >
                    <Button
                        style={{
                            color: "green",
                        }}
                        shape="circle"
                        onClick={() => {
                            setIsModalOpen(true)
                        }}
                        icon={<FaRegPenToSquare />}
                    />
                </Tooltip>
                <Modal
                    okButtonProps={{ style: { display: "none" } }}
                    cancelButtonProps={{ style: { display: "none" } }}
                    title="Sửa chất liệu"
                    open={isModalOpen}
                    onCancel={() => {
                        setIsModalOpen(false)
                    }}
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
                            label="Tên chất liệu"
                            name="Tên chất liệu"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input
                                onChange={(e) => {
                                    setChatLieu({
                                        ...chatLieu,
                                        tenChatLieu: e.target.value,
                                    });
                                }}
                                value={chatLieu.tenChatLieu}
                            />
                        </Form.Item>
                        <Form.Item label=" ">
                            <Button
                                type="primary"
                                htmlType="submit"
                            >
                                Thêm mới
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </>
    );
}

export default ModalThemDiaChi;
