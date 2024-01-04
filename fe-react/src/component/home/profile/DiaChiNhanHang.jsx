import { Button, Col, Divider, Radio, Row, Tag, notification } from "antd";
import "./style.css";
import { useEffect, useState } from "react";
import { useNguoiDungStore } from "./useNguoiDungStore";
import { useParams } from "react-router-dom";
import { selectLanguage } from "../../../language/selectLanguage";
import { useSelector } from "react-redux";
import { fixNgayThang } from "../../../extensions/fixNgayThang";

function DiaChiNhanHang() {
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
    async function handleLayDiaChi() {
        const data = await useNguoiDungStore.actions.layDiaChiNguoiDung(param.id)
        setDiaChi(data.data)
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
                    <Button type="primary">Thêm địa chỉ</Button>
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
                            {item.laDiaChiChinh ? <Tag color="#f50">Là địa chỉ chính</Tag> : <Button size="small">Set mặc định</Button>}
                            <Button style={{
                                color: "blue"
                            }} type="text" size="small">Chỉnh sửa</Button>
                        </Col>
                    </Row>
                    <Divider />
                </>

            })}

        </>
    );
}

export default DiaChiNhanHang;
