package it.lab.repository;

import it.lab.dto.SanPhamDTO;
import it.lab.dto.SanPhamEDTO;
import it.lab.entity.SanPham;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SanPhamRepo extends JpaRepository<SanPham, Long> {
    @Query("SELECT c.id,c.sanPham.tenSanPham, CONVERT(VARCHAR(100), c.hinhAnh) AS image, SUM(a.soLuong) AS tongSoLuong " +
            "FROM HoaDonChiTiet a " +
            "JOIN HoaDon b ON a.hoaDon.id = b.id " +
            "JOIN SanPhamChiTiet c ON a.sanPhamChiTiet.id = c.id " +
            "WHERE MONTH(b.ngayTao) = :thang " +
            "AND YEAR(b.ngayTao) = :nam " +
            "GROUP BY c.id, CONVERT(VARCHAR(100), c.hinhAnh), c.sanPham.tenSanPham " +
            "ORDER BY SUM(a.soLuong) DESC")
    List<Object[]> getSanPhamE(@Param("thang") int thang, @Param("nam") int nam);

    @Query("select s from SanPham s where s.nhomSanPham.id = :id")
    List<SanPham> getSanPhamTheoNhom(@Param("id") long id);

}
