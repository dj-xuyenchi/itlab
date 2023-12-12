// import MyComponent from './Example/MyComponent';
import {
    Modal,
    Tag,
    notification,
} from "antd";
import { useEffect, useRef, useState } from "react";
import { DatePicker } from "antd";
import BieuDo12Thang from "./BieuDo12Thang";
import { useGpt } from "../../../../plugins/gpt";
import { danhGiaSanPham } from "../context";
import BieuDoTheoOption from "./BieuDoTheoOption";
import { useCrm } from "../crmStore";
import SoSanhKhoangThoiGian from "./SoSanhKhoangThoiGian";
const { RangePicker } = DatePicker;
function ModalDanhGiaChiTiet({ data }) {
    const [isShow, setIsShow] = useState(false);
    const [api, contextHolder] = notification.useNotification();
    const [chiTietDoanhSo, setChiTietDoanhSo] = useState(undefined)
    const [done, setDone] = useState([])
    const showContentSpan1 = useRef(undefined)
    const showContentSpan2 = useRef(undefined)
    function handleSetText(content, ref, set = () => { }, react = null) {
        let i = 0
        let dataChat = ""
        const interval = setInterval(() => {
            if (i === content.length) {
                clearInterval(interval)
                set(react)
            }
            if (content[i] != undefined) {
                dataChat = dataChat + content[i]
                if (ref.current !== undefined) {
                    ref.current.innerHTML = dataChat
                }
                i++
            }
        }, 1)
    }
    async function handleLayChiTiet() {
        const data2 = await useCrm.actions.layChiTiet(data.sanPham.id)
        setChiTietDoanhSo(data2.data)
        console.log(data2.data);
    }
    useEffect(() => {
        if (isShow) {
            handleLayChiTiet()
            if (showContentSpan1) {
                var arr = [...done];
                arr[0] = true;
                handleSetText("Dưới đây là đánh giá chi tiết về " + data.sanPham.tenSanPham + " của tôi.", showContentSpan1, setDone, arr)
            }
        }
    }, [isShow])
    async function handleSendContext2GPT() {
        const data2 = await useGpt.actions.chat(danhGiaSanPham(data))
        var arr = [...done];
        arr[1] = true;
        handleSetText(data2.data.choices[0].message.content, showContentSpan2, setDone, arr)
    }
    useEffect(() => {
        if (done[0]) {
            if (showContentSpan2) {
                //   handleSendContext2GPT()
            }
        }
    }, [done])

    return (
        <>
            {contextHolder}
            <Tag color="processing">
                <span onClick={() => {
                    setIsShow(true)
                }} className="sussgest"> Đánh giá chi tiết</span>
            </Tag>
            <Modal title="Đánh giá chi tiết sản phẩm"
                centered
                width={1400}
                open={isShow}
                onOk={() => {
                    setIsShow(false)
                }
                }
                onCancel={() => {
                    setIsShow(false)
                }}>
                <p ref={showContentSpan1}></p>
                <BieuDo12Thang data={data.doanhSo} />
                {
                    done[0] && <p ref={showContentSpan2}></p>
                }
                {
                    true && <BieuDoTheoOption data={chiTietDoanhSo} />
                }
                {
                    true &&
                    <>                    <p style={{
                        color: "red"
                    }}>Cụ thể hơn thì dưới đây là so sánh với doanh số của năm ngoái.</p>
                        <SoSanhKhoangThoiGian />
                    </>


                }
            </Modal>
        </>
    );
}

export default ModalDanhGiaChiTiet;
