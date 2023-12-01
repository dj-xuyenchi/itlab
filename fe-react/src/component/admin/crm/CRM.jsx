// import MyComponent from './Example/MyComponent';
import { Button, Col, Modal, Row, notification } from "antd";
import Header from "../layout/header/Header";
import MenuAdmin from "../layout/menu/MenuAdmin";
import { useEffect, useRef, useState } from "react";
import { useGpt } from "../../../plugins/gpt";
import ThongKeBar from "../dashboard/chart/ThongKeBar";
import ModalTaoSuKien from "./ModalTaoSuKien";
import { cmr } from "./context";
import "./style.css";
import { useCrm } from "./crmStore";
function CRM() {
    const [api, contextHolder] = notification.useNotification();
    const [isFetching, setIsFetching] = useState(false)
    const [profit, setProfit] = useState(undefined)
    const [sussgest, setSussgest] = useState(false)
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
    async function handleSendContext2GPT(context) {
        const data = await useGpt.actions.chat(context)
        handleSetText(data.data.choices[0].message.content + `\n
        Dưới đây là một vài gợi ý về chiến lược kinh doanh
        `)
    }

    const showContentSpan = useRef(undefined)
    function handleSetText(content) {
        let i = 0
        let dataChat = ""
        const interval = setInterval(() => {
            if (i === content.length) {
                clearInterval(interval)
                setSussgest(true)
            }
            if (content[i] != undefined) {
                dataChat = dataChat + content[i]
                if (showContentSpan.current !== undefined) {
                    showContentSpan.current.innerHTML = dataChat
                }
                i++
            }
        }, 1)

    }
    async function handleLayDoanhThu12Thang() {
        const data = await useCrm.actions.layDoanhThu12Thang();
        setProfit(data.data)
    }

    useEffect(() => {
        handleLayDoanhThu12Thang()
    }, [])
    return (
        <>
            {contextHolder}
            <div>
                <Header />
                <MenuAdmin />
                <div className="body-container">
                    <div className="content">
                        <Row style={{
                            backgroundColor: "#ffffff",
                            padding: "12px 12px"
                        }}>
                            <Col span={24}>
                                <ThongKeBar subTitle="Đơn vị Đ" data={profit} title="Doanh thu theo tháng" /> </Col>
                            <Col span={24}>
                                <Button
                                    style={{
                                        marginLeft: "12px",
                                    }}
                                    type="primary"
                                    onClick={() => {
                                        setIsFetching(true)
                                        handleSendContext2GPT(cmr(profit))
                                        setIsFetching(false)
                                    }}
                                    loading={isFetching}
                                >
                                    Đánh giá doanh số 12 tháng
                                </Button></Col>
                        </Row>

                        <Row style={{
                            backgroundColor: "#ffffff",
                            padding: "12px 12px"
                        }}>
                            <span ref={showContentSpan}></span>
                            {sussgest && <>
                                <ModalTaoSuKien profit={profit} />
                                -
                                <span onClick={() => {
                                }} className="sussgest">  đánh giá những sản phẩm nên giảm giá theo doanh số bán ra</span>
                            </>}
                        </Row>
                        <Row style={{
                            backgroundColor: "#ffffff",
                            padding: "12px 12px",
                        }}>
                            <Col span={24}>
                                {/* <Button
                                    style={{
                                        marginRight: "12px",
                                    }}
                                    type="primary"

                                >
                                    Sự kiện giảm giá
                                </Button> */}

                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CRM;
