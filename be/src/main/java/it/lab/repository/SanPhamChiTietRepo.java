package it.lab.repository;

import it.lab.entity.SanPham;
import it.lab.entity.SanPhamChiTiet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SanPhamChiTietRepo extends JpaRepository<SanPhamChiTiet,Long> {
    public List<SanPhamChiTiet> findSanPhamChiTietsBySanPham(SanPham sanPham);
}
