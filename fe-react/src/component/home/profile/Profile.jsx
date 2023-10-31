import { useSelector } from "react-redux";
import "./style.css";
import { selectLanguage } from "../../../language/selectLanguage";
import Header from "../../common/header/Header";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNguoiDungStore } from "./useNguoiDungStore";
import { Menu } from "antd";
import ChiTietNguoiDung from "./ChiTietNguoiDung";
import { BiUser } from 'react-icons/bi';
import { MdOutlineLocalShipping, MdSecurity } from 'react-icons/md';
import { RiBillLine } from 'react-icons/ri';

const items = [
    {
        label: 'Thông tin cá nhân',
        key: 'profile',
        icon: <BiUser />,
    },
    {
        label: 'Địa chỉ nhận hàng',
        key: 'address',
        icon: <MdOutlineLocalShipping />,
    },
    {
        label: 'Đơn mua',
        key: 'bill',
        icon: <RiBillLine />,
    },
    {
        label: 'Bảo mật',
        key: 'security',
        icon: <MdSecurity />,
    }
];
function Profile() {
    const param = useParams();
    const [current, setCurrent] = useState('profile');
    const [nguoiDung, setNguoiDung] = useState(undefined)
    const onClick = (e) => {
        setCurrent(e.key);
    };
    useEffect(() => {
        async function getNguoiDung() {
            const data = await useNguoiDungStore.actions.layThongTinNguoiDung(param.id ? param.id : -1)
            setNguoiDung(data.data)
        }
        getNguoiDung()
    }, [])
    return (
        <>
            <Header />

            <div style={{
                width: "1028px",
                marginLeft: "auto",
                marginRight: "auto"
                , display: "flex",
                flexDirection: "row"
            }}>
                <div className="menu-profile">

                    <Menu
                        onClick={onClick} selectedKeys={[current]} items={items} />
                </div>
                <div className="content-profile">
                    {current == 'profile' ? <ChiTietNguoiDung user={nguoiDung} /> : ""}
                </div>
            </div>
        </>
    );
}

export default Profile;
