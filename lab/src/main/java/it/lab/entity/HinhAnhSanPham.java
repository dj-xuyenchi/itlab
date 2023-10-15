package it.lab.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "hinhanhsanpham")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class HinhAnhSanPham {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "soluongloi")
    private String linkHinhAnh;
    @JoinColumn(name = "sanphamid")
    @ManyToOne
    private SanPham sanPham; @Column(name = "ngaytao")
    private LocalDate ngayTao;
    @Column(name = "ngaycapnhat")
    private LocalDate ngayCapNhat;
}
