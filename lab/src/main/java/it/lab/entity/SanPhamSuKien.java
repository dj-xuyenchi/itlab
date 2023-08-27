package it.lab.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "sanphamsukien")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SanPhamSuKien {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @JoinColumn(name = "sanphamid")
    @ManyToOne
    private SanPham sanPham;
    @JoinColumn(name = "sukiengiamgiaid")
    @ManyToOne
    private SuKienGiamGia suKienGiamGia;
    @Column(name = "phantramgiam")
    private Double phanTramGiam;
    @OneToMany(mappedBy = "sanPhamSuKien")
    private List<HoaDon> hoaDonList;
}
