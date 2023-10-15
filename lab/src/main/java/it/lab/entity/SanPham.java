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
    @Column(name = "masanpham", unique = true)
    private String maSanPham;
    @Column(name = "tensanpham", columnDefinition = "nvarchar(max)")
    private String tenSanPham;
    @Column(name = "hinhanh1")
    private String hinhAnh1;
    @Column(name = "hinhanh2")
    private String hinhAnh2;
    @Column(name = "gianhap")
    private Double giaNhap;
    @Column(name = "giaban")
    private Double giaBan;
    @Column(name = "ngaytao")
    private LocalDate ngayTao;
    @Column(name = "ngaycapnhat")
    private LocalDate ngayCapNhat;
    @Column(name = "mota")
    private String moTa;
    @Column(name = "trangthai")
    private TrangThaiSanPham trangThai;
    @Column(name = "soluongton")
    private Integer soLuongTon;
    @Column(name = "soluongdaban")
    private Integer soLuongDaBan;
    @Column(name = "soluongtrahang")
    private Integer soLuongTraHang;
    @Column(name = "soluongloi")
    private Integer soLuongLoi;
    @JoinColumn(name = "brandid")
    @ManyToOne
    private Brand brand;
    @JoinColumn(name = "thietkeid")
    @ManyToOne
    private ThietKe thietKe;
    @JoinColumn(name = "nhomsanphamid")
    @ManyToOne
    private NhomSanPham nhomSanPham;
    @JoinColumn(name = "chatlieuid")
    @ManyToOne
    private ChatLieu chatLieu;
    @OneToMany(mappedBy = "sanPham")
    private List<SanPhamSuKien> sanPhamSuKienList;
    @OneToMany(mappedBy = "sanPham")
    private List<HinhAnhSanPham> hinhAnhSanPhamList;
}
