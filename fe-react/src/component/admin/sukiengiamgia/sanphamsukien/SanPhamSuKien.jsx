import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import Header from "../../layout/header/Header";
import MenuAdmin from "../../layout/menu/MenuAdmin";
import { selectLanguage } from "../../../../language/selectLanguage";
import { SearchOutlined } from "@ant-design/icons";
import React, { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { Button, Image, Input, Space, Table, Tag } from "antd";
import { useSanPhamSuKienStore } from "./useSanPhamSuKienStore";
import { FaRegPenToSquare } from "react-icons/fa6";
import axiosIns from "../../../../plugins/axios";
import { Form, Modal, Row, Tooltip, notification } from "antd";
import { Link } from "react-router-dom";
function Product() {
  const [sanPham, setSanPhamSuKien] = useState([]);

  const columns = [
    {
      title: "Mã Sản Phẩm",
      dataIndex: ["sanPham", "maSanPham"], // Thay đổi từ "sanPham.maSanPham" thành ["sanPham", "maSanPham"]
      key: "maSanPham",
      width: "20%",
      render: (maSanPham) => <span>{maSanPham}</span>,
    },
    {
      title: "Hình Ảnh",
      dataIndex: ["sanPham", "hinhAnh1"], // Thay đổi từ "sanPham.hinhAnh1" thành ["sanPham", "hinhAnh1"]
      key: "hinhAnh",
      width: "20%",
      render: (hinhAnh) => (
        <Image src={hinhAnh} style={{ width: "100px", height: "100px" }} />
      ),
    },
    {
      title: "Tên sự kiện",
      dataIndex: ["suKienGiamGia", "tenSuKien"],
      key: "tenSuKien",
      width: "15%",
    },
    {
      title: "Giá trị giảm",
      dataIndex: ["suKienGiamGia", "giaTriGiam"],
      key: "giaTriGiam",
      width: "15%",
    },
    {
      title: "Ngày Tạo",
      dataIndex: "ngayTao",
      key: "ngayTao",
      width: "15%",
    },
    {
      title: "Ngày Cập Nhật",
      dataIndex: "ngayCapNhat",
      key: "ngayCapNhat",
      width: "15%",
    },
    {
      title: "Trạng Thái",
      dataIndex: "trangThai",
      key: "trangThai",
      width: "20%",
    },
    {
      title: "Thao tác",
      dataIndex: "id", // Sử dụng dataIndex là 'id' vì chúng ta muốn truy cập 'id' của mỗi hàng
      key: "action",
      width: "10%",
      render: (id) => (
        <Button
          onClick={() => handleUpdate(id)}
          type="primary"
          icon={<FaRegPenToSquare />}
        >
          Update
        </Button>
      ),
    },
  ];
  // thông báo
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
  // update
  const handleUpdate = async (id) => {
    try {
      const response = await axiosIns.put(`/api/sanphamsukien/update/${id}`);
      fetchData();
      openNotification("success", "Hệ thống", "Sửa thành công", "bottomRight");
      console.log("Cập nhật thành công:", response.data);

      // Cập nhật lại dữ liệu trên giao diện hoặc thực hiện các hành động cần thiết khi cập nhật thành công
    } catch (error) {
      alert("Error: " + error.message);
      console.error("Lỗi khi cập nhật:", error);

      // Xử lý lỗi nếu có
    }
  };
  // getall
  const fetchData = async () => {
    try {
      const { data } = await useSanPhamSuKienStore.actions.fetchSanPhamSuKien();
      // Kiểm tra dữ liệu nhận được từ API
      console.log(data);

      if (Array.isArray(data) && data.length > 0) {
        const formattedData = data.map((item) => ({
          key: item.id.toString(),
          id: item.id,
          ngayTao: item.ngayTao,
          ngayCapNhat: item.ngayCapNhat,
          sanPham: {
            maSanPham: item.sanPham?.maSanPham || "", // Sử dụng Optional Chaining (?.) để tránh lỗi nếu 'maSanPham' không tồn tại
            hinhAnh1: item.sanPham?.hinhAnh1 || "", // Tương tự với 'hinhAnh1'
            //Thêm các trường khác của 'sanPham' tương tự ở đây
          },
          suKienGiamGia: {
            tenSuKien: item.suKienGiamGia?.tenSuKien,
            giaTriGiam: item.suKienGiamGia?.giaTriGiam,
          },
          trangThai: item.trangThai,
        }));
        setSanPhamSuKien(formattedData);
      }
    } catch (error) {
      console.error("Lỗi data error:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {contextHolder}
      <div>
        <Header />
        <MenuAdmin />
        <div className="body-container">
          <div className="content">
            <div className="table-sanpham background-color">
              <Table
                columns={columns}
                dataSource={sanPham}
                pagination={{
                  position: ["bottomRight"],
                }}
                rowKey="id" // Sử dụng thuộc tính 'id' làm key cho mỗi hàng trong Table
              />
              {/* <Link to="/themsanphamsukien">
                <Button type="primary">Thêm Sản Phẩm Sự Kiện</Button>
              </Link> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Product;