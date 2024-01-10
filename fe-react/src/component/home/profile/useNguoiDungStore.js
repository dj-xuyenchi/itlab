import axiosIns from "../../../plugins/axios"

export const useNguoiDungStore = {
    actions: {
        async layThongTinNguoiDung(payload) {
            const response = await axiosIns.get(`/api/nguoi-dung/laythongtinnguoidung?nguoiDungId=${payload}`)
            return response
        },
        async capNhatThongTin(payload) {
            const response = await axiosIns.post(`/api/nguoi-dung/capnhatnguoidung`, payload)
            return response
        },
        async doiMatKhau(payload) {
            const response = await axiosIns.post(`/api/nguoi-dung/doimatkhau`, payload)
            return response
        },
        async layDiaChiNguoiDung(payload) {
            const response = await axiosIns.get(`/api/nguoi-dung/laydiachinguoidung?nguoiDungId=` + payload)
            return response
        },
        async layChiTietHoaDon(payload) {
            return axiosIns.get('/api/admin/layhoadonbyid?hoaDonId=' + payload)
        },
    },
}
