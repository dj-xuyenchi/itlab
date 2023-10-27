import { Button, Cascader, Checkbox, DatePicker, Form, Input, InputNumber, Modal, Radio, Select, Switch, TreeSelect, Upload, notification } from "antd";
import "./style.css"; import { PlusOutlined } from '@ant-design/icons';
import React, { useEffect, useRef, useState } from "react";
import { BsFillPencilFill } from "react-icons/bs";
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
        giaBan: "",
        giaNhap: ""
    })
    function handleSetTenSP(e) {
        setSanPham({
            ...sanPham,
            tenSanPham: e.target.value
        })
    }
    function handleSetGiaBan(e) {
        console.log(e);
        setSanPham({
            ...sanPham,
            giaBan: e.target.value
        })
    }
    function handleSetGiaNhap(e) {
        setSanPham({
            ...sanPham,
            giaNhap: e.target.value
        })
    }
    function handleSetThietKe(e) {
        setSanPham({
            ...sanPham,
            thietKe: {
                id: e.label,
            }
        })
    }
    function handleSetBrand(e) {
        setSanPham({
            ...sanPham,
            brand: { id: e.label }
        })
    }
    function handleSetNhom(e) {
        setSanPham({
            ...sanPham,
            nhomSanPham: { id: e.label }
        })
    }
    function handleSetChatLieu(e) {
        setSanPham({
            ...sanPham,
            chatLieu: { id: e.label }
        })
    }
    async function handleThemSanPham() {
        const data = await useSanPhamStore.actions.themSanPham(sanPham)
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
                        <Input onChange={handleSetTenSP} />
                    </Form.Item>
                    <Form.Item label="Giá bán">
                        <InputNumber style={{
                            width: "100%",
                        }}
                            // onChange={handleSetGiaBan}
                             />
                    </Form.Item>
                    <Form.Item label="Giá nhập">
                        <InputNumber style={{
                            width: "100%",
                        }}
                            // value={sanPham.giaNhap}
                            // onChange={handleSetGiaNhap}
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
                                <Option key={option.id} value={option.id}>
                                    {option.tenThietKe}
                                </Option>
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
                                <Option key={option.id} value={option.id}>
                                    {option.tenChatLieu}
                                </Option>
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
                                <Option key={option.id} value={option.tenNhom}>
                                    {option.tenNhom}
                                </Option>
                            )) : ""}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Nhãn hiệu" >
                        <Select
                            onChange={handleSetBrand}
                            labelInValue
                            optionLabelProp="children"
                            style={{
                                width: "100%",
                            }} 
                            // value={sanPham.brand}
                        >
                            {thuocTinh ? thuocTinh.nhanHieuList.map((option) => (
                                <Option key={option.id} value={option.tenBrand}>
                                    {option.tenBrand}
                                </Option>
                            )) : ""}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Số lượng">
                        <InputNumber style={{
                            width: "100%",
                        }} />
                    </Form.Item>
                    <Form.Item label="Đã bán">
                        <InputNumber style={{
                            width: "100%",
                        }} />
                    </Form.Item>
                    <Form.Item label="Thông tin chi tiết">
                        <TextArea rows={4} />
                    </Form.Item>
                    <Form.Item label="Active sản phẩm" valuePropName="checked">
                        <Switch />
                    </Form.Item>
                    <Form.Item label="Upload" valuePropName="fileList" getValueFromEvent={normFile}>
                        <Upload action="/upload.do" listType="picture-card">
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
