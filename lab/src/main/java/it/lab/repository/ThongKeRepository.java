package it.lab.repository;

import it.lab.entity.HoaDon;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


import org.springframework.data.repository.query.Param;


import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public interface ThongKeRepository extends JpaRepository<HoaDon,Integer> {
    @Query("SELECT u.email, SUM(h.giaTriHd) AS tongDoanhThu " +
            "FROM HoaDon h " +
            "JOIN h.nguoiMua u " +
            "GROUP BY u.email " +
            "ORDER BY tongDoanhThu DESC")
    List<Object[]> taiKhoanDoanhThuCaoNhat(Pageable pageable);


    @Query("SELECT u.email, SUM(h.giaTriHd) AS tongDoanhThu " +
            "FROM HoaDon h " +
            "JOIN h.nguoiMua u " +
            "GROUP BY u.email " +
            "ORDER BY tongDoanhThu ASC")
    List<Object[]> taiKhoanDoanhThuThap(Pageable pageable);



//thong ve những thành phố mua sản phẩm nhiều nhất
@Query("SELECT h.diaChiGiao.tinh, COUNT(h.id) AS TotalPurchases " +
        "FROM HoaDon h " +
        "JOIN h.diaChiGiao d " +
        "GROUP BY h.diaChiGiao.tinh " +
        "ORDER BY TotalPurchases DESC")
List<Object[]> ThongKeThanhPhoMuaNhieu();

//thong ke ve doanh thu theo ngay
@Query("SELECT SUM(h.giaTriHd) FROM HoaDon h " +
            "WHERE FUNCTION('DAY', h.ngayTao) = FUNCTION('DAY', :selectedDate) " +   // Lấy theo ngày được chọn từ input
            "AND FUNCTION('MONTH', h.ngayTao) = FUNCTION('MONTH', :selectedDate) " + // Lấy theo tháng được chọn từ input
            "AND FUNCTION('YEAR', h.ngayTao) = FUNCTION('YEAR', :selectedDate) ")
    BigDecimal tinhTongDoanhThuTrongNgay(@Param("selectedDate") LocalDate selectedDate);




}
