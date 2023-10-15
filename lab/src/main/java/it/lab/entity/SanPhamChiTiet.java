package it.lab.entity;

import it.lab.enums.TrangThaiSanPhamChiTiet;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "sanphamchitiet")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SanPhamChiTiet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "gianhap")
    private Double giaNhap;
    @Column(name = "giaban")
    private Double giaBan;
    @Column(name = "soluongton")
    private Integer soLuongTon;
    @Column(name = "soluongdaban")
    private Integer soLuongDaBan;
    @Column(name = "soluongloi")
    private Integer soLuongLoi;
    @Column(name = "soluongtrahang")
    private Integer soLuongTraHang;
    @Column(name = "trangthai")
    private TrangThaiSanPhamChiTiet trangThai; @Column(name = "ngaytao")
    private LocalDate ngayTao;
    @Column(name = "ngaycapnhat")
    private LocalDate ngayCapNhat;
    @JoinColumn(name = "mausacid")
    @ManyToOne
    private MauSac mauSac;
    @JoinColumn(name = "kichthuocid")
    @ManyToOne
    private KichThuoc kichThuoc;
    @JoinColumn(name = "sanphamid")
    @ManyToOne
    private SanPham sanPham;
    @OneToMany(mappedBy = "sanPhamChiTiet")
    private List<HoaDonChiTiet> hoaDonChiTietList;
    @OneToMany(mappedBy = "sanPhamChiTiet")
    private List<GioHang> gioHangList;
    @OneToMany(mappedBy = "sanPhamChiTiet")
    private List<SanPhamYeuThich> sanPhamYeuThichList;
    @OneToMany(mappedBy = "sanPhamChiTiet")
    private List<BinhLuanDanhGia> binhLuanDanhGiaList;
}
