package it.lab.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "hoadonchitiet")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class HoaDonChiTiet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @JoinColumn(name = "hoadonid")
    @ManyToOne
    @JsonIgnore
    private HoaDon hoaDon;
    @JoinColumn(name = "sanphamchitietid")
    @ManyToOne
    private SanPhamChiTiet sanPhamChiTiet;
    @Column(name = "soluong")
    private Integer soLuong;
    @Column(name = "dongia")
    private Double donGia;
    @Column(name = "ngaytao")
    private LocalDateTime ngayTao;
    @Column(name = "ngaycapnhat")
    private LocalDateTime ngayCapNhat;
    @JoinColumn(name = "sanphamdoitraid")
    @ManyToOne
    private SanPhamChiTiet sanPhamDoiTra;
    @Column(name = "soluongdoitra")
    private Integer soLuongDoiTra;
    @Column(name = "dongiamoi")
    private Double donGiaMoi;
    @Column(name = "ghichu", columnDefinition = "nvarchar(max)")
    private String ghiChu;
    @Column(name = "trangthai",columnDefinition = "INT DEFAULT 0")
    // 1 là đổi 2 là trả 0 là bình thường
    private Integer trangThai;
}
