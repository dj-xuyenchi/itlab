import { Button, Col, Divider, Image, Menu, Row, Tag, notification } from "antd";
import "./style.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHoaDonNguoiDung } from "./useHoaDonStore";
import { fixMoney } from "../../../../extensions/fixMoney";
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
            <Row style={{
                width: "100%"
            }}>
                {data && data.map((item) => {
                    return <Row style={{
                        width: "100%"
                    }}>
                        <Divider />
                        <h5>Mã HD: {item.maHoaDon}</h5>
                        <Row style={{
                            marginTop: "12px", width: "100%"
                        }}>
                            {item.hoaDonChiTietList && item.hoaDonChiTietList.map((item2) => {
                                return <div style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    marginBottom: "8px",
                                    cursor: "pointer"
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
                                        <span style={{
                                            color: "red"
                                        }}>X {item2.soLuong} cái</span>
                                        <div>
                                            <span style={{
                                                color: "red"
                                            }}>{fixMoney(item2.donGia)}</span>
                                        </div>
                                    </div>

                                </div>
                            })}
                            <Divider />
                        </Row>
                    </Row>
                })}
            </Row>
        </>
    );
}

export default ChoXacNhan;
