package it.lab.entity;

import it.lab.enums.LoaiGiam;
import it.lab.enums.TrangThaiNguoiDungVoucher;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "nguoidungvoucher")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class NguoiDungVoucher {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @JoinColumn(name = "nguoidungid")
    @ManyToOne
    private NguoiDung nguoiDung;
    @JoinColumn(name = "voucherid")
    @ManyToOne
    private Voucher voucher;
    @Column(name = "hansudung")
    private LocalDate hanSuDung;
    @Column(name = "giatrigiam")
    private Double giaTriGiam;
    @Column(name = "loaigiam")
    private LoaiGiam loaiGiam;
    @Column(name = "trangthai")
    private TrangThaiNguoiDungVoucher trangThai;
    @OneToMany(mappedBy = "voucherGiaoHang")
    private List<HoaDon> giaoHangList;
    @OneToMany(mappedBy = "voucherGiam")
    private List<HoaDon> giamList;
}
