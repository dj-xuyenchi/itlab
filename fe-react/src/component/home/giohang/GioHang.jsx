import { useSelector } from "react-redux";
import "./style.css";
import { selectLanguage } from "../../../language/selectLanguage";
import { Drawer } from "antd";
import { useState } from "react";
import GioHangItem from "./GioHangItem";
function GioHang({ open, setOpen }) {
  const language = useSelector(selectLanguage);
  const [placement, setPlacement] = useState("right");
  function handleCloseGioHang() {
    setOpen(false);
  }
  return (
    <>
      <Drawer
        title={"Giỏ hàng của tôi"}
        placement={placement}
        closable={false}
        onClose={handleCloseGioHang}
        open={open}
        key={placement}
      >
        <GioHangItem />
        <GioHangItem />
        <GioHangItem />
      </Drawer>
    </>
  );
}

export default GioHang;
