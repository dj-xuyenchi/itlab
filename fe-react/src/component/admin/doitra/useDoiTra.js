import axiosIns from "../../../plugins/axios"

export const useDoiTra = {
    actions: {
        async layChiTiet(payload) {
            return axiosIns.get('/api/admin/laydanhsachchitietdoitracuahoadon?hoaDonId=' + payload)
        },
        async laySanPhamChiTietById(payload) {
            return axiosIns.get('/api/sanpham/laysanphamchitietbyid?sanPhamChiTietId=' + payload)
        },
        async laySanPhamChiTietByMa(payload) {
            return axiosIns.get('/api/sanpham/laysanphamchitietbyma?maSp=' + payload)
        },
    },
}
