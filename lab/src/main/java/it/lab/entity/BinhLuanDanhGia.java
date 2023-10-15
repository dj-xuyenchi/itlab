package it.lab.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "binhluandanhgia")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BinhLuanDanhGia {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @JoinColumn(name = "nguoidungid")
    @ManyToOne
    private NguoiDung nguoiDung;
    @JoinColumn(name = "sanphamchitietid")
    @ManyToOne
    private SanPhamChiTiet sanPhamChiTiet;
    @JoinColumn(name = "hoadonid")
    @ManyToOne
    private HoaDon hoaDon;
    @Column(name = "hinhanh")
    private String hinhAnh;
    @Column(name = "binhluan", columnDefinition = "nvarchar(max)")
    private String binhLuan;
    @Column(name = "soSao")
    private Integer soSao;
    @Column(name = "ngaytao")
    private LocalDate ngayTao;
    @Column(name = "ngaycapnhat")
    private LocalDate ngayCapNhat;
}
