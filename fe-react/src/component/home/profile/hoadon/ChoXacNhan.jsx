import { Button, Col, Divider, Image, Menu, Row, Tag, notification } from "antd";
import "./style.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHoaDonNguoiDung } from "./useHoaDonStore";
function ChoXacNhan({ nguoiDungId }) {
    const [data, setData] = useState(undefined)
    async function handleLayHoaDonCho() {
        const fet = await useHoaDonNguoiDung.actions.layHoaDon({
            nguoiDungId: nguoiDungId,
            type: 1
        })
        setData(fet.data)
    }
    useEffect(() => {
        handleLayHoaDonCho()
    }, [])
    return (
        <>
            <Row>
                {data && data.map((item) => {
                    return <Row>
                        <Row>
                            <h3 style={{
                                color: "red",
                                fontSize: "16px",
                                lineHeight: "24px",
                                fontFamily: "sans-serif",
                                whiteSpace: "nowrap"
                            }}>Chờ xác nhận</h3>
                            <Divider />
                            {item.hoaDonChiTietList && item.hoaDonChiTietList.map((item2) => {
                                return <div style={{
                                    display: "flex",
                                    flexDirection: "row"
                                }}>
                                    <Image src={item2.sanPhamChiTiet.hinhAnh} style={{
                                        height: "120px",
                                        width: "80px"
                                    }} />
                                    <div style={{
                                        marginLeft: "8px",
                                        display: "flex",
                                        flexDirection: "column"
                                    }}>
                                        <span >{item2.sanPhamChiTiet.tenSanPham}</span>
                                        <div>
                                            <Tag color="#108ee9">{item2.sanPhamChiTiet.mauSac.tenMau}</Tag>
                                            <Tag color="#108ee9">{item2.sanPhamChiTiet.kichThuoc.tenKichThuoc}</Tag>
                                        </div>
                                    </div>

                                </div>
                            })}
                        </Row>
                    </Row>
                })}
            </Row>
        </>
    );
}

export default ChoXacNhan;
