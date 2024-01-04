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
        async capNhatDiaChiMacDinh(nguoiDungId, diaChiId) {
            const response = await axiosIns.post(`/api/nguoi-dung/capnhatdiachimacdinh`, null, {
                params: {
                    nguoiDungId,
                    diaChiId
                }
            });
            return response;
        },
        async themDiaChiNguoiDung(diaChi, nguoiDungId) {
            const response = await axiosIns.post(`/api/nguoi-dung/themdiachinguoidung`, {
                ...diaChi,
                nguoiDung: { id: nguoiDungId }
            });
            return response;
        },
    },
}
