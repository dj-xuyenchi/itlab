import axiosIns from "../../../plugins/axios"

export const useDoiTra = {
    actions: {
        async layChiTiet(payload) {
            return axiosIns.get('/api/admin/laydanhsachchitietdoitracuahoadon?hoaDonId=' + payload)
        },
    },
}
