import axiosIns from "../../../plugins/axios"

export const useNguoiDungStore = {
    actions: {
        async layThongTinNguoiDung(payload) {
            const response = await axiosIns.get(`/api/nguoidung/laythongtinnguoidung?nguoiDungId=${payload}`)
            return response
        },
     
    },
}
