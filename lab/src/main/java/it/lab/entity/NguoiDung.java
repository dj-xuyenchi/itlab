package it.lab.entity;

import it.lab.enums.TrangThaiNguoiDung;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "nguoidung")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class NguoiDung {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "email")
    private String email;
    @Column(name = "matkhau")
    private String matKhau;
    @Column(name = "ten")
    private String ten;
    @Column(name = "ho")
    private String ho;
    @Column(name = "anhdaidien")
    private String anhDaiDien;
    @Column(name = "sodienthoai")
    private String soDienThoai;
    @Column(name = "gioitinh")
    private Boolean gioiTinh;
    @Column(name = "diem")
    private Integer diem;
    @Column(name = "trangthai")
    private TrangThaiNguoiDung trangThai;
    @Column(name = "ngaytao")
    private LocalDate ngayTao;
    @Column(name = "ngaycapnhat")
    private LocalDate ngayCapNhat;
    @JoinColumn(name = "rankkhachhang")
    @ManyToOne
    private RankKhachHang rankKhachHang;
    @OneToMany(mappedBy = "nguoiDung")
    private List<BinhLuanDanhGia> binhLuanDanhGiaList;
    @OneToMany(mappedBy = "nguoiDung")
    private List<DanhGiaSao> danhGiaSaoList;
    @OneToMany(mappedBy = "nguoiDung")
    private List<DiaChi> diaChiList;
    @OneToMany(mappedBy = "nguoiMua")
    private List<GioHang> gioHangList;
    @OneToMany(mappedBy = "nguoiMua")
    private List<HoaDon> danhSachMua;
    @OneToMany(mappedBy = "nhanVien")
    private List<HoaDon> danhSachHoaDonXacNhan;
    @OneToMany(mappedBy = "nguoiDung")
    private List<NguoiDungVoucher> nguoiDungVoucherList;
    @OneToMany(mappedBy = "nguoiDung")
    private List<QuyenNguoiDung> quyenNguoiDungList;
    @OneToMany(mappedBy = "nguoiDung")
    private List<SanPhamYeuThich> sanPhamYeuThichList;
}
