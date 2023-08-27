package it.lab.entity;

import it.lab.enums.TrangThaiPhuongThucThanhToan;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "phuongthucvanchuyen")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PhuongThucVanChuyen {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "maphuongthuc")
    private String maPhuongThuc;
    @Column(name = "tenphuongthuc")
    private String tenPhuongThuc;
    @Column(name = "trangthai")
    private TrangThaiPhuongThucThanhToan trangThai;
    @OneToMany(mappedBy = "phuongThucVanChuyen")
    private List<HoaDon> hoaDonList;
}
