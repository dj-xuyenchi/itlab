import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import Header from "../layout/header/Header";
import MenuAdmin from "../layout/menu/MenuAdmin";
import { selectLanguage } from "../../../language/selectLanguage";
import React, { useEffect, useRef, useState } from "react";
import { MailOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { CgSandClock } from "react-icons/cg";
import { AiFillCloseCircle } from "react-icons/ai";
import { SiClockify } from "react-icons/si";
import { FaShippingFast } from "react-icons/fa";
import { MdDoneOutline, MdPayment } from "react-icons/md";
import ChoXacNhan from "./choxacnhan/ChoXacNhan";
import ChoGiaoHang from "./chogiaohang/ChoGiaoHang";
import HoaDonHuy from "./hoadonhuy/HoaDonHuy";
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
    key: "dangiaohang",
    icon: <FaShippingFast />,
  },
  {
    label: "Hoàn thành",
    key: "hoanthanh",
    icon: <MdDoneOutline />,
  },
  {
    label: "Chờ thanh toán",
    key: "chothanhtoan",
    icon: <MdPayment />,
  },
  {
    label: "Hóa đơn hủy",
    key: "hoadonhuy",
    icon: <AiFillCloseCircle />,
  },
];
function HoaDon() {
  const language = useSelector(selectLanguage);
  const dispath = useDispatch();
  const [current, setCurrent] = useState("choxacnhan");
  const onClick = (e) => {
    setCurrent(e.key);
  };
  return (
    <>
      <div>
        <Header />
        <MenuAdmin />
        <div className="body-container">
          <div className="content">
            <Menu
              onClick={onClick}
              selectedKeys={[current]}
              mode="horizontal"
              items={items}
            />
            <div className="content-hoadon">
              {current === "choxacnhan" ? <ChoXacNhan /> : ""}
              {current === "chogiaohang" ? <ChoGiaoHang /> : ""}
              {current === "hoadonhuy" ? <HoaDonHuy /> : ""}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HoaDon;
