import axiosIns from "../../../../plugins/axios"

export const useSanPhamStore = {
    actions: {
        async fetchSanPham1(payload) {
            const response = await axiosIns.get('/apps/email/emails', { params: payload })
            const { emails, emailsMeta } = response.data

            this.emails = emails
            this.emailsMeta = emailsMeta
        },
        async fetchSanPham(
            page,
            pageSize,
            chatLieuId,
            thietKeId,
            thuongHieuId,
            mauSacId,
            loaiSanPhamId,
            kichThuocId
        ) {
            return await axiosIns.get(`/api/sanpham/phantrangsanpham?loaiSanPhamId=${loaiSanPhamId}&kichThuocId=${kichThuocId}&page=${page}&pageSize=${pageSize}&chatLieuId=${chatLieuId}&thietKeId=${thietKeId}&thuongHieuId=${thuongHieuId}&mauSacId=${mauSacId}&loaiSanPhamId=${loaiSanPhamId}`)
        },
        async updateEmails(ids, data) {
            return axiosIns.post('/apps/email/update-emails/', {
                ids,
                data,
            })
        },
        async updateEmailLabels(ids, label) {
            return axiosIns.post('/apps/email/update-emails-label', {
                ids,
                label,
            })
        },
    },
}
