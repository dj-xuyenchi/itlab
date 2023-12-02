import React, { Component, useEffect, useState } from 'react'
import { Input, Table, Button, Form, Tag } from 'antd';

import axios from 'axios';
import "./style.css";

import ModalU from './ModalU';
import ModalD from './ModalD';
import ModalA from './ModalA';

const { Search } = Input;
export default function Voucher() {
    const column = [
        {

            title: 'Id',
            dataIndex: 'id',
            key: 'id',
            // render: (text) => `V_${text}`,
        },
        {

            title: 'Tên Voucher',
            dataIndex: 'tenVoucher',
            key: 'tenVoucher'
        },
        {
            title: 'Mã Voucher',
            dataIndex: 'maVoucher',
            key: 'maVoucher',
        },
        {
            title: 'Loại giảm',
            dataIndex: 'loaiGiam',
            key: 'loaiGiam',
        }, {
            title: 'Giá trị hiển thị',
            dataIndex: 'giaTriGiam',
            key: 'giaTriGiamDisplay',
            render: (giaTriGiam, record) => {
                if (record.loaiGiam === 'PHANTRAM') {
                    return `${giaTriGiam} %`;
                } else if (record.loaiGiam === 'GIAMTHANG') {
                    return `${giaTriGiam}` + ' ₫';
                }
                return giaTriGiam;
            },
        },
        {
            title: 'Số lượng',
            dataIndex: 'soLuong',
            key: 'soLuong',
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'ngayTao',
            key: 'ngayTao',
        },
        {
            title: "Ngày cập nhật",
            dataIndex: "ngayCapNhat",
            key: "ngayCapNhat",
            width: "15%",
            render: (ngayCapNhat) => (
                <>{ngayCapNhat ? ngayCapNhat : <Tag color="processing">Chưa cập nh</Tag>}</>
            ),
        },
        {
            title: 'Trạng thái',
            dataIndex: 'trangThai',
            key: 'trangThai',
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: (record) => <div>
                <ModalU recordId={record.id} />
                <ModalD recordId={record.id} />
            </div>

            //  <a></a>,

        },
    ];
    const [vouchers, setVouchers] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        const query = e.target.value;
        if (query) {
            const filteredResults = vouchers.filter((voucher) =>
                voucher.tenVoucher.toLowerCase().includes(query.toLowerCase())
            );
            setSearchResults(filteredResults);
        } else {
            setSearchResults(vouchers);
        }
    };
    useEffect(() => {
        LoadVouchers();
    }, []);

    const LoadVouchers = async () => {
        try {
            setLoading(true);
            const result = await axios.get("http://localhost:8080/api/voucher/test");
            setVouchers(result.data);
            setSearchResults(result.data); // Đặt dữ liệu vào cả hai state vouchers và searchResults
        } catch (error) {
            console.error("Error loading vouchers:", error);
        } finally {
            setLoading(false);
        }
    };








    // useEffect(() => {
    //     // console.log("Fighting You sure pass")
    //     LoadVouchers();
    // });






    return (
        <div>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
            <Form>
                <div className='hed'>
                    {/* <Search className='sear' placeholder="Nhập Tên Voucher" enterButton="Search" size="large" loading /> */}
                    <Search
                        className='sear'
                        placeholder="Nhập Tên Voucher"
                        enterButton="Search"
                        size="large"
                        loading={loading}
                        onChange={handleSearchChange}
                    />
                </div>


                <div className="button"
                    style={{
                        display: 'flex',
                        justifyContent: "flex-end",
                        marginBottom: "10px",
                    }}>


                    <ModalA />

                </div>
                <div className='cart'>
                    <Table dataSource={searchResults.length > 0 ? searchResults : vouchers} columns={column} loading={loading} />

                </div>
            </Form>

        </div>
    );
}
