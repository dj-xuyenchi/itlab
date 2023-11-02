import axiosIns from "../../../../plugins/axios"

export const useChatLieuStore = {
    actions: {
        async fetchChatLieu() {
            return axiosIns.get('/api/sanpham/laychatlieu'
            )
        },
    },
}
