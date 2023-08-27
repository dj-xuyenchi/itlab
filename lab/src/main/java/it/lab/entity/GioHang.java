package it.lab.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "giohang")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class GioHang {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @JoinColumn(name = "nguoimuaid")
    @ManyToOne
    private NguoiDung nguoiMua;
    @JoinColumn(name = "sanphamid")
    @ManyToOne
    private SanPham sanPham;
    @Column(name = "soluong")
    private Integer soLuong;
}
