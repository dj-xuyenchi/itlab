package it.lab.repository;

import it.lab.entity.Quyen;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuyenRepo extends JpaRepository<Quyen, Long> {
}
