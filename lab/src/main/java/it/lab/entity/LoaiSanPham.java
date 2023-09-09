package it.lab.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "loaisanpham")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LoaiSanPham {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "maloai",unique = true)
    private String maLoai;
    @Column(name = "tenloai",columnDefinition = "nvarchar(max)")
    private String tenLoai;
    @OneToMany(mappedBy = "loaiSanPham")
    private List<SanPham> sanPhamList;
}
