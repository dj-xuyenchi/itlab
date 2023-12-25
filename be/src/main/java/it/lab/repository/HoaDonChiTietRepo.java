package it.lab.repository;

import it.lab.entity.HoaDon;
import it.lab.entity.HoaDonChiTiet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HoaDonChiTietRepo extends JpaRepository<HoaDonChiTiet, Long> {
    public List<HoaDonChiTiet> findHoaDonChiTietsByHoaDon(HoaDon hoaDon);
}
