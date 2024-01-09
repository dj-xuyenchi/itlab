import axiosIns from "../../../../../plugins/axios"

export const useHoaDonHuyStore = {
    actions: {
        async fetchHoaDonHuy(payload) {
            return axiosIns.get(`/api/nguoi-dung/layhoadonhuynguoidung?nguoiDungId=` + payload)
        },
        async xacNhanHoaDon(payload) {
            return axiosIns.post('/api/admin/xacnhanhoadon',payload)
        },
    },
}
