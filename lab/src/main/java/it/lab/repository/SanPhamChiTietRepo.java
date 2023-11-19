package it.lab.repository;

import it.lab.entity.KichThuoc;
import it.lab.entity.MauSac;
import it.lab.entity.SanPham;
import it.lab.entity.SanPhamChiTiet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SanPhamChiTietRepo extends JpaRepository<SanPhamChiTiet, Long> {
    public List<SanPhamChiTiet> findSanPhamChiTietsBySanPham(SanPham sanPham);

    public List<SanPhamChiTiet> findSanPhamChiTietsByMauSacAndKichThuocAndSanPham(MauSac mauSac, KichThuoc kichThuoc, SanPham sanPham);


}
