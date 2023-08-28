package it.lab.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "rankkhachhang")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RankKhachHang {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "marank",unique = true)
    private String maRank;
    @Column(name = "tenrank")
    private String tenRank;
    @Column(name = "phantramgiam")
    private Double phanTramGiam;
    @OneToMany(mappedBy = "rankKhachHang")
    private List<NguoiDung> nguoiDungList;
}
