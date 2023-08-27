package it.lab.repository;

import it.lab.entity.SanPhamYeuThich;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SanPhamYeuThichRepo extends JpaRepository<SanPhamYeuThich, Long> {
}
