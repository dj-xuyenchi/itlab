import axiosIns from "../../../../../plugins/axios"

export const useHoaDonChoGiaoStore = {
    actions: {
        async fetchHoaDonChoGiao(payload) {
            return axiosIns.get(`/api/nguoi-dung/layhoadonchogiaonguoidung?nguoiDungId=` + payload)
        },
        async xacNhanHoaDon(payload) {
            return axiosIns.post('/api/admin/xacnhandanggiao',payload)
        },
    },
}
