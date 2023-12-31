import axiosIns from "../../../../plugins/axios"

export const useFilterStore = {
    actions: {
        async layThuocTinh() {
            const response = await axiosIns.get(`/api/sanpham/laythuoctinh`)
            return response
        },
        async filter(payload) {
            var url = `/api/sanpham/phantrangsanphamfilter?`;
            if (payload.page) {
                url += 'page=' + payload.page + "&";
            }
            if (payload.pageSize) {
                url += 'pageSize=' + payload.pageSize + "&";
            }
            const response = await axiosIns.post(url, payload.filter)
            return response
        },
    },
}