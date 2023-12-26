import axiosIns from "../../../plugins/axios"

export const useSuKienGiamGiaStore = {
    actions: {
        async themSuKienGG(payload) {
            return axiosIns.post('/api/sukiengiamgia/themsukiengg', payload, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
        },
        async fetchSuKienGiamGia() {
            return axiosIns.get('/api/sanphamsukien/get-all-sukiengiamgia'
            )
        },
        async themSuKienGiamGia(payload) {
            return axiosIns.post('/api/sukiengiamgia/themsukiengiamgia', payload
            )
        },
        async suaSuKienGiamGia(payload) {
            return axiosIns.put('/api/sukiengiamgia/suasukiengiamgia', payload
            )
        },
        async laySuKienGiamGiaById(payload) {
            return axiosIns.get('/api/sukiengiamgia/laysukiengiamgiabyid?sukienGiamGiaId=' + payload
            )
        },
        async xoaSuKienGiamGiaId(payload) {
            return axiosIns.get('/api/sukiengiamgia/xoasukiengiamgia?suKienGiamGiaId=' + payload
            )
        },
    },
}

