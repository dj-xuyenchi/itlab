export const fixNgayThang = (chuoiThoiGian) => {
    var thoiGian = new Date(chuoiThoiGian);

    // Lấy thông tin ngày, tháng, năm, giờ, phút, giây
    var ngay = thoiGian.getDate();
    var thang = thoiGian.getMonth() + 1; // Tháng bắt đầu từ 0, cần cộng thêm 1
    var nam = thoiGian.getFullYear();
    var gio = thoiGian.getHours();
    var phut = thoiGian.getMinutes();
    var giay = thoiGian.getSeconds();

    // Định dạng thêm số 0 nếu cần thiết (ví dụ: 05 thay vì 5)
    ngay = ngay < 10 ? '0' + ngay : ngay;
    thang = thang < 10 ? '0' + thang : thang;
    gio = gio < 10 ? '0' + gio : gio;
    phut = phut < 10 ? '0' + phut : phut;
    giay = giay < 10 ? '0' + giay : giay;

    // Tạo chuỗi ngày tháng năm giờ phút giây
    var ngayThangNamGioPhutGiay = ngay + '/' + thang + '/' + nam + ' ' + gio + ':' + phut + ':' + giay;

    return ngayThangNamGioPhutGiay;
}