package it.lab.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "brand")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Brand {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "mabrand",unique = true)
    private String maBrand;
    @Column(name = "tenbrand",columnDefinition = "nvarchar(max)")
    private String tenBrand;
    @OneToMany(mappedBy = "brand")
    private List<SanPham> sanPhamList;
}
