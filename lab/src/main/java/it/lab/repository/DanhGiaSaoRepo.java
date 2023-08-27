package it.lab.repository;

import it.lab.entity.DanhGiaSao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DanhGiaSaoRepo extends JpaRepository<DanhGiaSao, Long> {
}
