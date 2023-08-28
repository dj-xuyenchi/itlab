package it.lab.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "quyen")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Quyen {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "maquyen",unique = true)
    private String maQuyen;
    @Column(name = "tenquyen")
    private String tenQuyen;
    @OneToMany(mappedBy = "quyen")
    private List<QuyenNguoiDung> quyenNguoiDungList;
}
