package it.lab.repository;

import it.lab.entity.HoaDonChiTiet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;

public interface ThongKeHDCTRepository extends JpaRepository<HoaDonChiTiet,Integer> {

    @Query("SELECT SUM(h.soLuong) FROM HoaDonChiTiet h")
    int getTongSoLuongBanDuoc();


    @Query("SELECT SUM((sp.giaBan - sp.giaNhap) * hdct.soLuong) AS tongLoiNhuan " +
            "FROM HoaDonChiTiet hdct " +
            "JOIN hdct.hoaDon hdt " +
            "JOIN hdct.sanPhamChiTiet sp " +
            "WHERE FUNCTION('YEAR', hdt.ngayTao) = :yearParam " +
            "AND FUNCTION('MONTH', hdt.ngayTao) = :monthParam")
    BigDecimal tinhTongDoanhThuNamSauKhiTruChiPhi(@Param("yearParam") int year, @Param("monthParam") int month);


}
