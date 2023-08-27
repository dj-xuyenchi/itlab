package it.lab.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
    @JoinColumn(name = "sanphamid")
    @ManyToOne
    private SanPham sanPham;
    @JoinColumn(name = "hoadonid")
    @ManyToOne
    private HoaDon hoaDon;
    @Column(name = "hinhanh")
    private String hinhAnh;
    @Column(name = "binhluan")
    private String binhLuan;
}
