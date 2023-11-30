// import MyComponent from './Example/MyComponent';
import { Button, Col, Input, InputNumber, Modal, Row, Spin, notification } from "antd";
import { useEffect, useRef, useState } from "react";
import { useGpt } from "../../../plugins/gpt";
import dayjs from 'dayjs';
import { DatePicker } from 'antd';
import TextArea from "antd/es/input/TextArea";
import { taoSuKien } from "./context";
const { RangePicker } = DatePicker;
function TaoSuKienGoiY({ suKien }) {
    const [isShow, setIsShow] = useState(false)
    const [api, contextHolder] = notification.useNotification();
    const [text, setText] = useState(undefined)
    const [dataSus, setDataSus] = useState({
        tenSuKien: "Đang chờ",
        ngayBatDau: "11/11/2023",
        ngayKetThuc: "30/11/2023",
        moTa: "Sự kiện giảm giá"
    })
    const [isFetching, setIsFetching] = useState(false)

    const dateFormat = 'DD/MM/YYYY';
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
        var dataNew = "{" + data.data.choices[0].message.content.split('}')[0].split("{")[1] + "}";
        dataNew = JSON.parse(dataNew.replaceAll("\n", ""));
        setDataSus(dataNew)
    }

    const showContentSpan = useRef(undefined)
    function handleSetText(content) {
        let i = 0
        let dataChat = ""
        const interval = setInterval(() => {
            if (i === content.length) {
                clearInterval(interval)
                setIsFetching(true)
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


    useEffect(() => {
        if (isShow) {
            handleSendContext2GPT(taoSuKien(suKien))
        }
    }, [])
    return (
        <>
            {contextHolder}
            <span onClick={() => {
                setIsShow(true)
            }} className="sussgest"> {suKien}</span>
            <Modal title={"Tạo sự kiện giảm giá " + suKien} open={isShow} onOk={() => {
                setIsShow(false)
            }} onCancel={() => {
                setIsShow(false)
            }}>
                {text ? <>
                    <Row>
                        <Col span={24}>Tên sự kiện:</Col>
                        <Col span={24}
                        >
                            <Input placeholder="Tên sự kiện" value={dataSus && dataSus.tenSuKien} />
                        </Col>
                    </Row>
                    <Row style={{
                        marginTop: "4px"
                    }}>
                        <Col span={24}>Ngày bắt đầu - ngày kết thúc:</Col>
                        <Col span={24}>
                            <RangePicker value={[dayjs(dataSus && dataSus.ngayBatDau, dateFormat), dayjs(dataSus && dataSus.ngayKetThuc, dateFormat)]} format={dateFormat} style={{
                                width: "100%"
                            }} />
                        </Col>
                    </Row>
                    <Row style={{
                        marginTop: "4px"
                    }}>
                        <Col span={24}>% giảm:</Col>
                        <Col span={24}>
                            <InputNumber placeholder="% giảm" style={{
                                width: "100%"
                            }}
                                value={dataSus && dataSus.giaTriGiam}
                            />
                        </Col>
                    </Row>
                    <Row style={{
                        marginTop: "4px"
                    }}>
                        <Col span={24}>Mô tả:</Col>
                        <Col span={24}>
                            <TextArea placeholder="% giảm" rows={4} value={dataSus && dataSus.moTa} />
                        </Col>
                    </Row></> : <Spin tip="Loading" size="large">
                    <div className="content" />
                </Spin>}
            </Modal>
        </>
    );
}

export default TaoSuKienGoiY;
