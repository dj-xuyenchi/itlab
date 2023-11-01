package it.lab.modelcustom.respon;

import it.lab.dto.DiaChiDTO;
import it.lab.entity.DiaChi;
import it.lab.entity.HoaDon;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class HoaDonCho {
    private Long key;
    private String tenKhachHang;
    private String soDienThoai;
    private Double giaTriHd;
    private LocalDateTime ngayTao;
    private String trangThai;
    public static HoaDonCho fromEntity(HoaDon entity) {
        return new HoaDonCho(
                entity.getId(),
               entity.getNguoiMua().getHo()
        );
    }

    public static List<DiaChiDTO> fromCollection(List<DiaChi> collection) {
        List<DiaChiDTO> to = new ArrayList<>();
        collection.forEach(x -> {
            to.add(fromEntity(x));
        });
        return to;
    }
}
