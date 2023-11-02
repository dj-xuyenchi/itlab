package it.lab.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "hoadon")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class HoaDon {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @JoinColumn(name = "nguoimuaid")
    @ManyToOne
    private NguoiDung nguoiMua;
    @JoinColumn(name = "diachigiaoid")
    @ManyToOne
    private DiaChi diaChiGiao;
    @Column(name = "mahoadon",unique = true)
    private String maHoaDon;
    @JoinColumn(name = "phuongthucthanhtoan")
    @ManyToOne
    private PhuongThucThanhToan phuongThucThanhToan;
    @JoinColumn(name = "phuongthucvanchuyen")
    @ManyToOne
    private PhuongThucVanChuyen phuongThucVanChuyen;
    @Column(name = "ghichu")
    private String ghiChu;
    @Column(name = "ngaytao")
    private LocalDate ngayTao;
    @Column(name = "ngaygiao")
    private LocalDate ngayGiao;
    @JoinColumn(name = "vouchergiaohangid")
    @ManyToOne
    private NguoiDungVoucher voucherGiaoHang;
    @JoinColumn(name = "sanphamsukienid")
    @ManyToOne
    private SanPhamSuKien sanPhamSuKien;
    @JoinColumn(name = "vouchergiamid")
    @ManyToOne
    private NguoiDungVoucher voucherGiam;
    @JoinColumn(name = "nhanvienid")
    @ManyToOne
    private NguoiDung nhanVien;

    @OneToMany(mappedBy = "hoaDon")
    private List<BinhLuanDanhGia> binhLuanDanhGiaList;
    @OneToMany(mappedBy = "hoaDon")
    private List<DanhGiaSao> danhGiaSaoList;
    @OneToMany(mappedBy = "hoaDon")
    private List<HoaDonChiTiet> hoaDonChiTietList;


    @Column(name = "giatrihd")
    private Float giaTriHd;
}
