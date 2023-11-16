import {
  Button,
  Col,
  Image,
  Input,
  InputNumber,
  Menu,
  Modal,
  Radio,
  Row,
  Select,
  Space,
  Table,
  Tag,
  Tooltip,
  notification,
} from "antd";
import { FcMoneyTransfer } from "react-icons/fc";
import Header from "../layout/header/Header";
import MenuAdmin from "../layout/menu/MenuAdmin";
import "./style.css";
import React, { useEffect, useState } from "react";
import { GrChapterAdd, GrScan } from "react-icons/gr";
import { RiBillLine } from "react-icons/ri";
import { useBanTaiQuayStore } from "./useBanTaiQuayStore";
import { fixMoney } from "../../../extensions/fixMoney";
import TextArea from "antd/es/input/TextArea";
import { useGHN } from "../../../plugins/ghnapi";
import QRCode from "./QRCode";

function BanTaiQuay() {
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (type, title, des, placement) => {
    if (type === "error") {
      api.error({
        message: title,
        description: des,
        placement,
      });
    }
    if (type === "warning") {
      api.warning({
        message: title,
        description: des,
        placement,
      });
    }
    if (type === "success") {
      api.success({
        message: title,
        description: des,
        placement,
      });
    }
  };
  const [hoaDonRequest, setHoaDonRequest] = useState(undefined)
  const [danhSachHoaDon, setDanhSachHoaDon] = useState(undefined);
  const [current, setCurrent] = useState(undefined);
  const [hoaDonHienTai, setHoaDonHienTai] = useState(undefined);
  const [gioHangHienTai, setGioHangHienTai] = useState(undefined);
  // const [hoaDon]
  async function handleCapNhatSoLuong(chiTietId, soLuongMoi) {
    await useBanTaiQuayStore.actions.thayDoiSoLuong({
      chiTietId: chiTietId,
      soLuongMoi: soLuongMoi,
    });
    layDanhSachChiTiet();
  }
  async function handleXoaSpHoaDon(e) {
    await useBanTaiQuayStore.actions.xoaHoaDonChiTiet(e);
    layDanhSachChiTiet();
  }
  const [selectDiaChi, setSelectDiaChi] = useState(-1);
  const [diaChiMoi, setDiaChiMoi] = useState({
    tinh: "Chọn tỉnh",
    huyen: "Chọn huyện",
    xa: "Chọn xã",
  });
  const [diaChiChon, setDiaChiChon] = useState(undefined);
  const [danhSachDiaChi, setDanhSachDiaChi] = useState(undefined);
  const [danhSachTinh, setDanhSachTinh] = useState(undefined);
  const [danhSachHuyen, setDanhSachHuyen] = useState(undefined);
  const [danhSachXa, setDanhSachXa] = useState(undefined);
  async function layDiaChiNguoiDung(e) {
    const data = await useBanTaiQuayStore.actions.layDiaChiKhachHang(e.value);
    setDanhSachDiaChi(data.data);
    setHoaDonRequest({
      ...hoaDonRequest,
      khachHangId: e.value
    })
  }
  async function handleLayTinh() {
    const data = await useGHN.actions.layTinh();
    setDanhSachTinh(data.data.data);
  }
  async function handleChonHuyen(e) {
    const data = await useGHN.actions.layHuyen(e.value);
    setDanhSachHuyen(data.data.data);
    setDiaChiMoi({
      ...diaChiMoi,
      tinh: e,
    });
    setHoaDonRequest({
      ...hoaDonRequest,
      tinhId: e.value,
      tinh: e.label
    })
  }
  async function handleChonXa(e) {
    if (!e) {
      return;
    }
    const data = await useGHN.actions.layXa(e.value);
    setDanhSachXa(data.data.data);
    setDiaChiMoi({
      ...diaChiMoi,
      huyen: e,
    });
    setHoaDonRequest({
      ...hoaDonRequest,
      huyenId: e.value,
      huyen: e.label
    })
  }
  async function handleChonDiaChiXa(e) {
    setDiaChiMoi({
      ...diaChiMoi,
      xa: e,
    });
    setHoaDonRequest({
      ...hoaDonRequest,
      xaId: e.value,
      xa: e.label
    })
  }
  const columns = [
    {
      title: "Ảnh sản phẩm",
      dataIndex: "sanPhamChiTiet",
      key: "name",
      width: "15%",
      render: (sanPhamChiTiet) => (
        <Image
          src={sanPhamChiTiet.sanPham.hinhAnh1}
          style={{ width: "80px", height: "120px" }}
        />
      ),
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "sanPhamChiTiet",
      key: "name",
      width: "50%",
      render: (sanPhamChiTiet) => (
        <span>
          {sanPhamChiTiet.sanPham.tenSanPham}
          <Tag color="success">{sanPhamChiTiet.mauSac.tenMau}</Tag>
          <Tag color="processing">{sanPhamChiTiet.kichThuoc.tenKichThuoc}</Tag>
        </span>
      ),
    },
    {
      title: "Số lượng",
      dataIndex: "soLuong",
      key: "age",
      width: "10%",
      render: (soLuong, record) => (
        <InputNumber
          defaultValue={soLuong}
          onChange={(e) => {
            handleCapNhatSoLuong(record.id, e);
          }}
        />
      ),
    },
    {
      title: "Đơn giá",
      dataIndex: "donGia",
      key: "age",
      width: "10%",
      render: (donGia) => <>{fixMoney(donGia)}</>,
    },
    {
      title: "Thành tiền",
      dataIndex: "donGia",
      key: "age",
      width: "15%",
      render: (donGia, record) => <>{fixMoney(donGia * record.soLuong)}</>,
    },
    // {
    //   title: "Thao tác",
    //   dataIndex: "id",
    //   key: "address",
    //   width: '20%',
    //   render: (id) => (
    //     <>
    //       <Tooltip title="Xóa">
    //         <Button
    //           danger
    //           shape="circle"
    //           icon={<AiOutlineDelete />}
    //           onClick={setIsModalOpen}
    //         />
    //       </Tooltip>
    //       <Modal
    //         title="Xóa sản phẩm khỏi hóa đơn"
    //         open={isModalOpen}
    //         onOk={() => {
    //           handleXoaSpHoaDon(id);
    //           setIsModalOpen(false);
    //         }}
    //         onCancel={() => {
    //           setIsModalOpen(false);
    //         }}
    //         centered
    //       >
    //         <p>Bạn có chắc muốn xóa sản phẩm này</p>
    //       </Modal>
    //     </>
    //   ),
    // },
  ];
  const onClick = (e) => {
    setCurrent(e.key);
    setHoaDonHienTai(
      danhSachHoaDon
        ? danhSachHoaDon.find((item) => {
          return item.key == e.key;
        })
        : undefined
    );
  };
  async function handleLayHoaDon() {
    const data = await useBanTaiQuayStore.actions.layHoaDonTaiQuay();
    setDanhSachHoaDon(
      data.data.map((item) => {
        return {
          ...item,
          icon: <RiBillLine />,
        };
      })
    );
  }
  async function layDanhSachChiTiet() {
    const data = await useBanTaiQuayStore.actions.fetHoaDonChiTiet(
      hoaDonHienTai.id
    );
    setGioHangHienTai(data.data);
  }
  async function layDuLieuSanPham() {
    const data = await useBanTaiQuayStore.actions.fetSanPhamChiTiet();
    setSanPhamChiTiet(data.data);
  }
  const [danhSachKhachHang, setDanhSachKhachHang] = useState(undefined);
  async function layDanhSachKhachHang() {
    const data = await useBanTaiQuayStore.actions.layDanhSachKhachHang();
    setDanhSachKhachHang(data.data);
  }
  useEffect(() => {
    layDuLieuSanPham();
    handleLayTinh();
    layDanhSachKhachHang();
  }, []);
  useEffect(() => {
    handleLayHoaDon();
    setHoaDonRequest({
      ...hoaDonRequest,
      isCoDiaChiMoi: true,
      hoaDonId: hoaDonHienTai ? hoaDonHienTai.id : null
    })
    if (current) {
      layDanhSachChiTiet();
    }
  }, [current]);
  async function handleTaoMoiHoaDon() {
    if (danhSachHoaDon.length > 9) {
      openNotification(
        "warning",
        "Hệ thống",
        "Chỉ cho phép tạo tối đa 10 hóa đơn",
        "bottomRight"
      );
      return;
    }
    var nguoiDung = JSON.parse(localStorage.getItem("user")).data;
    const data = await useBanTaiQuayStore.actions.taoHoaDon(
      nguoiDung.nguoiDung.id
    );
    handleLayHoaDon();
  }
  const [sanPhamChiTiet, setSanPhamChiTiet] = useState(undefined);
  const [isOpen, setIsOpen] = useState(false)
  async function handleChonSanPham(e) {
    const sanPhamChon = sanPhamChiTiet.find((item) => {
      return item.id == e.key;
    });
    if (sanPhamChon.soLuongTon <= 0) {
      openNotification("error", "Hệ thống", "Sản phẩm hết hàng", "bottomRight");
      return;
    }
    if (
      gioHangHienTai.some((item) => {
        return item.sanPhamChiTiet.id == e.key;
      })
    ) {
      openNotification(
        "error",
        "Hệ thống",
        "Sản phẩm đã có trong giỏ",
        "bottomRight"
      );
      return;
    }
    const data = await useBanTaiQuayStore.actions.themSanPhamVaoHoaDonQuay({
      hoaDonId: hoaDonHienTai.id,
      sanPhamId: e.key,
    });
    setGioHangHienTai(data.data);
    openNotification("success", "Hệ thống", "Thêm thành công", "bottomRight");
  }
  const [confirmDiaChiMoi, setConfirmDiaChiMoi] = useState(false);
  const [taoHoaDon, setTaoHoaDon] = useState(false);
  async function handleTaoHoaDon() {
    const data = await useBanTaiQuayStore.actions.taoHoaDonTaiQuay({
    })
    openNotification("success", "Hệ thống", "Tạo hóa đơn thành công", "bottomRight");
  }
  async function taoHoaDonTaiQuayRequest() {
    const data = await useBanTaiQuayStore.actions.taoHoaDonTaiQuay(hoaDonRequest);
    if (data.data) {
      openNotification("success", "Hệ thống", "Tạo hóa đơn thành công", "bottomRight");
    }
    handleLayHoaDon()
    setConfirmDiaChiMoi(false)
    setTaoHoaDon(false)
    setCurrent(undefined)

  }
  return (
    <>
      {contextHolder}
      <div>
        <Header />
        <MenuAdmin />
        <div className="body-container">
          <div className="content">
            <Row
              style={{
                backgroundColor: "#ffffff",
                padding: "12px 12px",
              }}
            >
              <Col>
                <h5>Tạo hóa đơn</h5>
              </Col>
            </Row>
            <Row
              style={{
                backgroundColor: "#ffffff",
                padding: "12px 12px",
              }}
            >
              <Col span={24}>
                <Button
                  type="primary"
                  icon={<GrChapterAdd />}
                  onClick={handleTaoMoiHoaDon}
                >
                  Tạo mới hóa đơn
                </Button>
              </Col>
            </Row>
            <Row
              style={{
                backgroundColor: "#ffffff",
                padding: "12px 12px",
              }}
            >
              <Col span={24}>
                <Menu
                  onClick={onClick}
                  selectedKeys={[current]}
                  mode="horizontal"
                  items={danhSachHoaDon}
                />
              </Col>
            </Row>
            {current && (
              <Row
                style={{
                  backgroundColor: "#ffffff",
                  padding: "12px 12px",
                }}
              >
                <Col span={12}>
                  <Row>
                    <Col>
                      <h6>Thông tin hóa đơn</h6>
                    </Col>
                  </Row>
                  <Row
                    style={{
                      marginTop: "28px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Col span={11}>
                      <Row
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Col span={23}>Mã HĐ:</Col>
                        <Col span={23}>
                          <Input
                            value={hoaDonHienTai ? hoaDonHienTai.key : ""}
                          />
                        </Col>
                      </Row>
                    </Col>
                    <Col span={11} offset={1}>
                      <Row
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Col span={24}>Ngày tạo:</Col>
                        <Col span={24}>
                          <Input
                            value={hoaDonHienTai ? hoaDonHienTai.ngayTao : ""}
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row
                    style={{
                      marginTop: "14px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Col span={11}>
                      <Row
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Col span={23}>Nhân viên:</Col>
                        <Col span={23}>
                          <Input
                            value={
                              hoaDonHienTai
                                ? hoaDonHienTai.nhanVien.ho +
                                " " +
                                hoaDonHienTai.nhanVien.ten
                                : ""
                            }
                          />
                        </Col>
                      </Row>
                    </Col>
                    <Col span={11} offset={1}>
                      <Row
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Col span={24}>Mã NV:</Col>
                        <Col span={24}>
                          <Input
                            value={
                              hoaDonHienTai
                                ? hoaDonHienTai.nhanVien.maNguoiDung
                                : ""
                            }
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Row>{" "}
                  <Row
                    style={{
                      marginTop: "14px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Col span={23}>
                      <Select
                        style={{
                          width: "100%",
                        }}
                        showSearch
                        labelInValue
                        defaultValue={"Chọn khách hàng"}
                        onChange={layDiaChiNguoiDung}
                        filterOption={(input, option) =>
                          option.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        {danhSachKhachHang
                          ? danhSachKhachHang.map((option) => (
                            <Select.Option key={option.id} value={option.id}>
                              {option.ho + " " + option.ten}
                            </Select.Option>
                          ))
                          : ""}
                      </Select>
                    </Col>
                  </Row>
                  <Row
                    style={{
                      marginTop: "14px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {" "}
                    <Radio.Group
                      onChange={(e) => {

                        setSelectDiaChi(e.target.value);
                        if (e.target.value != -1) {
                          setDiaChiChon(
                            danhSachDiaChi.find((item) => {
                              return item.id == e.target.value;
                            })
                          );
                          setHoaDonRequest({
                            ...hoaDonRequest,
                            diaChiId: e.target.value,
                            isCoDiaChiMoi: false
                          })
                        }
                        else {
                          setHoaDonRequest({
                            ...hoaDonRequest,
                            diaChiId: e.target.value,
                            isCoDiaChiMoi: true
                          })
                        }
                      }}
                      value={selectDiaChi}
                    >
                      <Space direction="vertical">
                        {danhSachDiaChi
                          ? danhSachDiaChi.map((item) => {
                            return (
                              <Radio value={item.id}>
                                {item.xa + " " + item.huyen + " " + item.tinh}
                              </Radio>
                            );
                          })
                          : ""}
                        <Radio value={-1}>Chọn mới</Radio>
                      </Space>{" "}
                    </Radio.Group>
                  </Row>
                  <Row
                    style={{
                      marginTop: "14px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Col span={11}>
                      <Row
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Col span={24}>Tỉnh/TP:</Col>
                        <Col span={24}>
                          <Select
                            disabled={!(selectDiaChi == -1)}
                            style={{
                              width: "100%",
                            }}
                            showSearch
                            labelInValue
                            value={
                              selectDiaChi != -1
                                ? diaChiChon.tinh
                                : diaChiMoi.tinh
                            }
                            onChange={handleChonHuyen}
                            filterOption={(input, option) =>
                              option.children
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                            }
                          >
                            {danhSachTinh
                              ? danhSachTinh.map((option) => (
                                <Select.Option
                                  key={option.ProvinceID}
                                  value={option.ProvinceID}
                                >
                                  {option.NameExtension[0]}
                                </Select.Option>
                              ))
                              : ""}
                          </Select>
                        </Col>
                      </Row>
                    </Col>
                    <Col span={11} offset={1}>
                      <Row
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Col span={24}>Huyện:</Col>
                        <Col span={24}>
                          <Select
                            disabled={!(selectDiaChi == -1)}
                            style={{
                              width: "100%",
                            }}
                            showSearch
                            labelInValue
                            value={
                              selectDiaChi != -1
                                ? diaChiChon.huyen
                                : diaChiMoi.huyen
                            }
                            onChange={handleChonXa}
                            filterOption={(input, option) =>
                              option.children
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                            }
                          >
                            {danhSachHuyen
                              ? danhSachHuyen.map((option) => (
                                <Select.Option
                                  key={option.DistrictID}
                                  value={option.DistrictID}
                                >
                                  {option.DistrictName}
                                </Select.Option>
                              ))
                              : ""}
                          </Select>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row
                    style={{
                      marginTop: "14px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Col span={11}>
                      <Row
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Col span={24}>Xã:</Col>
                        <Col span={24}>
                          <Select
                            disabled={!(selectDiaChi == -1)}
                            style={{
                              width: "100%",
                            }}
                            showSearch
                            labelInValue
                            value={
                              selectDiaChi != -1
                                ? diaChiChon.xa
                                : diaChiMoi.xa
                            }
                            onChange={handleChonDiaChiXa}
                            filterOption={(input, option) =>
                              option.children
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                            }
                          >
                            {danhSachXa
                              ? danhSachXa.map((option) => (
                                <Select.Option
                                  key={option.WardCode}
                                  value={option.WardCode}
                                >
                                  {option.NameExtension[0]}
                                </Select.Option>
                              ))
                              : ""}
                          </Select>
                        </Col>
                      </Row>
                    </Col>
                    <Col span={11} offset={1}>
                      <Row
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Col span={24}>Số điện thoại:</Col>
                        <Col span={24}>
                          <Input
                            onChange={(e) => {
                              setHoaDonRequest({
                                ...hoaDonRequest,
                                soDienThoai: e.target.value
                              })
                            }}
                            value={hoaDonHienTai ? hoaDonHienTai.soDienThoai : ""}
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row
                    style={{
                      marginTop: "14px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Col
                      span={24}
                      style={{
                        marginBottom: "8px",
                      }}
                    >
                      Chi tiết địa chỉ:
                    </Col>
                    <Col span={23}>
                      <TextArea
                        onChange={(e) => {
                          setHoaDonRequest({
                            ...hoaDonRequest,
                            chiTietDiaChi: e.target.value
                          })
                        }}
                        disabled={!(selectDiaChi == -1)}
                        rows={4}
                        placeholder={"Chi tiết địa chỉ"}
                      />
                    </Col>
                  </Row>
                  <Row
                    style={{
                      marginTop: "14px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Col span={11}>
                      <Row
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Col span={24}>Phương thức thanh toán:</Col>
                        <Col span={24}>
                          <Select
                            style={{
                              width: "100%",
                            }}
                            showSearch
                            labelInValue
                            defaultValue={"Phương thức thanh toán"}
                            onChange={(e) => {
                              setHoaDonRequest({
                                ...hoaDonRequest,
                                phuongThucThanhToan: e.key
                              })
                            }}
                            filterOption={(input, option) =>
                              option.children
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                            }
                          >
                            <Select.Option
                              key={1}
                              value={1}
                            >
                              VN Pay
                            </Select.Option>
                            <Select.Option
                              key={3}
                              value={3}
                            >
                              Mua tại quầy
                            </Select.Option>
                          </Select>
                        </Col>
                      </Row>
                    </Col>
                    <Col span={11} offset={1}>
                      <Row
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Col span={24}>Phương thức vận chuyển:</Col>
                        <Col span={24}>
                          <Select
                            style={{
                              width: "100%",
                            }}
                            showSearch
                            labelInValue
                            defaultValue={"Vận chuyển"}
                            onChange={(e) => {
                              setHoaDonRequest({
                                ...hoaDonRequest,
                                phuongThucVanChuyen: e.key
                              })
                            }}
                            filterOption={(input, option) =>
                              option.children
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                            }
                          >
                            <Select.Option
                              key={1}
                              value={1}
                            >
                              Giao hàng nhanh
                            </Select.Option>
                            <Select.Option
                              key={3}
                              value={3}
                            >
                              Lấy tại cửa hàng
                            </Select.Option>
                          </Select>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row
                    style={{
                      marginTop: "14px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Col span={11}>
                      <Row
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Col span={23}>Voucher:</Col>
                        <Col span={24}>
                          <Input value={"CMD"} />
                        </Col>
                      </Row>
                    </Col>
                    <Col span={11} offset={1}>
                      <Row
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Col span={24}>Tổng tiền sản phẩm:</Col>
                        <Col span={24}>
                          <Input
                            addonAfter={<FcMoneyTransfer />}
                            value={fixMoney(
                              gioHangHienTai
                                ? gioHangHienTai.reduce((a, b) => {
                                  return a + b.soLuong * b.donGia;
                                }, 0)
                                : 0
                            )}
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row
                    style={{
                      marginTop: "14px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Col span={24}>
                      <Row
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Col span={23}>Ghi chú:</Col>
                        <Col span={23}>
                          <TextArea onChange={(e) => {
                            setHoaDonRequest({
                              ...hoaDonRequest,
                              ghiChu: e.target.value
                            })
                          }} rows={4} placeholder="Ghi chú" />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row
                    style={{
                      marginTop: "14px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Col span={24}>
                      <Row
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Col
                          span={23}
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                          }}
                        >
                          <Button
                            style={{
                              width: "120px",
                            }}
                            type="primary"
                            block
                            onClick={() => {
                              if (hoaDonRequest) {
                                if (!hoaDonRequest.khachHangId) {
                                  openNotification(
                                    "error",
                                    "Hệ thống",
                                    "Chưa chọn khách hàng",
                                    "bottomRight"
                                  );
                                  return
                                }
                                if (!hoaDonRequest.phuongThucThanhToan) {
                                  openNotification(
                                    "error",
                                    "Hệ thống",
                                    "Vui lòng chọn phương thức thanh toán",
                                    "bottomRight"
                                  );
                                  return
                                }
                                if (!hoaDonRequest.phuongThucVanChuyen) {
                                  openNotification(
                                    "error",
                                    "Hệ thống",
                                    "Vui lòng chọn phương thức vận chuyển",
                                    "bottomRight"
                                  );
                                  return
                                }
                              }
                              if (selectDiaChi == -1) {
                                if (!hoaDonRequest.tinhId) {
                                  openNotification(
                                    "error",
                                    "Hệ thống",
                                    "Vui lòng chọn tỉnh",
                                    "bottomRight"
                                  );
                                  return
                                }
                                if (!hoaDonRequest.huyenId) {
                                  openNotification(
                                    "error",
                                    "Hệ thống",
                                    "Vui lòng chọn huyện",
                                    "bottomRight"
                                  );
                                  return
                                }
                                if (!hoaDonRequest.xaId) {
                                  openNotification(
                                    "error",
                                    "Hệ thống",
                                    "Vui lòng chọn xã",
                                    "bottomRight"
                                  );
                                  return
                                }
                                setConfirmDiaChiMoi(true)
                              } else {
                                setTaoHoaDon(true)
                              }
                            }}
                          >
                            Tạo hóa đơn
                          </Button>
                          <Modal centered title="Tạo mới địa chỉ" open={confirmDiaChiMoi} onOk={() => {
                            taoHoaDonTaiQuayRequest()
                          }}
                            onCancel={() => {
                              setConfirmDiaChiMoi(false)
                            }}>
                            <p>Địa chỉ này chưa tồn tại cần tạo mới?</p>

                          </Modal>
                          <Modal centered title="Xác nhận tạo hóa đơn" open={taoHoaDon} onOk={() => {
                            taoHoaDonTaiQuayRequest()
                          }}
                            onCancel={() => {
                              setTaoHoaDon(false)
                            }}>
                            <p>Tạo hóa đơn</p>

                          </Modal>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
                <Col span={12}>
                  <Row>
                    <Col span={4}>
                      <Button icon={<GrScan />} onClick={() => {
                        setIsOpen(true)
                      }}>
                        Quét mã
                      </Button>
                      {
                        isOpen && <QRCode setOpen={setIsOpen} />
                      }
                    </Col>
                    <Col span={19} offset={1}>
                      <Select
                        style={{
                          width: "100%",
                        }}
                        showSearch
                        labelInValue
                        defaultValue={"Chọn sản phẩm"}
                        onChange={handleChonSanPham}
                        filterOption={(input, option) =>
                          option.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        {sanPhamChiTiet
                          ? sanPhamChiTiet.map((option) => (
                            <Select.Option key={option.id} value={option.id}>
                              {option.tenSanPham}
                              <Tag
                                color="success"
                                style={{
                                  marginLeft: "4px",
                                }}
                              >
                                {option.mauSac.tenMau}
                              </Tag>
                              <Tag color="processing">
                                {option.kichThuoc.tenKichThuoc}
                              </Tag>
                              <span
                                style={{
                                  fontWeight: "700",
                                  marginLeft: "12px",
                                }}
                              >
                                Số lượng còn: {option.soLuongTon}
                              </span>
                            </Select.Option>
                          ))
                          : ""}
                      </Select>
                    </Col>
                  </Row>
                  <Row
                    style={{
                      marginTop: "12px",
                      width: "100%",
                    }}
                  >
                    <Col
                      span={24}
                      style={{
                        height: "90vh",
                        overflow: "scroll",
                      }}
                    >
                      <Table
                        pagination={{ pageSize: 50, position: ["none"] }}
                        columns={columns}
                        dataSource={gioHangHienTai}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default BanTaiQuay;
