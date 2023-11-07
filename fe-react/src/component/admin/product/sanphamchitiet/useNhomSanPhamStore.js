import axiosIns from "../../../../plugins/axios"

export const useNhomSanPhamStore = {
    actions: {
        async fetchChatLieu() {
            return axiosIns.get('/api/sanpham/laysanphamadmin'
            )
        },
        async fetchSanPhamChiTietCuaSanPham(payload) {
            return axiosIns.get('/api/sanpham/laysanphamchitietcuasanpham?sanPhamId=' + payload)
        },
        async themChatLieu(payload) {
            return axiosIns.post('/api/sanpham/themthietke', payload
            )
        },
        async suaChatLieu(payload) {
            return axiosIns.post('/api/sanpham/suathietke', payload
            )
        },
        async layChatLieuById(payload) {
            return axiosIns.get('/api/sanpham/laythietkebyid?thietKeId=' + payload
            )
        },
        async xoaChatLieuById(payload) {
            return axiosIns.get('/api/sanpham/xoathietke?thietKeId=' + payload
            )
        },
    },
}
