package it.lab.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "sanphamyeuthich")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SanPhamYeuThich {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @JoinColumn(name = "nguoidungid")
    @ManyToOne
    private NguoiDung nguoiDung;
    @JoinColumn(name = "sanphamchitietid")
    @ManyToOne
    private SanPhamChiTiet sanPhamChiTiet; @Column(name = "ngaytao")
    private LocalDate ngayTao;
    @Column(name = "ngaycapnhat")
    private LocalDate ngayCapNhat;
}
