package it.lab.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "mausac")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MauSac {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "mamau",unique = true)
    private String maMau;
    @Column(name = "tenmau")
    private String tenMau;
    @OneToMany(mappedBy = "mauSac")
    private List<SanPham> sanPhamList;
}
