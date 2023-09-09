package it.lab.entity;

import it.lab.enums.TrangThaiSanPham;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "sanpham")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SanPham {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "masanpham",unique = true)
    private String maSanPham;
    @Column(name = "tensanpham",columnDefinition = "nvarchar(max)")
    private String tenSanPham;
    @Column(name = "hinhanh")
    private String hinhAnh;
    @Column(name = "gianhap")
    private Double giaNhap;
    @Column(name = "giaban")
    private Double giaBan;
    @Column(name = "ngaytao")
    private LocalDate ngayTao;
    @Column(name = "mota")
    private String moTa;
    @Column(name = "trangthai")
    private TrangThaiSanPham trangThai;
    @Column(name = "soluongton")
    private Integer soLuongTon;
    @JoinColumn(name = "loaisanphamid")
    @ManyToOne
    private LoaiSanPham loaiSanPham;
    @JoinColumn(name = "mausacid")
    @ManyToOne
    private MauSac mauSac;
    @JoinColumn(name = "kichthuocid")
    @ManyToOne
    private KichThuoc kichThuoc;
    @JoinColumn(name = "brandid")
    @ManyToOne
    private Brand brand;
    @OneToMany(mappedBy = "sanPham")
    private List<DanhGiaSao> danhGiaSaoList;
    @OneToMany(mappedBy = "sanPham")
    private List<BinhLuanDanhGia> binhLuanDanhGiaList;
    @OneToMany(mappedBy = "sanPham")
    private List<GioHang> gioHangList;
    @OneToMany(mappedBy = "sanPham")
    private List<HoaDonChiTiet> hoaDonChiTietList;
    @OneToMany(mappedBy = "sanPham")
    private List<SanPhamSuKien> sanPhamSuKienList;
    @OneToMany(mappedBy = "sanPham")
    private List<SanPhamYeuThich> sanPhamYeuThichList;
}
