package it.lab.entity;

import it.lab.enums.TrangThaiPhuongThucThanhToan;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "phuongthucthanhtoan")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PhuongThucThanhToan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "maphuongthuc",unique = true)
    private String maPhuongThuc;
    @Column(name = "tenphuongthuc",columnDefinition = "nvarchar(max)")
    private String tenPhuongThuc;
    @Column(name = "trangthai")
    private TrangThaiPhuongThucThanhToan trangThai;
    @OneToMany(mappedBy = "phuongThucThanhToan")
    private List<HoaDon> hoaDonList;
}
