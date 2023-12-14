// import MyComponent from './Example/MyComponent';
import {
    Image,
    Modal,
    Table,
    notification,
} from "antd";
import { useEffect, useRef, useState } from "react";
import { DatePicker } from "antd";
import { useCrm } from "../crmStore";
import { fixMoney } from "../../../../extensions/fixMoney";
import { cmr, doanhSo10SanPhamDanhGia } from "../context";
import { useGpt } from "../../../../plugins/gpt";
import ModalDanhGiaChiTiet from "./ModalDanhGiaChiTiet";
const { RangePicker } = DatePicker;
function DanhGiaTop10SanPham() {
    const [isShow, setIsShow] = useState(false);
    const [api, contextHolder] = notification.useNotification();
    const [done, setDone] = useState(true)
    const [loading, setLoading] = useState(true)
    const showContentSpan = useRef(undefined)
    const showContentSpan2 = useRef(undefined)
    function handleSetText(content) {
        let i = 0
        let dataChat = ""
        const interval = setInterval(() => {
            if (i === content.length) {
                clearInterval(interval)
                setDone(true)
            }
            if (content[i] != undefined) {
                dataChat = dataChat + content[i]
                if (showContentSpan.current !== undefined) {
                    showContentSpan.current.innerHTML = dataChat
                }
                i++
            }
        }, 30)
    }
    function handleSetText2(content) {
        let i = 0
        let dataChat = ""
        const interval = setInterval(() => {
            if (i === content.length) {
                clearInterval(interval)
            }
            if (content[i] != undefined) {
                dataChat = dataChat + content[i]
                if (showContentSpan2.current !== undefined) {
                    showContentSpan2.current.innerHTML = dataChat
                }
                i++
            }
        }, 30)
    }
    const columns = [
        {
            title: 'Hình ảnh',
            dataIndex: 'sanPham',
            width: "20%",
            render: (sanPham) => (
                <Image src={sanPham.hinhAnh1} style={{ width: "120px", height: "180px" }} />
            ),
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'sanPham',
            width: "20%",
            render: (sanPham) => (
                <span>{sanPham.tenSanPham}</span>
            ),
        },
        {
            title: 'Giá bán',
            dataIndex: 'sanPham',
            width: "15%",
            render: (sanPham) => (
                <span>{fixMoney(sanPham.giaBan)}</span>
            ),
        },
        {
            title: 'Doanh số',
            dataIndex: 'doanhSo',
            width: "15%",
            render: (doanhSo) => (
                <span>{doanhSo.reduce((pre, next) => {
                    return pre + next
                }, 0)} cái</span>
            ),
            defaultSortOrder: 'descend',
            sorter: (a, b) => a - b,
        },
        {
            title: 'Doanh thu',
            dataIndex: 'doanhSo',
            width: "15%",
            render: (doanhSo, record) => (
                <span>{fixMoney(doanhSo.reduce((pre, next) => {
                    return pre + next
                }, 0) * record.sanPham.giaBan)}</span>
            ),
        },
        {
            title: 'Action',
            dataIndex: 'sanPham',
            render: (sanPham, record) => (
                <>
                    <ModalDanhGiaChiTiet data={record} />
                </>
            ),
        },
    ];
    const [data, setData] = useState(undefined)
    async function handleLayDoanhSo() {
        const data = await useCrm.actions.layTopDoanhSo12Thang();
        setData(data.data)
    }
    async function handleSendContext2GPT() {
        const data2 = await useGpt.actions.chat(doanhSo10SanPhamDanhGia(data))
        handleSetText2(data2.data.choices[0].message.content)
    }
    useEffect(() => {
        if (isShow) {
            handleLayDoanhSo()
            handleSetText("Dựa vào dữ liệu doanh số của cửa hàng đây là TOP 10 sản phẩm bán chạy nhất trong năm 2023")
        }

    }, [isShow])
    useEffect(() => {
        if (done) {
            // handleSendContext2GPT()
        }
    }, [done])
    return (
        <>
            {contextHolder}
            -
            <span onClick={() => {
                setIsShow(true)
            }} className="sussgest">  đánh giá sản phẩm theo doanh số bán ra</span>
            <Modal title="Đánh giá sản phẩm"
                centered
                width={1268}
                open={isShow} onOk={() => {
                    setIsShow(false)
                }
                } onCancel={() => {
                    setIsShow(false)
                }}>
                {loading &&
                    <>
                        <p ref={showContentSpan}></p>
                        {done &&
                            <>
                                <Table columns={columns} dataSource={data} />
                                <p ref={showContentSpan2}></p>
                            </>
                        }
                    </>

                }
            </Modal>
        </>
    );
}

export default DanhGiaTop10SanPham;
