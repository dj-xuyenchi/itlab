import axiosIns from "../../../plugins/axios"

export const useBanTaiQuayStore = {
    actions: {
        async layHoaDonTaiQuay() {
            return axiosIns.get('/api/admin/layhoadontaiquay')
        },
        async taoHoaDon(payload) {
            return axiosIns.get('/api/admin/taohoadontaiquay?nhanVienId=' + payload)
        },
    },
}
