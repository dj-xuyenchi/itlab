package it.lab.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "nhomsanpham")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class NhomSanPham {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "maloai")
    private String maNhom;
    @Column(name = "tenthietke")
    private String tenNhom;
    @OneToMany(mappedBy = "nhomSanPham")
    private List<SanPham> sanPhamList; @Column(name = "ngaytao")
    private LocalDate ngayTao;
    @Column(name = "ngaycapnhat")
    private LocalDate ngayCapNhat;
}
