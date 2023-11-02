package it.lab.repository;

import it.lab.entity.HoaDon;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


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

}
