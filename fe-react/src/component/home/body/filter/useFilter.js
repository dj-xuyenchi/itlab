import axiosIns from "../../../../plugins/axios"

export const useFilterStore = {
    actions: {
        async layThuocTinh() {
            const response = await axiosIns.get(`/api/sanpham/laythuoctinh`)
            return response
        },
    },
}