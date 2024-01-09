import axiosIns from "../../../../../plugins/axios"

export const useHoaDonChoStore = {
    actions: {
        async fetchHoaDonCho(payload) {
            return axiosIns.get(`/api/nguoi-dung/layhoadonchonguoidung?nguoiDungId=` + payload)
        },
        async xacNhanHoaDon(payload) {
            return axiosIns.post('/api/admin/xacnhanhoadon', payload)
        },
        async huyHoaDon(payload) {
            return axiosIns.post('/api/admin/huyhoadon', payload)
        },
    },
}
