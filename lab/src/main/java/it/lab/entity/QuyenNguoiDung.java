package it.lab.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "quyennguoidung")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class QuyenNguoiDung {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @JoinColumn(name = "nguoidungid")
    @ManyToOne
    private NguoiDung nguoiDung;
    @JoinColumn(name = "quyenid")
    @ManyToOne
    private Quyen quyen; @Column(name = "ngaytao")
    private LocalDate ngayTao;
    @Column(name = "ngaycapnhat")
    private LocalDate ngayCapNhat;
}
