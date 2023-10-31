import { Button, Col, Radio, Row } from "antd";
import "./style.css";
import { useState } from "react";

function ChiTietNguoiDung({ user }) {
    const [value, setValue] = useState(user ? user.gioiTinh ? 1 : 2 : 0);
    const onChangeGioiTinh = (e) => {
        setValue(e.target.value);
    };
    return (
        <>
            {user ? <><h4 style={{
                fontStyle: "normal",
                fontWeight: 700,
                fontSize: "20px", marginBottom: "4px"
            }}>Thông tin cá nhân</h4>
                <p style={{
                    marginBottom: "12px",
                    fontWeight: 400,
                    fontSize: "15px", fontStyle: "normal",
                }}>Bạn có thể cập nhật thông tin của mình ở trang này</p>
                <Row>
                    <Col span={6}>
                        <p>Họ<span style={{
                            color: "red"
                        }}>*</span></p>
                        <input value={user.ho} type="text" className="input-profile" />
                    </Col>
                    <Col span={1}></Col>
                    <Col span={6}>
                        <p>Tên<span style={{
                            color: "red"
                        }}>*</span></p>
                        <input value={user.ten} type="text" className="input-profile" />
                    </Col>
                </Row>
                <Row style={{
                    marginTop: "12px"
                }}>
                    <Col span={13}>
                        <p>Email<span style={{
                            color: "red"
                        }}>*</span></p>
                        <input value={user.email} type="text" className="input-profile" />
                    </Col>
                </Row>
                <Row style={{
                    marginTop: "12px"
                }}>
                    <Col span={13}>
                        <p>SĐT<span style={{
                            color: "red"
                        }}>*</span></p>
                        <input disabled value={user.soDienThoai} type="text" className="input-profile" />
                    </Col>
                </Row>
                <Row style={{
                    marginTop: "12px"
                }}>
                    <Col span={13}>
                        <p>Giới tính</p>
                        <Radio.Group onChange={onChangeGioiTinh} value={value}>
                            <Radio value={1}>Nam</Radio>
                            <Radio value={2}>Nữ</Radio>
                        </Radio.Group>
                    </Col>
                </Row>
                <Row style={{
                    marginTop: "12px"
                }}>
                    <Col span={13}>
                        <p>Xếp hạng</p>
                        <p style={{
                            fontWeight: 700
                        }}>{user.rankKhachHang.tenRank}</p>
                    </Col>
                </Row>
                <Row style={{
                    marginTop: "12px"
                }}>
                    <Col span={4}>
                        <Button type="primary">Cập nhật</Button>
                    </Col>
                </Row></> : ""}
        </>
    );
}

export default ChiTietNguoiDung;
