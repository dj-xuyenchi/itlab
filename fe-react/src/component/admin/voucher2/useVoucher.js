import axiosIns from "../../../plugins/axios"

export const useVoucher = {
    actions: {
        async layVouchet() {
            return axiosIns.get('/api/voucher2/layhetvoucher')
        },
        async themVoucher(payload) {
            return axiosIns.post('/api/voucher2/themvoucher', payload)
        },
        async suaVouchet(payload) {
            return axiosIns.post('/api/voucher2/suavoucher', payload)
        },
        async xoaVouchet(payload) {
            return axiosIns.get('/api/voucher2/xoavoucher?voucherId=' + payload)
        },
    },
}
