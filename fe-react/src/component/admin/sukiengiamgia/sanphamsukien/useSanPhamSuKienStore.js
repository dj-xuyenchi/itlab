import axiosIns from "../../../../plugins/axios";

export const useSanPhamSuKienStore = {
  actions: {
    async fetchSanPhamSuKien() {
      try {
        const response = await axiosIns.get('http://localhost:8089/api/sanphamsukien/get-page');
        return response.data.content;
      } catch (error) {
        // Xử lý lỗi khi request không thành công
        throw new Error('Không thể lấy dữ liệu sản phẩm sự kiện');
      }
    },
  },
};
