package it.lab.entity;

import it.lab.enums.SaoDanhGia;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "danhgiasao")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DanhGiaSao {
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
    @Column(name = "sosao")
    private SaoDanhGia soSao;
}
