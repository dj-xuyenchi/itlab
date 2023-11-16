package it.lab.repository;

import it.lab.entity.SanPham;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SanPhamRepo extends JpaRepository<SanPham, Long> {

}
