import { Button, Col, Divider, Radio, Row, Tag, notification,Modal } from "antd";
import "./style.css";
import { useEffect, useState } from "react";
import { useNguoiDungStore } from "./useNguoiDungStore";
import { useParams } from "react-router-dom";
import { selectLanguage } from "../../../language/selectLanguage";
import { useSelector } from "react-redux";
import { fixNgayThang } from "../../../extensions/fixNgayThang";
import ModalThemDiaChi from "./ModalThemDiaChi";
import ModalCapNhatDiaChi from "./ModalCapNhatDiaChi"

function DiaChiNhanHang() {
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
    
    const param = useParams();
    const [api, contextHolder] = notification.useNotification();
    const [diaChi, setDiaChi] = useState(undefined)
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
    const xacNhanXoaDiaChi = (diaChiId) => {
        Modal.confirm({
            title: 'Xác nhận',
            content: 'Bạn có chắc chắn muốn xóa địa chỉ này không?',
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Hủy bỏ',
            onOk() {
                xoaDiaChi(diaChiId);
            },
        });
    };
    const handleCapNhatDiaChiMacDinh = async (diaChiId) => {
        try {
            const response = await useNguoiDungStore.actions.capNhatDiaChiMacDinh(param.id, diaChiId);
            if (response.status === 200) {
                openNotification('success', 'Thành công', 'Địa chỉ mặc định đã được cập nhật.', 'topRight');
                handleLayDiaChi();
            } else {
                openNotification('error', 'Lỗi', 'Không thể cập nhật địa chỉ mặc định.', 'topRight');
            }
        } catch (error) {
            openNotification('error', 'Lỗi kỹ thuật', error.message, 'topRight');
        }
    };
    async function xoaDiaChi(diaChiId) {
        try {
            const response = await useNguoiDungStore.actions.xoaDiaChiById(diaChiId);
            if (response.status === 200) {
                openNotification('success', 'Thành công', 'Địa chỉ đã được xóa.', 'topRight');
                handleLayDiaChi(); 
            } else {
                openNotification('error', 'Lỗi', 'Địa chỉ đang được sử dụng.', 'topRight');
            }
        } catch (error) {
            openNotification('error', 'Lỗi kỹ thuật', error.message, 'topRight');
        }
    }
    
    const [data, setData] = useState([]);
    async function handleLayDiaChi() {
        const data = await useNguoiDungStore.actions.layDiaChiNguoiDung(param.id)
        setDiaChi(data.data)
        setData(data.data.data);
        console.log(data.data);
    }
    useEffect(() => {
        handleLayDiaChi()
    }, [])
    return (
        <>
            {contextHolder}
            <Row justify="space-between" align="middle">
                <Col>
                    <h4
                        style={{
                            fontStyle: "normal",
                            fontWeight: 700,
                            fontSize: "20px",
                            marginBottom: "4px",
                        }}
                    >
                        Địa chỉ nhận hàng
                    </h4>
                </Col>
                <Col>
                <ModalThemDiaChi
                id={param.id}
                setData={handleLayDiaChi}
                handle={() => setIsModalOpen(false)}
                isModalOpen={isModalOpen}
            />
                </Col>
            </Row>

            <Divider />
            {diaChi && diaChi.map((item) => {
                return <>
                    <Row>
                        <Col span={24}>
                            <p>
                                {item.hoNguoiNhan + " " + item.nguoiNhan + " "}
                                | {item.soDienThoai}
                            </p>
                        </Col>
                        <Col span={24}>
                            <p>
                                {item.chiTietDiaChi}
                            </p>
                        </Col>
                        <Col span={24}>
                            <p>
                                {item.xa + ", " + item.huyen + ", " + item.tinh}
                            </p>
                        </Col>
                        <Col span={24}>
                            <Tag color="#2db7f5">
                                {fixNgayThang(item.ngayTao)}
                            </Tag>
                            {item.laDiaChiChinh ? (
                                <Tag color="#f50">Là địa chỉ chính</Tag>
                            ) : (
                                <Button size="small" onClick={() => handleCapNhatDiaChiMacDinh(item.id)}>
                                    Set mặc định
                                </Button>
                            )}
                            <Button size="small" danger onClick={() => xacNhanXoaDiaChi(item.id)}>
                                Xóa
                            </Button>
                        </Col>
                    </Row>
                    <Divider />
                </>
                
            })}
        </>
    );
}

export default DiaChiNhanHang;


