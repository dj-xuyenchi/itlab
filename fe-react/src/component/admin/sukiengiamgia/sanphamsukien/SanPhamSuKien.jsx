import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import Header from "../../layout/header/Header";
import MenuAdmin from "../../layout/menu/MenuAdmin";
import { selectLanguage } from "../../../../language/selectLanguage";
import { SearchOutlined } from "@ant-design/icons";
import React, { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { Button, Image, Input, Space, Table, Tag } from "antd";
import { useSanPhamStore } from "../../product/useSanPhamStore";
import { BsFillPencilFill } from "react-icons/bs";
import ModalThemSua from "../../product/ModalThemSua";
import ModalView from "../../product/ModalView";
import { useSanPhamSuKienStore } from "./useSanPhamSuKienStore";
import { FaRegPenToSquare } from "react-icons/fa6";
function Product() {
  const [sanPham, setSanPhamSuKien] = useState([
    {
      key: "1",
      id: 1, // ID của SanPhamSuKien
      sanPham: {
        maSanPham: "ABC",
        hinhAnh1: "https://res.cloudinary.com/dh0kxilvg/image/upload/v1698932643/ddmloiyei8cha4wblo4f.png",
        soLuongTon: 32,
      },
      suKienGiamGia: {
        // thông tin của SuKienGiamGia
      },
      ngayTao: "2023-12-06T00:00:00",
      ngayCapNhat: "2023-12-06T00:00:00",
      trangThai: "NGUNG_SU_KIEN",
      // các thuộc tính khác của SanPhamSuKien
    },
  ]);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: "10%",
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
      render: (hinhAnh) => <Image src={hinhAnh} style={{ width: "100px", height: "100px" }} />,
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
            style={{
              color: "green",
            }}
            shape="circle"
            icon={<FaRegPenToSquare />}
          />
      ),
    },
  ];
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
      <div>
        <Header />
        <MenuAdmin />
        <div className="body-container">
          <div className="content">
            <div className="modalThem">
              <ModalThemSua type={1} fetchData={fetchData} />
            </div>
            <div className="table-sanpham background-color">
              <Table
                columns={columns}
                dataSource={sanPham}
                pagination={{
                  position: ["bottomRight"],
                }}
                rowKey="id" // Sử dụng thuộc tính 'id' làm key cho mỗi hàng trong Table
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Product;
