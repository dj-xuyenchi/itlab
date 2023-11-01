import { useSelector } from "react-redux";
import "./style.css";
import { selectLanguage } from "../../../../language/selectLanguage";
import { BsFillBoxSeamFill, BsShopWindow } from "react-icons/bs";
import { RiBillLine } from "react-icons/ri";
import { FaBuffer, FaUserFriends } from "react-icons/fa";
import { SiZerodha } from "react-icons/si";
import { AiOutlineBgColors } from "react-icons/ai";
import { SiSteelseries } from "react-icons/si";
import { MdGroupWork, MdArchitecture } from "react-icons/md";
import { TbLayoutDashboard } from "react-icons/tb";
import { useState } from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem(
    <Link to={"/admin/sanpham"}>Dashboard</Link>,
    "1",
    <TbLayoutDashboard />
  ),
  getItem("Quản lý sản phẩm", "sub1", <BsFillBoxSeamFill />, [
    getItem(
      <Link to={"/admin/sanpham"}>Sản phẩm</Link>,
      "2",
      <BsFillBoxSeamFill />
    ),
    getItem("Thuộc tính", "3", <FaBuffer />, [
      getItem("Chất liệu", "4", <SiSteelseries />),
      getItem("Nhóm sản phẩm", "5", <MdGroupWork />),
      getItem("Thiết kế", "6", <MdArchitecture />),
      getItem("Màu săc", "7", <AiOutlineBgColors />),
      getItem("Kích thước", "8", <SiZerodha />),
    ]),
  ]),
  getItem(
    <Link to={"/admin/hoadon"}>Quản lý hóa đơn</Link>,
    "9",
    <RiBillLine />
  ),
  getItem(
    <Link to={"/admin/sanpham"}>Quản lý người dùng</Link>,
    "63",
    <FaUserFriends />
  ),
  getItem(
    <Link to={"/admin/sanpham"}>Bán hàng tại quầy</Link>,
    "62",
    <BsShopWindow />
  ),
];

const rootSubmenuKeys = ["sub1", "sub2", "sub4"];
function MenuAdmin() {
  const language = useSelector(selectLanguage);
  const [openKeys, setOpenKeys] = useState(["sub1"]);

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
    console.log(keys);
  };
  return (
    <>
      <div className="menu-container">
        <Menu
          mode="inline"
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          style={{ width: "100%", height: "100vh" }}
          items={items}
        />
      </div>
    </>
  );
}

export default MenuAdmin;
