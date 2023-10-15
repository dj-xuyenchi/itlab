package it.lab.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

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
    @JoinColumn(name = "sanphamchitietid")
    @ManyToOne
    private SanPhamChiTiet sanPhamChiTiet;
    @Column(name = "soluong")
    private Integer soLuong;
    @Column(name = "dongia")
    private Double donGia; @Column(name = "ngaytao")
    private LocalDate ngayTao;
    @Column(name = "ngaycapnhat")
    private LocalDate ngayCapNhat;
}
