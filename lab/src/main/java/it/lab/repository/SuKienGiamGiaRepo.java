package it.lab.repository;

import it.lab.entity.SanPhamSuKien;
import it.lab.entity.SuKienGiamGia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SuKienGiamGiaRepo extends JpaRepository<SuKienGiamGia, Long> {
    List<SuKienGiamGia> findAllByOrderByNgayCapNhatDesc();
}
