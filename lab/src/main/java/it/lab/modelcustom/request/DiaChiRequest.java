package it.lab.modelcustom.request;

import it.lab.enums.TrangThaiDiaChi;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class DiaChiRequest {
    private Long id;
    private Long nguoiDungId;
    private String nguoiNhan;
    private String hoNguoiNhan;
    private String xaId;
    private String huyenId;
    private String tinhId;
    private String xa;
    private String huyen;
    private String tinh;
    private String chiTietDiaChi;
    private String soDienThoai;
    private Boolean laDiaChiChinh;
    private LocalDateTime ngayTao;
    private LocalDateTime ngayCapNhat;
    private TrangThaiDiaChi trangThai;



}
