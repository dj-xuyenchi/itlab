import React, { useEffect, useState, useRef } from 'react';
import { Table, Button, message, Tag, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
// import { PauseCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

import AddGift from './AddGift';
import ModalU from './ModalU';

import axios from 'axios';

import MenuAdmin from '../layout/menu/MenuAdmin';
import Header from '../layout/header/Header';



export default function Voucher() {
    const searchInput = useRef(null);
    const [giftvouchers, setGiftVouchers] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchTextGift] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [resetTable, setResetTableGift] = useState(false);


    // 

    // 

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchTextGift(selectedKeys[0]);
        setSearchedColumn(dataIndex);
        message.info(`Đã lọc theo cột ${dataIndex} hãy nhấn "reset" để cập nhật lại dữ liệu`);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchTextGift('');
        setSearchedColumn('');
        setResetTableGift(true);
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
        }) => (
            <div style={{ padding: 8 }}>

                <Space>
                    <Button
                        type="primary"
                        onClick={() =>
                            handleSearch(selectedKeys, confirm, dataIndex)
                        }
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current.select(), 1);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <span style={{ backgroundColor: '#ffc069' }}>{text}</span>
            ) : (
                text
            ),
    });

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
            ...getColumnSearchProps('id'),
        },
        {
            title: 'Mã người dùng',
            dataIndex: 'maNguoiDung',
            key: 'maNguoiDung',
            ...getColumnSearchProps('maNguoiDung'),
        },

        {
            title: "Ảnh đại diện",
            dataIndex: "anhDaiDien",
            key: "anhDaiDien",
            width: "15%",
            render: (anhDaiDien) => (
                <img src={anhDaiDien} style={{ width: "80px", height: "80px" }} />
            ),
        },

        {
            title: 'Số điện thoại',
            dataIndex: 'soDienThoai',
            key: 'soDienThoai',
        },
        {
            title: 'Tên ',
            dataIndex: 'ten',
            key: 'ten',
        },

        {
            title: 'Các voucher',
            dataIndex: '',
            key: 'x',
            render: (record) => <div>
                {/* <ModalU recordId={record.id} onActionSuccess={reloadVouchers} />
                <ModalD recordId={record.id} onActionSuccess={reloadVouchers} /> */}
            </div>

        },
    ];

    useEffect(() => {
        loadGiftVouchers();
    }, [resetTable]);

    const loadGiftVouchers = async () => {
        try {
            setLoading(true);
            const result = await axios.get('http://localhost:8089/api/voucher/giftvoucher');
            setGiftVouchers(result.data);
            setSearchResults(result.data);
        } catch (error) {
            console.error('Error loading vouchers:', error);
        } finally {
            setLoading(false);
        }

        setResetTableGift(false);
    };
    // const reloadVouchers = async () => {
    //     try {
    //         setLoading(true);
    //         const result = await axios.get('http://localhost:8089/api/voucher/giftvoucher');
    //         setGiftVouchers(result.data);
    //         setSearchResults(result.data);
    //     } catch (error) {
    //         console.error('Error reloading vouchers:', error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };
    // them tất cả người dùng có voucher





    return (
        <div>
            <Header />
            <MenuAdmin />


            <div className="body-container" >
                <div className="button"
                    style={{
                        display: 'flex',
                        justifyContent: "flex-end",
                        margin: "10px",

                    }}>

                    <ModalU />
                    <br />
                    -
                    <br />
                    <AddGift/>

                </div>

                <Table
                    columns={columns}
                    dataSource={searchResults}
                    loading={loading}
                    pagination={{ pageSize: 10 }}
                    key={resetTable ? 'reset' : 'table'}
                    style={{ margin: '10px' }} />
            </div>
        </div >

    );
}








