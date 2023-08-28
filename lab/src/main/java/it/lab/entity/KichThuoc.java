package it.lab.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "kichthuoc")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class KichThuoc {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "makichthuoc",unique = true)
    private String maKichThuoc;
    @Column(name = "tenkichthuoc")
    private String tenKichThuoc;
    @OneToMany(mappedBy = "kichThuoc")
    private List<SanPham> sanPhamList;
}
