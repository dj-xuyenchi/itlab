package it.lab.repository;

import it.lab.entity.QuyenNguoiDung;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuyenNguoiDungRepo extends JpaRepository<QuyenNguoiDung, Long> {
}
