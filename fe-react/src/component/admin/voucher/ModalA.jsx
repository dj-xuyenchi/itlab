import "./style.css";
import {
    Button,
    Form,
    Input,

    Modal,
    Select,
    Tooltip,
    notification,
} from "antd";

import React, { useState } from "react";
const { Option } = Select;
function ModalA() {
    const [tenVoucher, setTenVoucher] = useState('')
    const [loaiGiam, setLoaiGiam] = useState('')
    const [giaTriGiam, setGiaTriGiam] = useState('')
    const [soLuong, setSoLuong] = useState('')

    const handleClick = (e) => {
        e.preventDefault()
        // Kiểm tra từng trường và hiển thị thông báo lỗi nếu cần
        if (!tenVoucher || tenVoucher.trim() === "") {
            openNotification("error", "Lỗi", "Tên voucher không được để trống", "bottomRight");
            return;
        }
        if (!loaiGiam) {
            openNotification("error", "Lỗi", "Vui lòng chọn Loại giảm!", "bottomRight");
            return;
        }
        if (!giaTriGiam || giaTriGiam.trim() === "") {
            openNotification("error", "Lỗi", "Giá trị giảm không được để trống", "bottomRight");
            return;
        } else if (isNaN(giaTriGiam) || giaTriGiam <= 0) {
            openNotification("error", "Lỗi", "Giá trị giảm phải là một số dương lớn hơn 0!", "bottomRight");
            return;
        }
        if (loaiGiam === 'PHANTRAM' && (giaTriGiam < 0 || giaTriGiam > 100)) {
            openNotification("error", "Lỗi", "Giá trị giảm phần trăm phải nằm trong khoảng từ 0 đến 100!", "bottomRight");
            return;
        }
        if (loaiGiam === 'GIAMTHANG' && (giaTriGiam <= 1000)) {
            openNotification("error", "Lỗi", "Bạn đang dùng tiền VIỆT đấy ít nhất hãy cho giảm 1000 đ", "bottomRight");
            return;
        }


        if (!soLuong) {
            openNotification("error", "Lỗi", "Số lượng không được để trống", "bottomRight");
            return;
        } else if (isNaN(soLuong) || soLuong <= 0) {
            openNotification("error", "Lỗi", "Số lượng phải là một số dương lớn hơn 0!", "bottomRight");
            return;
        }

        const voucher = { tenVoucher, loaiGiam, giaTriGiam, soLuong }

        console.log(voucher)
        fetch("http://localhost:8080/api/voucher/addVoucher", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(voucher)
        }).then(() => {
            openNotification("success", "Hệ thống", "Thêm Thành công", "bottomRight");

            setIsModalOpen(false);
            console.log("New voucher Added")
        })
    }
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

    return (
        <>
            {contextHolder}
            <div
                style={{
                    marginLeft: "4px",
                    marginRight: "4px",
                }}
            >
                <Tooltip title="ADD" onClick={showModal}>
                    <Button
                        type="primary"


                    >Thêm dữ liệu</Button>
                </Tooltip>
                <Modal
                    okButtonProps={{ style: { display: "none" } }}
                    cancelButtonProps={{ style: { display: "none" } }}
                    title="Thêm voucher Mới"
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
                            label="Tên voucher"
                            name="Tên voucher"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input
                                value={tenVoucher}
                                onChange={(e) => setTenVoucher(e.target.value)}

                            />
                        </Form.Item>
                        {/* <Form.Item
                            label="Mã voucher"
                            name="Mã voucher"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input
                                value={maVoucher}
                                onChange={(e) => setMaVoucher(e.target.value)}

                            />
                        </Form.Item> */}
                        <Form.Item
                            label="Loại voucher "
                            name="Loại voucher"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Select value={loaiGiam} onChange={(value) => setLoaiGiam(value)}>
                                <Option value="PHANTRAM">PHANTRAM</Option>
                                <Option value="GIAMTHANG">GIAMTHANG</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="Giá trị giảm"
                            name="Giá trị giảm"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input
                                value={giaTriGiam}
                                onChange={(e) => setGiaTriGiam(e.target.value)}

                            />

                        </Form.Item>
                        <Form.Item
                            label="Số lượng"
                            name="Số lượng"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input
                                value={soLuong}
                                onChange={(e) => setSoLuong(e.target.value)}



                            />
                        </Form.Item>
                        {/* <Form.Item
                            label="Mã voucher"
                            name="Mã voucher"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input
                            // onChange={(e) => {
                            //   setChatLieu({
                            //     ...chatLieu,
                            //     maMauCss: e.target.value,
                            //   });
                            // }}
                            // value={chatLieu.maMauCss}
                            />
                        </Form.Item> */}
                        <Form.Item label=" ">
                            <Button
                                type="primary"
                                htmlType="submit"

                                onClick={handleClick}
                            >
                                Thêm
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </>
    );
}

export default ModalA;
