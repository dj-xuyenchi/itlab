import axiosIns from "../../../plugins/axios"

export const useBanTaiQuayStore = {
    actions: {
        async layHoaDonTaiQuay() {
            return axiosIns.get('/api/admin/layhoadontaiquay')
        },
        async taoHoaDon(payload) {
            return axiosIns.get('/api/admin/taohoadontaiquay?nhanVienId=' + payload)
        },
        async fetSanPhamChiTiet() {
            return axiosIns.get('/api/admin/layhetchitiet')
        },
        async fetHoaDonChiTiet(payload) {
            return axiosIns.get('/api/admin/layhoadonchitietcuahoadon?hoaDonId=' + payload)
        },
        async themSanPhamVaoHoaDonQuay(payload) {
            return axiosIns.get('/api/admin/themsanphamvaohoadonquay?hoaDonId=' + payload.hoaDonId + '&sanPhamId=' + payload.sanPhamId)
        },
        async thayDoiSoLuong(payload) {
            return axiosIns.get('/api/admin/thaydoisoluongspchitiet?chiTietId=' + payload.chiTietId + '&soLuongMoi=' + payload.soLuongMoi)
        },
        async xoaHoaDonChiTiet(payload) {
            return axiosIns.get('/api/admin/xoaspchitiet?chiTietId=' + payload)
        },
    },
}
