import { Button, Cascader, Checkbox, DatePicker, Form, Input, InputNumber, Modal, Radio, Select, Switch, message, Upload, notification } from "antd";
import "./style.css"; import { PlusOutlined } from '@ant-design/icons';
import React, { useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { Option } from "antd/es/mentions";
import { useSanPhamStore } from "./useSanPhamStore";
function ModalThemSua({ type, thuocTinh, fetchData }) {
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
    const normFile = (e) => {
        console.log(e);
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };
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
    const [sanPham, setSanPham] = useState({
        tenSanPham: "",
        giaBan: 0,
        giaNhap: 0,
        soLuong: 0
    })
    const [hinhAnh, setHinhAnh] = useState(undefined)
    function handleSetTenSP(e) {
        setSanPham({
            ...sanPham,
            tenSanPham: e.target.value
        })
    }
    function handleSetGiaBan(e) {
        setSanPham({
            ...sanPham,
            giaBan: e
        })
    }
    function handleSetGiaNhap(e) {
        setSanPham({
            ...sanPham,
            giaNhap: e
        })
    }
    function handleSetSoLuong(e) {
        setSanPham({
            ...sanPham,
            soLuong: e
        })
    }
    function handleSetThietKe(e) {
        setSanPham({
            ...sanPham,
            thietKeId: e.value
        })
    }
    function handleSetNhom(e) {
        setSanPham({
            ...sanPham,
            nhomSanPhamId: e.value
        })
    }
    function handleSetChatLieu(e) {
        setSanPham({
            ...sanPham,
            chatLieuId: e.value
        })
    }
    const props = {
        beforeUpload: (file) => {
            const isPNG = file.type === 'image/png';
            if (!isPNG) {
                message.error(`${file.name} is not a png file`);
            }
            return false;
        },
        onChange: (e) => {
            setHinhAnh([e.fileList[0].originFileObj, e.fileList[1].originFileObj]);
        },
    };

    async function handleThemSanPham() {
        var form = new FormData()
        form.append("file1", hinhAnh[0])
        form.append("file2", hinhAnh[1])
        form.append("data", JSON.stringify(sanPham))
        console.log(form);
        const data = await useSanPhamStore.actions.themSanPham(form)
        if (data.data.status == 'THANHCONG') {
            openNotification(
                "success",
                "Hệ thống",
                "Thêm sản phẩm thành công",
                "bottomRight"
            );
            fetchData()
        } else {
            openNotification(
                "error",
                "Hệ thống",
                "Thêm sản phẩm thất bại",
                "bottomRight"
            );
        }
        setIsModalOpen(false)
    }
    return (
        <>
            {contextHolder}
            <Button type="primary" onClick={showModal}>
                {type == 1 ? " Thêm sản phẩm" : "Sửa sản phẩm"}
            </Button>
            <Modal width={768} title={type == 1 ? " Thêm sản phẩm" : "Sửa sản phẩm"} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Form
                    labelCol={{
                        span: 4,
                    }}
                    wrapperCol={{
                        span: 18,
                    }}
                    layout="horizontal"
                    style={{
                        maxWidth: 768,
                    }}
                >
                    {/* <Form.Item label="Radio">
                        <Radio.Group>
                            <Radio value="apple"> Apple </Radio>
                            <Radio value="pear"> Pear </Radio>
                        </Radio.Group>
                    </Form.Item> */}
                    <Form.Item label="Tên sản phẩm">
                        <Input value={sanPham.tenSanPham} onChange={handleSetTenSP} />
                    </Form.Item>
                    <Form.Item label="Giá bán">
                        <InputNumber style={{
                            width: "100%",
                        }}
                            value={sanPham.giaBan}
                            min={0}
                            onChange={handleSetGiaBan}
                        />
                    </Form.Item>
                    <Form.Item label="Giá nhập">
                        <InputNumber style={{
                            width: "100%",
                        }}
                            min={0}
                            value={sanPham.giaNhap}
                            onChange={handleSetGiaNhap}
                        />
                    </Form.Item>
                    <Form.Item label="Thiết kế">
                        <Select
                            labelInValue
                            optionLabelProp="children"
                            style={{
                                width: "100%",
                            }}
                            // value={sanPham.thietKe}
                            onChange={handleSetThietKe}
                        >
                            {thuocTinh ? thuocTinh.thietKeList.map((option) => (
                                <Select.Option key={option.id} value={option.id}>
                                    {option.tenThietKe}
                                </Select.Option>
                            )) : ""}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Chất liệu">
                        <Select
                            labelInValue
                            optionLabelProp="children"
                            style={{
                                width: "100%",
                            }}
                            // value={sanPham.chatLieu}
                            onChange={handleSetChatLieu}
                        >
                            {thuocTinh ? thuocTinh.chatLieuList.map((option) => (
                                <Select.Option key={option.id} value={option.id}>
                                    {option.tenChatLieu}
                                </Select.Option>
                            )) : ""}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Nhóm sản phẩm">
                        <Select
                            labelInValue
                            optionLabelProp="children"
                            style={{
                                width: "100%",
                            }}
                            // value={sanPham.nhomSanPham}
                            onChange={handleSetNhom}
                        >
                            {thuocTinh ? thuocTinh.nhomSanPhamList.map((option) => (
                                <Select.Option key={option.id} value={option.id}>
                                    {option.tenNhom}
                                </Select.Option>
                            )) : ""}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Số lượng">
                        <InputNumber style={{
                            width: "100%",
                        }}
                            value={sanPham.soLuong}
                            min={0}
                            onChange={handleSetSoLuong}
                        />
                    </Form.Item>
                    <Form.Item label="Đã bán">
                        <InputNumber style={{
                            width: "100%",
                        }}
                            value={sanPham.soLuong}
                            min={0}
                            onChange={handleSetSoLuong}
                        />
                    </Form.Item>
                    <Form.Item label="Thông tin chi tiết">
                        <TextArea rows={4} />
                    </Form.Item>
                    <Form.Item label="Active sản phẩm" valuePropName="checked">
                        <Switch />
                    </Form.Item>
                    <Form.Item label="Upload">
                      
                        <Upload listType="picture-card"
                            multiple
                            customRequest={() => { }}
                            {...props}
                            maxCount={4}
                        >
                            <div>
                                <PlusOutlined />
                                <div
                                    style={{
                                        marginTop: 8,
                                    }}
                                >
                                    Upload
                                </div>
                            </div>
                        </Upload>
                    </Form.Item>
                    <Form.Item label="Button">
                        <Button onClick={() => {
                            if (type == 1) {
                                handleThemSanPham()
                            }
                        }}>{type == 1 ? "Thêm sản phẩm" : "Sửa sản phẩm"}</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}


export default ModalThemSua;
