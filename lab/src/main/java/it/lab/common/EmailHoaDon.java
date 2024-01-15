package it.lab.common;

import it.lab.entity.HoaDon;

public class EmailHoaDon {
    public static String guiEmailKhiXacNhanTemplate(HoaDon hd) {
        String temple = """
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Document</title>
                </head>
                <style>
                    th,
                    td {
                        border: 1px solid black;
                        background-image: url('');
                        background-position: center;
                    }
                </style>
                                
                <body>
                    <div style="width: 70%; margin-left: 15%; ">
                        <hr>
                        <div>
                            <h4 style="font-size: 20px;">Công ty cổ phần Routin Việt Nam</h4>
                            <div>
                                <p>Mã số thuế: 01092827366</p>
                                <p>Địa chỉ: Tầng 9 nhà 10 Thanh Xuân</p>
                                <p>Điện thoại: 098787762</p>
                            </div>
                        </div>
                        <hr>
                        <div>
                            <div>
                                <p>Họ tên khách hàng: 
                                """;
        temple += hd.getNguoiMua().getHo() + " " + hd.getNguoiMua().getTen();
        temple += """ 
                </p>
                <p>Địa chỉ:""";
        if (hd.getDiaChiGiao() != null) {
            temple += hd.getDiaChiGiao().getXa() + " " + hd.getDiaChiGiao().getHuyen() + " " + hd.getDiaChiGiao().getTinh() + " </p>";
            temple += " <p>Điện thoại:" + hd.getDiaChiGiao().getSoDienThoai() + "</p>";
        } else {
            temple += "Không  </p>";
        }
        temple += "  <p>Hình thức thanh toán:" + hd.getPhuongThucThanhToan().getTenPhuongThuc() + "</p>";
        temple += "  <p>Hình thức nhận hàng:" + hd.getPhuongThucVanChuyen().getTenPhuongThuc() + "</p>";
        temple +=
                """
                            </div>
                        </div>
                        <div>
                            <h4>Thông tin sản phẩm</h4>
                            <table style="border-collapse: collapse; width: 100%;">
                                <thead>
                                    <th>STT</th>
                                    <th>Tên sản phẩm</th>
                                    <th>Đơn vị tính</th>
                                    <th>Số lượng</th>
                                    <th>Đơn giá</th>
                                    <th>Thành tiền</th>
                                </thead>
                                <tbody>
                                """;
        int i = 0;
        for (var item : hd.getHoaDonChiTietList()) {
            temple += """
                    <tr>
                        <td>
                        """ +
                    ++i
                    + """
                    </td>
                    <td>
                    """ +
                    item.getSanPhamChiTiet().getTenSanPham()
                    + """
                    </td>
                    <td>
                    """ +
                    item.getSoLuong()
                    + """
                    </td>
                    <td>
                    """ +
                    item.getDonGia()
                    + """
                    </td>
                    <td>
                    """ +
                    item.getDonGia()
                    + """
                    </td>
                    <td>
                    """ +
                    item.getDonGia() * item.getSoLuong()
                    + """
                        </td>
                    </tr>
                    """;
        }


        temple += """
                                </tbody>
                            </table>
                        </div>
                """;
        String gia = """
                <div>
                            <div>
                                <p>Tổng tiền hàng: 
                                """ +
                tinhTongTien(hd)
                + """
                đ</p>
                <p>Phí ship:""" + hd.getPhiGiaoHang() + """
                đ</p>
                """;
        if (hd.getVoucherGiam() != null) {
            temple += "<p>Áp mã:" + hd.getVoucherGiam().getGiaTriGiam() + "đ</p>";
        }
        temple += """
                <p>Thanh toán: 
                """ +
                tinhTongTien(hd) + hd.getPhiGiaoHang()
                + """
                đ</p>
                <p>Trạng thái hóa đơn: 
                """
                +
                hd.getTrangThai()
                +
                """
                                       </p>
                                    </div>
                                </div>
                            </div>
                        </body>
                        </html>
                        """;
        return "" + gia;
    }

    private static double tinhTongTien(HoaDon hd) {
        double total = 0l;
        for (var item : hd.getHoaDonChiTietList()) {
            total += item.getSoLuong() + item.getDonGia();
        }
        return total;
    }
}
