import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import React, { useEffect, useState } from "react";
import { selectLanguage } from "../../../../language/selectLanguage";
import { fixMoney } from "../../../../extensions/fixMoney";
import { Modal, notification } from "antd";

import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { useChiTietHoaDonStore } from "./useChiTietHoaDonStore";
function ChiTietHoaDon({ hoaDonId }) {
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

  const language = useSelector(selectLanguage);
  const dispath = useDispatch();
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
  const [hoaDonChiTiet, setHoaDonChiTiet] = useState(undefined)
  useEffect(() => {
    async function layDuLieu() {
      const data = await useChiTietHoaDonStore.actions.layChiTiet(hoaDonId)
      setHoaDonChiTiet(data.data.data)
      console.log(data.data.data);
    }
    layDuLieu();
  }, [])
  return (
    <>{contextHolder}
      <div style={{
        color: "blue",
        fontSize: "20px"

      }}
        onClick={showModal}
        className="btn-hoadonchitiet"
      >
        <HiMiniMagnifyingGlass />
      </div>
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
}

export default ChiTietHoaDon;
