import {
    Col,
    Row,
} from "antd";
import Header from "../layout/header/Header";
import MenuAdmin from "../layout/menu/MenuAdmin";
import "./style.css";
import React, { useEffect, useState } from "react";
function ThanhToanVnPay() {
    return (
        <>
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
                    </div>
                </div>
            </div>
        </>
    );
}

export default ThanhToanVnPay;
