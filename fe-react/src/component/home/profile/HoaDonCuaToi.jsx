import { Button, Col, Divider, Menu, Row, notification } from "antd";
import "./style.css";
import { useState } from "react";
import { useNguoiDungStore } from "./useNguoiDungStore";
import { useParams } from "react-router-dom";
import { selectLanguage } from "../../../language/selectLanguage";
import { useSelector } from "react-redux";
import { CgSandClock } from "react-icons/cg";
import { SiClockify } from "react-icons/si";
import { FaShippingFast } from "react-icons/fa";
import { MdDoneOutline } from "react-icons/md";
import { AiFillCloseCircle } from "react-icons/ai";
import ChoXacNhan from "./hoadon/ChoXacNhan";
const items = [
    {
        label: "Chờ xác nhận",
        key: "choxacnhan",
        icon: <CgSandClock />,
    },
    {
        label: "Chờ giao hàng",
        key: "chogiaohang",
        icon: <SiClockify />,
    },
    {
        label: "Đang giao hàng",
        key: "danggiao",
        icon: <FaShippingFast />,
    },
    {
        label: "Hoàn thành",
        key: "hoanthanh",
        icon: <MdDoneOutline />,
    },
    {
        label: "Hóa đơn hủy",
        key: "hoadonhuy",
        icon: <AiFillCloseCircle />,
    },
    {
        label: "Đã đổi trả",
        key: "doitrathanhcong",
        icon: <MdDoneOutline />,
    },
    {
        label: "Từ chối đổi trả",
        key: "tuchoidoitra",
        icon: <AiFillCloseCircle />,
    },
];
function HoaDonCuaToi({ nguoiDungId }) {
    const [current, setCurrent] = useState("choxacnhan");
    const onClick = (e) => {
        setCurrent(e.key);
    };

    return (
        <>
            <h4
                style={{
                    fontStyle: "normal",
                    fontWeight: 700,
                    fontSize: "20px",
                    marginBottom: "4px",
                }}
            >
                Hóa đơn của tôi
            </h4>
            <Row>
                <Menu
                    onClick={onClick}
                    selectedKeys={[current]}
                    mode="horizontal"
                    items={items}
                />
                <div className="content-hoadon" style={{
                    minHeight: "70vh",
                    marginTop: "12px"
                }}>
                    {current === "choxacnhan" ? <ChoXacNhan nguoiDungId={nguoiDungId} /> : ""}
                </div>
            </Row>
        </>
    );
}

export default HoaDonCuaToi;
