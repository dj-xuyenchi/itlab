import { useSelector } from "react-redux";
import "./style.css";
import { selectLanguage } from "../../../../language/selectLanguage";
import { BsFillBoxSeamFill } from "react-icons/bs";
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
  getItem("Quản lý sản phẩm", "sub1", <BsFillBoxSeamFill />, [
    getItem(
      <Link to={"/admin/sanpham"}>Sản phẩm</Link>,
      "1",
      <BsFillBoxSeamFill />
    ),
    getItem("Thuộc tính", "2", null, [
      getItem("Màu sắc", "3"),
      getItem("Kích thước", "4"),
      getItem("Nhóm sản phẩm", "5"),
    ]),
  ]),
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
