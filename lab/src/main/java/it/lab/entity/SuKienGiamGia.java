package it.lab.entity;

import it.lab.enums.TrangThaiSuKienGiamGia;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "sukiengiamgia")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SuKienGiamGia {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "tensukien")
    private String tenSuKien;
    @Column(name = "ngaybatdau")
    private LocalDate ngayBatDau;
    @Column(name = "ngayketthuc")
    private LocalDate ngayKetThuc;
    @Column(name = "mota")
    private String moTa;
    @Column(name = "logosukien")
    private String logoSuKien;
    @Column(name = "trangthai")
    private TrangThaiSuKienGiamGia trangThai;
    @OneToMany(mappedBy = "suKienGiamGia")
    private List<SanPhamSuKien> sanPhamSuKienList;
}
