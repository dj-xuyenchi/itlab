package it.lab.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "hoadonchitiet")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class HoaDonChiTiet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @JoinColumn(name = "hoadonid")
    @ManyToOne
    private HoaDon hoaDon;
    @JoinColumn(name = "sanphamid")
    @ManyToOne
    private SanPham sanPham;
    @Column(name = "soluong")
    private Integer soLuong;
    @Column(name = "dongia")
    private Double donGia;
}
