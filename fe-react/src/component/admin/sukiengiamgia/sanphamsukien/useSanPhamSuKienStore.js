import axiosIns from "../../../../plugins/axios"

export const useSanPhamSuKienStore = {
    actions: {
        async fetchSanPhamSuKien() {
            return axiosIns.get(`/api/sanphamsukien/get-all`);
          },
          
        async fetchSuKienGiamGia() {
            return axiosIns.get('/api/sanphamsukien/get-all-sukiengiamgia'
            )
        },
        async fetchNhomSanPham() {
            return axiosIns.get('/api/sanphamsukien/get-nhomsp'
            )
        },
        
    },
}

