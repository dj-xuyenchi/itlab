import axiosIns from "../../../../plugins/axios"

export const useLoginStore = {
    actions: {
        async dangNhap(payload) {
            const response = await axiosIns.post('/dangnhap', { params: payload })
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
